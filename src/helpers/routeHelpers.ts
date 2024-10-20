import { useLocation } from '@solidjs/router'

export const Routes = {
  test: '/',
  profile: '/profile',
  options: '/options',
  about: '/about',
  privacy: '/privacy',
  signup: '/signup',
}

export const isProfilePage = (): boolean => {
  return useLocation().pathname === Routes.profile
}

export const isTestPage = (): boolean => {
  return useLocation().pathname === Routes.test
}

export const isOptionsPage = (): boolean => {
  return useLocation().pathname === Routes.options
}

export const isAboutPage = (): boolean => {
  return useLocation().pathname === Routes.about
}

export const isPrivacyPage = (): boolean => {
  return useLocation().pathname === Routes.privacy
}

export const isSignupPage = (): boolean => {
  return useLocation().pathname === Routes.signup
}
