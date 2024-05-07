import { router } from 'expo-router'
import { Channel as TChannel } from 'stream-chat'
import { ChannelList } from 'stream-chat-expo'

export default function MainTab() {
  const onSelectChannel = (channel: TChannel) => router.push(`/channel/${channel.cid}`)

  return <ChannelList onSelect={onSelectChannel} />
}
