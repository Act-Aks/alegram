import { tokenProvider } from '@/utils/auth/auth.hooks'
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk'
import { PropsWithChildren, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { useAuth } from './AuthProvider'
import { useTheme } from './ThemeProvider'

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY!

export default function VideoProvider({ children }: PropsWithChildren) {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null)
  const { colors } = useTheme()
  const { user } = useAuth()

  useEffect(() => {
    if (!user?.id) return

    const initializeVideoClient = async () => {
      const client = new StreamVideoClient({ apiKey, user: user, tokenProvider })
      setVideoClient(client)
    }

    initializeVideoClient()

    return () => {
      if (videoClient) videoClient.disconnectUser()
      setVideoClient(null)
    }
  }, [user?.id])

  if (!videoClient) {
    return <ActivityIndicator style={styles.loader} color={colors.primary} />
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
