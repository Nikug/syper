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
    .select<string, DatabasePersonalBest>()
    .single()

  return result.data
}
