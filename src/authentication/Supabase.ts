import { Session, createClient } from '@supabase/supabase-js'
import { SupabaseConstants } from './constants'
import { createSignal } from 'solid-js'

if (!SupabaseConstants.url) {
  console.error('Missing Supabase url. Please check environment variables.')
}

if (!SupabaseConstants.anonymousKey) {
  console.error('Missing Supabase anonymous key. Please check environment variables.')
}

export const supabase = createClient(SupabaseConstants.url, SupabaseConstants.anonymousKey)

const [session, setSession] = createSignal<Session | null>(null)

export const setupAuth = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) return
  setSession(data.session)
}

export const isSignedIn = (): boolean => session() != null
export const getUserName = (): string | null => session()?.user.email ?? null
export const getUserId = (): string | null => session()?.user.id ?? null

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return
  if (!data.session && data.user) {
    console.log('Email not verified')
  }

  setSession(data.session)
}

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) {
    console.log(error)
  }
  if (!data.session && data.user) {
    console.log('Email not verified')
  }

  setSession(data.session)
}

export const signOut = async () => {
  await supabase.auth.signOut()
  setSession(null)
}
