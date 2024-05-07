import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Channel as TChannel } from 'stream-chat'
import { Channel, LoadingDot, MessageInput, MessageList, useChatContext } from 'stream-chat-expo'

export default function ChannelScreen() {
  const [channel, setChannel] = useState<TChannel | null>(null)
  const { cid } = useLocalSearchParams<{ cid: string }>()

  const { client } = useChatContext()

  useEffect(() => {
    const fetchChannel = async () => {
      const channel = await client.queryChannels({ cid })
      setChannel(channel[0])
    }

    fetchChannel()
  }, [cid])

  if (!channel) {
    return <LoadingDot />
  }

  return (
    <Channel channel={channel}>
      <MessageList />
      <SafeAreaView edges={['bottom']}>
        <MessageInput />
      </SafeAreaView>
    </Channel>
  )
}
