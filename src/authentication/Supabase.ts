import { AuthError, Session, createClient } from '@supabase/supabase-js'
import { SupabaseConstants } from './constants'
import { createSignal } from 'solid-js'
import { Provider } from '@supabase/supabase-js'
import { Routes } from '../helpers/routeHelpers'

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

export const signIn = async (email: string, password: string): Promise<AuthError | undefined> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return error
  if (!data.session && data.user) {
    console.log('Email not verified')
  }

  setSession(data.session)
}

export const signInWithProvider = async (provider: Provider): Promise<void> => {
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })
}

export const signUp = async (email: string, password: string): Promise<AuthError | undefined> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}${Routes.signup}`,
    },
  })
  if (error) {
    console.log(error)
    return error
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
