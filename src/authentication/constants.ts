export const SupabaseConstants = {
  url: import.meta.env.VITE_SUPABASE_URL ?? '',
  anonymousKey: import.meta.env.VITE_SUPABASE_KEY ?? '',
}

export const SupabaseTables = {
  UserOptions: 'UserOptions',
  UserTestResults: 'UserTestResults',
}
