import { AccountInfo, PublicClientApplication } from '@azure/msal-browser'
import { createSignal } from 'solid-js'
import { MsalConfig } from './constants'

let auth: PublicClientApplication | null = null
export const [account, setAccount] = createSignal<AccountInfo | null>(null)

export const setupAuth = () => {
  auth = new PublicClientApplication(MsalConfig)
  const activeAccount = auth.getAllAccounts().at(0) ?? null
  auth.setActiveAccount(activeAccount)
  setAccount(activeAccount)
}

export const isSignedIn = (): boolean => !!account()

export const signIn = async (): Promise<void> => {
  if (!auth) return
  try {
    const result = await auth.loginPopup({ scopes: [] })
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
