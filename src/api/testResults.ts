import { authFetch, getUserId } from '../authentication/Authentication'
import { DatabaseTestResult, DatabaseTestResultInput } from '../types'
import { getBaseRoute } from './userOptions'
import { endOfDay, startOfDay } from 'date-fns'

export const saveTestResult = async (testResult: DatabaseTestResultInput): Promise<boolean> => {
  const result = await authFetch(`${getBaseRoute()}/userTestResults`, {
    method: 'post',
    body: JSON.stringify(testResult),
  })

  return result.ok
}

export const getTestResults = async (
  startDate?: Date,
  endDate?: Date
): Promise<DatabaseTestResult[]> => {
  if (!endDate) endDate = endOfDay(new Date())
  if (!startDate) startDate = startOfDay(endDate)

  const userId = getUserId()
  if (!userId) return []

  const result = await authFetch(
    `${getBaseRoute()}/userTestResults/${userId}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
  )

  if (result.ok) {
    return await result.json()
  }

  return []
}
