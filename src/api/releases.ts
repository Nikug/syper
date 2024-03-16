import { addNotification } from '../NotificationsHandler'
import { supabase } from '../authentication/Supabase'
import { SupabaseTables } from '../authentication/constants'

export const getLatestVersion = async (): Promise<string | undefined> => {
  const result = await supabase
    .from(SupabaseTables.Releases)
    .select<string, { version: string }>('version')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!result.error) {
    return result.data?.version
  }

  if (result.error) {
    addNotification({
      type: 'error',
      content: 'Failed to get current version.',
    })
  }
}
