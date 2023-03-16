import { AccountInfo, PublicClientApplication } from '@azure/msal-browser'
import { createSignal } from 'solid-js'
import { MsalConfig } from './constants'

let auth: PublicClientApplication | null = null

export const [account, setAccount] = createSignal<AccountInfo | null>(null)

export const setupAuth = async () => {
  auth = new PublicClientApplication(MsalConfig)
  const activeAccount = auth.getAllAccounts().at(0) ?? null
  await getIdToken(activeAccount)
  auth.setActiveAccount(activeAccount)
  setAccount(activeAccount)
}

export const isSignedIn = (): boolean => !!account()
export const getUserName = (): string | null => account()?.name || account()?.username || null
export const getUserId = (): string | null => account()?.homeAccountId ?? null
export const getBearerToken = async (): Promise<string | null> => {
  const token = await getIdToken(account())
  if (token) {
    return `Bearer ${token}`
  }
  return null
}

export const signIn = async (): Promise<void> => {
  if (!auth) return
  try {
    const result = await auth.loginPopup({ scopes: [] })
    await getIdToken(result.account)
    setAccount(result.account)
  } catch (e) {
    console.error(e)
  }
}

export const signOut = async (): Promise<void> => {
  if (!auth) return
  try {
    await auth.logoutPopup()
    setAccount(null)
  } catch (e) {
    console.error(e)
  }
}

const getIdToken = async (account: AccountInfo | null): Promise<string | null> => {
  if (!account) return null
  const response = await auth?.acquireTokenSilent({ account, scopes: [] })
  return response?.idToken ?? null
}
