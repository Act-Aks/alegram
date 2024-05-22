import { RingingCallContent, StreamCall, useCalls } from '@stream-io/video-react-native-sdk'
import { router } from 'expo-router'

export default function CallScreen() {
  const calls = useCalls()
  const call = calls?.[0]

  if (!call) {
    if (router.canGoBack()) {
      return router.back()
    } else {
      return router.push('/')
    }
  }

  return (
    <StreamCall call={call}>
      <RingingCallContent />
    </StreamCall>
  )
}
