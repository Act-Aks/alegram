import { supabase } from '@/lib/supabase'
import { ProfileHooks } from '@/utils/profile/profile.hooks'
import { Session, User } from '@supabase/supabase-js'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

type TAuthContext = {
  session: Session | null
  user: User | undefined | null
  profile: any
  loading: boolean
}

const AuthContext = createContext<TAuthContext>({
  session: null,
  user: null,
  loading: false,
  profile: null,
})

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true)
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setSession(session)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    fetchSession()

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (!session?.user) {
      setProfile(null)
      return
    }

    const fetchProfile = async () => {
      try {
        const { data: profile } = await ProfileHooks.getUserProfileById(session.user.id)

        setProfile(profile)
      } catch (error) {
        if (error instanceof Error) {
          console.log('error', error.message)
        }
      }
    }
    fetchProfile()
  }, [session?.user])

  return (
    <AuthContext.Provider value={{ session, user: session?.user, loading, profile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
