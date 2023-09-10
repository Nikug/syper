import { UserOptions } from '../types'
import { getUserId, supabase } from '../authentication/Supabase'
import { SupabaseTables } from '../authentication/constants'
import { DatabaseUserOptions, DatabaseUserOptionsInput } from '../supabaseTypes'

export const getBaseRoute = () => `${import.meta.env.VITE_API}/api`

export const saveUserOptions = async (options: UserOptions): Promise<boolean> => {
  const userId = getUserId()
  if (!userId) return false

  const input: DatabaseUserOptionsInput = { ...options, userId }
  const result = await supabase
    .from(SupabaseTables.UserOptions)
    .upsert(input, { onConflict: 'userId' })

  return !result.error
}

export const getUserOptions = async (): Promise<DatabaseUserOptions | null> => {
  const userId = getUserId()
  if (!userId) return null

  const result = await supabase
    .from(SupabaseTables.UserOptions)
    .select<string, DatabaseUserOptions>()
    .eq('userId', userId)
    .single()

  if (!result.error) {
    return result.data
  }

  return null
}
