import { useLocation } from '@solidjs/router'

export const Routes = {
  test: '/',
  profile: '/profile',
}

export const isProfilePage = (): boolean => {
  return useLocation().pathname === Routes.profile
}

export const isTestPage = (): boolean => {
  return useLocation().pathname === Routes.test
}
