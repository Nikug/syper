import { UserOptions } from '../types'
import { authFetch, getUserId } from '../authentication/Supabase'

export const getBaseRoute = () => `${import.meta.env.VITE_API}/api`

export const saveUserOptions = async (options: UserOptions): Promise<boolean> => {
  const result = await authFetch(`${getBaseRoute()}/userOptions`, {
    method: 'post',
    body: JSON.stringify(options),
  })

  return result.ok
}

export const getUserOptions = async (): Promise<UserOptions | null> => {
  const userId = getUserId()
  if (!userId) return null

  const result = await authFetch(`${getBaseRoute()}/userOptions/${userId}`)

  if (result.ok) {
    return await result.json()
  }

  return null
}
