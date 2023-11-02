import { useLocation } from '@solidjs/router'

export const Routes = {
  test: '/',
  profile: '/profile',
  options: '/options',
  about: '/about',
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
