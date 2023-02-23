import { Configuration } from '@azure/msal-browser'

export const MsalConfig: Configuration = {
  auth: {
    clientId: 'abc 123',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
}
