import { CallContent, StreamCall, useStreamVideoClient } from '@stream-io/video-react-native-sdk'
import { useLocalSearchParams } from 'expo-router'

export default function Call() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const videoClient = useStreamVideoClient()
  const call = videoClient!.call('default', id!)
  call.join({ create: true })

  return (
    <StreamCall call={call}>
      <CallContent />
    </StreamCall>
  )
}
