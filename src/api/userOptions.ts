import { UserOptions } from '../types'
import { getUserId, supabase } from '../authentication/Supabase'
import { SupabaseTables } from '../authentication/constants'
import { DatabaseUserOptions, DatabaseUserOptionsInput } from '../supabaseTypes'
import { mapOptionsFromDatabase, mapOptionsToDatabase } from '../helpers/optionsHelpers'
import { addNotification } from '../NotificationsHandler'

export const getBaseRoute = () => `${import.meta.env.VITE_API}/api`

export const saveUserOptions = async (options: UserOptions): Promise<boolean> => {
  const userId = getUserId()
  if (!userId) return false

  const input: DatabaseUserOptionsInput = { ...mapOptionsToDatabase(options), userId }
  const result = await supabase
    .from(SupabaseTables.UserOptions)
    .upsert(input, { onConflict: 'userId' })

  if (result.error) {
    addNotification({
      type: 'error',
      content: 'Failed to save user options.',
    })
  }

  return !result.error
}

export const getUserOptions = async (): Promise<UserOptions | null> => {
  const userId = getUserId()
  if (!userId) return null

  const result = await supabase
    .from(SupabaseTables.UserOptions)
    .select<string, DatabaseUserOptions>()
    .eq('userId', userId)
    .single()

  if (!result.error) {
    const parsedOptions = mapOptionsFromDatabase(result.data)
    return parsedOptions
  }

  if (result.error) {
    addNotification({
      type: 'error',
      content: 'Failed to get user options.',
    })
  }

  return null
}
