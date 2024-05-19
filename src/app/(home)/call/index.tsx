import { CallContent, StreamCall, useStreamVideoClient } from '@stream-io/video-react-native-sdk'

const callId = 'my-call-id'

export default function Call() {
  const videoClient = useStreamVideoClient()
  const call = videoClient!.call('default', callId)
  call.join({ create: true })

  return (
    <StreamCall call={call}>
      <CallContent />
    </StreamCall>
  )
}
