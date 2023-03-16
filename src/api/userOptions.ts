import { UserOptions } from '../types'
import { getBearerToken, getUserId } from '../authentication/Authentication'

const getBaseRoute = () => `${import.meta.env.VITE_API}/api`

export const saveUserOptions = async (options: UserOptions): Promise<boolean> => {
  const userId = getUserId()
  const bearerToken = await getBearerToken()
  if (!userId || !bearerToken) return false

  const result = await fetch(`${getBaseRoute()}/userOptions/${userId}`, {
    method: 'post',
    body: JSON.stringify(options),
    headers: {
      Authentication: bearerToken,
    },
  })

  return result.ok
}

export const getUserOptions = async (): Promise<UserOptions | null> => {
  const userId = getUserId()
  const bearerToken = await getBearerToken()
  if (!userId || !bearerToken) return null

  const result = await fetch(`${getBaseRoute()}/userOptions/${userId}`, {
    headers: {
      Authentication: bearerToken,
    },
  })

  if (result.ok) {
    return await result.json()
  }

  return null
}
