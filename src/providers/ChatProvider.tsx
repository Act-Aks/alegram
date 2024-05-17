import { AuthHooks } from '@/utils/auth/auth.hooks'
import { getChatOverlayStyle } from '@/utils/misc/common'
import { ProfileHooks } from '@/utils/profile/profile.hooks'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { StreamChat } from 'stream-chat'
import { Chat, OverlayProvider } from 'stream-chat-expo'
import { useAuth } from './AuthProvider'
import { useTheme } from './ThemeProvider'

const streamChatClient = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!)

export default function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isClientConnected, setIsClientConnected] = useState<boolean>(false)
  const { profile } = useAuth()
  const { colors } = useTheme()
  const { style } = getChatOverlayStyle(colors)

  useEffect(() => {
    if (!profile) {
      return
    }

    const connectToStream = async () => {
      await streamChatClient.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
          image: ProfileHooks.getUserProfileAvatarPublicUrl(profile.avatar_url),
        },
        AuthHooks.tokenProvider,
      )

      setIsClientConnected(true)

      // const channel = streamChatClient.channel('messaging', 'general', {
      //   name: 'General',
      // })

      // await channel.watch()
    }

    connectToStream()

    return () => {
      streamChatClient.disconnectUser()
      setIsClientConnected(false)
    }
  }, [profile?.id])

  if (!isClientConnected) {
    return <ActivityIndicator color={colors.primary} />
  }

  return (
    <OverlayProvider value={{ style }}>
      <Chat client={streamChatClient}>{children}</Chat>
    </OverlayProvider>
  )
}
