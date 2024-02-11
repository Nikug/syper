import { addNotification } from '../NotificationsHandler'
import { getUserId, supabase } from '../authentication/Supabase'
import { SupabaseTables } from '../authentication/constants'
import { DatabasePersonalBest, DatabasePersonalBestInput } from '../supabaseTypes'

export const getPersonalBests = async (): Promise<DatabasePersonalBest[]> => {
  const userId = getUserId()
  if (!userId) return []

  const result = await supabase
    .from(SupabaseTables.UserPersonalBests)
    .select<string, DatabasePersonalBest>()
    .eq('userId', userId)

  if (!result.error) {
    return result.data
  }

  if (result.error) {
    addNotification({
      type: 'error',
      content: 'Failed to get personal bests.',
    })
  }

  return []
}

export const insertPersonalBest = async (
  personalBest: DatabasePersonalBestInput
): Promise<DatabasePersonalBest | null> => {
  const result = await supabase
    .from(SupabaseTables.UserPersonalBests)
    .insert(personalBest)
    .select<string, DatabasePersonalBest>()
    .single()

  if (result.error) {
    addNotification({
      type: 'error',
      content: 'Failed to save personal best.',
    })
  }

  return result.data
}

export const updatePersonalBest = async (
  personalBestId: string,
  personalBest: DatabasePersonalBestInput
): Promise<DatabasePersonalBest | null> => {
  const result = await supabase
    .from(SupabaseTables.UserPersonalBests)
    .update(personalBest)
    .eq('id', personalBestId)
    .lt('wordsPerMinute', personalBest.wordsPerMinute)
    .select<string, DatabasePersonalBest>()
    .single()

  if (result.error) {
    addNotification({
      type: 'error',
      content: 'Failed to update personal best.',
    })
  }

  return result.data
}
