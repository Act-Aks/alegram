import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'

type UpdateUserProfileParams = {
  id: Session['user']['id']
  username: string
  website: string
  avatar_url: string
  updated_at: Date
}

export const getUserProfile = async (session: Session | null) => {
  try {
    if (!session?.user) throw new Error('No user on the session!')

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url, full_name`)
      .eq('id', session?.user.id)
      .single()
    if (error && status !== 406) {
      throw error
    }

    return { data, error, status }
  } catch (error) {
    throw error
  }
}

export const updateUserProfile = async ({ ...updateProfile }: UpdateUserProfileParams) => {
  try {
    const { error, data, status } = await supabase.from('profiles').upsert(updateProfile)

    if (error) {
      throw error
    }

    return { data, error, status }
  } catch (error) {
    throw error
  }
}

export const ProfileHooks = {
  getUserProfile,
  updateUserProfile,
}
