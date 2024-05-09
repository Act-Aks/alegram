import { supabase } from '@/lib/supabase'

export const signInWithEmail = async ({ email, password }: { email: string; password: string }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    return { data, error }
  } catch (error) {
    throw error
  }
}

export const signUpWithEmail = async ({ email, password }: { email: string; password: string }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    return { data, error }
  } catch (error) {
    throw error
  }
}

export const signOut = async () => {
  try {
    await supabase.auth.signOut()
  } catch (error) {
    throw error
  }
}

export const AuthHooks = {
  signInWithEmail,
  signUpWithEmail,
  signOut,
}
