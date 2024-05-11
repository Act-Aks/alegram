import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import * as ImagePicker from 'expo-image-picker'

type UpdateUserProfileParams = {
  id: Session['user']['id']
  username: string
  website: string
  avatar_url: string
  updated_at: Date
}

type UpdateUserProfileAvatarParams = {
  path: string
  arraybuffer: ArrayBuffer
  image: ImagePicker.ImagePickerAsset
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

export const getUserProfileById = async (userId: string) => {
  try {
    const { data, error, status } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
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

export const getUserProfileAvatar = async ({ path }: { path: string }) => {
  try {
    const { error, data } = await supabase.storage.from('avatars').download(path)

    if (error) {
      throw error
    }

    return { data, error }
  } catch (error) {
    throw error
  }
}

export const getUserProfileAvatarPublicUrl = (image: string) => {
  return supabase.storage.from('avatars').getPublicUrl(image).data.publicUrl
}

export const updateUserProfileAvatar = async ({
  path,
  arraybuffer,
  image,
}: UpdateUserProfileAvatarParams) => {
  try {
    const { error, data } = await supabase.storage.from('avatars').upload(path, arraybuffer, {
      contentType: image.mimeType ?? 'image/jpeg',
    })

    if (error) {
      throw error
    }

    return { data, error }
  } catch (error) {
    throw error
  }
}

export const getUsers = async (currentUserId: Session['user']['id']) => {
  try {
    const { data, error, status } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', currentUserId)

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
  getUserProfileAvatar,
  updateUserProfileAvatar,
  getUserProfileById,
  getUserProfileAvatarPublicUrl,
  getUsers,
}
