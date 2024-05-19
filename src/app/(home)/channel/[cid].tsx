import { Icon } from '@/components'
import { useTheme } from '@/providers/ThemeProvider'
import { MemberRequest, useStreamVideoClient } from '@stream-io/video-react-native-sdk'
import * as Crypto from 'expo-crypto'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Channel as TChannel } from 'stream-chat'
import { Channel, LoadingDot, MessageInput, MessageList, useChatContext } from 'stream-chat-expo'

export default function ChannelScreen() {
  const [channel, setChannel] = useState<TChannel | null>(null)
  const { cid } = useLocalSearchParams<{ cid: string }>()
  const { colors } = useTheme()

  const { client } = useChatContext()
  const videoClient = useStreamVideoClient()

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

  const onCall = async () => {
    const members = Object.values(channel.state.members).map(member => ({
      user_id: member.user_id,
    })) as MemberRequest[]

    const callId = Crypto.randomUUID()
    const call = videoClient!.call('default', callId)

    await call.getOrCreate({
      data: {
        members,
      },
    })

    router.push(`/call/${call.id}`)
  }

  return (
    <Channel channel={channel} audioRecordingEnabled>
      <Stack.Screen
        name={'[cid]'}
        options={{
          headerRight: () => (
            <Pressable onPress={onCall} style={{ marginHorizontal: 8 }}>
              <Icon iconType={'Ionicons'} iconName={'call'} size={24} color={colors.primary} />
            </Pressable>
          ),
        }}
      />
      <MessageList />
      <SafeAreaView edges={['bottom']}>
        <MessageInput />
      </SafeAreaView>
    </Channel>
  )
}
