import { getChatOverlayStyle } from '@/utils/misc/common'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { StreamChat } from 'stream-chat'
import { Chat, OverlayProvider } from 'stream-chat-expo'
import { useTheme } from './ThemeProvider'

const streamChatClient = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!)

export default function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isClientConnected, setIsClientConnected] = useState<boolean>(false)
  const { colors } = useTheme()
  const { style } = getChatOverlayStyle(colors)

  useEffect(() => {
    const connectToStream = async () => {
      await streamChatClient.connectUser(
        {
          id: 'jlahey',
          name: 'Jim Lahey',
          image: 'https://i.imgur.com/fR9Jz14.png',
        },
        streamChatClient.devToken('jlahey'),
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
  }, [])

  if (!isClientConnected) {
    return <ActivityIndicator />
  }

  return (
    <OverlayProvider value={{ style }}>
      <Chat client={streamChatClient}>{children}</Chat>
    </OverlayProvider>
  )
}
