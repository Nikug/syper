import { AccountInfo, PublicClientApplication } from '@azure/msal-browser'
import { createSignal } from 'solid-js'
import { MsalConfig } from './constants'

export const [auth, setAuth] = createSignal<PublicClientApplication>(
  new PublicClientApplication(MsalConfig)
)

export const isSignedIn = (): boolean => !!auth().getActiveAccount()

export const getAccount = (): AccountInfo | null => {
  const account = auth().getActiveAccount()
  return account
}

export const signIn = async (): Promise<void> => {
  try {
    const result = await auth().loginPopup({ scopes: [] })
    auth().setActiveAccount(result.account)
  } catch (e) {
    console.error(e)
  }
}

export const signOut = async (): Promise<void> => {
  try {
    await auth().logoutPopup()
  } catch (e) {
    console.error(e)
  }
}
