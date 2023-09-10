import { getUserId, supabase } from '../authentication/Supabase'
import { SupabaseTables } from '../authentication/constants'
import { DatabaseTestResult, DatabaseTestResultInput } from '../supabaseTypes'
import { endOfDay, startOfDay } from 'date-fns'

export const saveTestResult = async (testResult: DatabaseTestResultInput): Promise<boolean> => {
  const result = await supabase.from(SupabaseTables.UserTestResults).insert(testResult)

  return !!result.error
}

export const getTestResults = async (
  startDate?: Date,
  endDate?: Date
): Promise<DatabaseTestResult[]> => {
  if (!endDate) endDate = endOfDay(new Date())
  if (!startDate) startDate = startOfDay(endDate)

  const userId = getUserId()
  if (!userId) return []

  const result = await supabase
    .from(SupabaseTables.UserTestResults)
    .select<string, DatabaseTestResult>()
    .eq('userId', userId)
    .gte('date', startDate.toISOString())
    .lte('date', endDate.toISOString())

  if (!result.error) {
    return result.data
  }

  return []
}
