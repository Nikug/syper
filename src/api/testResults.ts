import { authFetch, getUserId } from '../authentication/Authentication'
import { DatabaseTestResultInput } from '../types'
import { getBaseRoute } from './userOptions'

export const saveTestResult = async (testResult: DatabaseTestResultInput): Promise<boolean> => {
  const userId = getUserId()
  if (!userId) return false

  const result = await authFetch(`${getBaseRoute()}/userTestResults`, {
    method: 'post',
    body: JSON.stringify(testResult),
  })

  return result.ok
}
