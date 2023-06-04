import { AccountInfo, PublicClientApplication } from '@azure/msal-browser'
import { createSignal } from 'solid-js'
import { getStoredUserOptions } from '../helpers/optionsHelpers'
import { initializeText } from '../helpers/stateHelpers'
import { setTypingTest, setUserOptions } from '../StateManager'
import { setShowLoadingScreen } from '../SyncingManager'
import { MsalConfig, scopes } from './constants'

let auth: PublicClientApplication | null = null

export const [account, setAccount] = createSignal<AccountInfo | null>(null)

export const setupAuth = async () => {
  auth = new PublicClientApplication(MsalConfig)
  const activeAccount = auth.getAllAccounts().at(0) ?? null

  if (activeAccount) {
    auth.setActiveAccount(activeAccount)
  }

  await getAccessToken(activeAccount)
  setAccount(activeAccount)
}

export const isSignedIn = (): boolean => !!account()
export const getUserName = (): string | null => account()?.name || account()?.username || null
export const getUserId = (): string | null => account()?.localAccountId ?? null
export const getBearerToken = async (): Promise<string | null> => {
  const token = await getAccessToken(account())
  if (token) {
    return `Bearer ${token}`
  }
  return null
}

export const signIn = async (): Promise<void> => {
  if (!auth) return
  try {
    const result = await auth.loginPopup({ scopes, prompt: 'select_account' })
    await getAccessToken(result.account)
    setAccount(result.account)
    setShowLoadingScreen(true)
    setUserOptions(await getStoredUserOptions())
    setTypingTest(await initializeText())
  } catch (e) {
    console.error(e)
  } finally {
    setShowLoadingScreen(false)
  }
}

export const signOut = async (): Promise<void> => {
  if (!auth) return
  try {
    await auth.logoutPopup({ account: account() })
    setAccount(null)
  } catch (e) {
    console.error(e)
  }
}

const getAccessToken = async (account: AccountInfo | null): Promise<string | null> => {
  if (!account) return null
  try {
    const response = await auth?.acquireTokenSilent({
      account,
      scopes,
    })
    return response?.accessToken ?? response?.idToken ?? null
  } catch (e) {
    await auth?.logoutRedirect({ account })
    setAccount(null)
    console.error(e)
  }

  return null
}

export const authFetch = async (
  input: RequestInfo | URL,
  settings?: RequestInit | undefined
): Promise<Response> => {
  const bearerToken = await getBearerToken()

  if (!bearerToken) {
    throw new Error('Could not get bearer token.')
  }

  settings ??= {}

  if (settings.headers) {
    settings.headers = { ...settings.headers, Authorization: bearerToken }
  } else {
    settings.headers = { Authorization: bearerToken }
  }

  return fetch(input, settings)
}
