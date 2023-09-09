import { Configuration } from '@azure/msal-browser'

export const scopes = [
  'https://Syper.onmicrosoft.com/ee98da05-7a87-4e08-8265-215eda6f67a6/User.Functions',
]

const MsalPolicies = {
  names: {
    signUpSignIn: 'B2C_1_SignUpSignIn',
  },
  authorities: {
    signUpSignIn: {
      authority: 'https://Syper.b2clogin.com/Syper.onmicrosoft.com/B2C_1_SignUpSignIn',
    },
  },
  authorityDomain: 'Syper.b2clogin.com',
}

export const MsalConfig: Configuration = {
  auth: {
    clientId: 'ee98da05-7a87-4e08-8265-215eda6f67a6',
    authority: MsalPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [MsalPolicies.authorityDomain],
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
}

export const SupabaseConstants = {
  url: "db.oxifazmlrbzisunnrjds.supabase.co",
  anonymousKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94aWZhem1scmJ6aXN1bm5yamRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQxODMwODMsImV4cCI6MjAwOTc1OTA4M30._DtPtKyBFW3Ol1SkzYLj4maFWYAvBqirN6ITUu-aFYk"
}
