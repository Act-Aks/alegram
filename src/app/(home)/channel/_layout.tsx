import { Icon } from '@/components'
import { useTheme } from '@/providers/ThemeProvider'
import { useStreamVideoClient } from '@stream-io/video-react-native-sdk'
import * as Crypto from 'expo-crypto'
import { Stack, router } from 'expo-router'
import { Pressable, StyleSheet, View } from 'react-native'

export default function ChannelLayout() {
  const { colors } = useTheme()
  const videoClient = useStreamVideoClient()

  const onCall = async () => {
    const callId = Crypto.randomUUID()
    const call = videoClient!.call('default', callId)

    await call.getOrCreate()
    router.push('/call')
  }

  return (
    <Stack>
      <Stack.Screen
        name={'[cid]'}
        options={{
          headerTitle: 'Channel',
          headerTitleAlign: 'center',
          headerTintColor: colors.text,
          headerShadowVisible: true,
          animation: 'slide_from_right',
          headerBackground: () => (
            <View
              style={{
                ...styles.headerBackground,
                backgroundColor: colors.background,
                borderBottomColor: colors.primary,
              }}
            />
          ),
          headerRight: () => (
            <Pressable onPress={onCall} style={{ marginHorizontal: 8 }}>
              <Icon iconType={'Ionicons'} iconName={'call'} size={24} color={colors.primary} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  )
}

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    borderBottomWidth: 1,
    opacity: 0.9,
  },
})
