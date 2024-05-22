import { useCalls } from '@stream-io/video-react-native-sdk'
import { router, useSegments } from 'expo-router'
import { PropsWithChildren, useEffect } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function CallProvider({ children }: PropsWithChildren) {
  const calls = useCalls()
  const call = calls?.[0]

  const { top } = useSafeAreaInsets()
  const segments = useSegments()
  const isOnCallScreen = segments[1] === 'call'

  console.log(segments)

  useEffect(() => {
    if (!call) {
      return
    }

    if (!isOnCallScreen && call.state.callingState === 'ringing') {
      router.push(`/call`)
    }
  }, [call, isOnCallScreen])

  return (
    <>
      {children}
      {call && !isOnCallScreen && (
        <Pressable
          style={[styles.callHintContainer, { top: top + 50 }]}
          onPress={() => router.push(`/call`)}
        >
          <Text style={styles.call}>{`Return to call ${call.state.callingState}`}</Text>
        </Pressable>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  callHintContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'green',
  },
  call: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
})
