import { supabase } from '@/lib/supabase'
import { Session, User } from '@supabase/supabase-js'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

type TAuthContext = {
  session: Session | null
  user: User | undefined | null
  loading: boolean
}

const AuthContext = createContext<TAuthContext>({
  session: null,
  user: null,
  loading: false,
})

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
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

  return (
    <AuthContext.Provider value={{ session, user: session?.user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
