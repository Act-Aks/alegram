import notifee, { EventType } from '@notifee/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'
import { router } from 'expo-router'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { useAuth } from './AuthProvider'

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!)

// Request Push Notification permission from device.
const requestPermission = async () => {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)
  }
}

export default function NotificationsProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false)
  const unsubscribeTokenRefreshListenerRef = useRef<() => void>()

  const { user } = useAuth()

  useEffect(() => {
    // Register FCM token with stream chat server.
    const registerPushToken = async () => {
      const token = await messaging().getToken()
      const push_provider = 'firebase'
      const push_provider_name = 'Firebase' // name an alias for your push provider (optional)
      client.setLocalDevice({
        id: token,
        push_provider,
        // push_provider_name is meant for optional multiple providers support, see: https://getstream.io/chat/docs/react/push_providers_and_multi_bundle
        push_provider_name,
      })
      await AsyncStorage.setItem('@current_push_token', token)

      const removeOldToken = async () => {
        const oldToken = await AsyncStorage.getItem('@current_push_token')
        if (oldToken !== null) {
          await client.removeDevice(oldToken)
        }
      }

      unsubscribeTokenRefreshListenerRef.current = messaging().onTokenRefresh(async newToken => {
        await Promise.all([
          removeOldToken(),
          client.addDevice(newToken, push_provider, user?.id, push_provider_name),
          AsyncStorage.setItem('@current_push_token', newToken),
        ])
      })
    }

    const init = async () => {
      await requestPermission()
      await registerPushToken()

      setIsReady(true)
    }

    init()

    return () => {
      client?.disconnectUser()
      unsubscribeTokenRefreshListenerRef.current?.()
    }
  }, [])

  useEffect(() => {
    // add listener to notifications received when on foreground
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      // @ts-ignore
      const message = await client.getMessage(remoteMessage?.data?.id)

      // create the android channel to send the notification to
      const channelId = await notifee.createChannel({
        id: 'chat-messages',
        name: 'Chat Messages',
      })

      // display the notification
      const { stream, ...rest } = remoteMessage.data ?? {}
      const data = {
        ...rest,
        ...((stream as unknown as Record<string, string> | undefined) ?? {}), // extract and merge stream object if present
      }
      await notifee.displayNotification({
        title: 'New message from ' + message?.message?.user?.name,
        body: message.message.text,
        data,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      })
    })

    // add listener to user interactions on foreground notifications
    const unsubscribeForegroundEvent = notifee.onForegroundEvent(({ detail, type }) => {
      if (type === EventType.PRESS) {
        // user has pressed notification
        const channelId = detail.notification?.data?.channel_id
        // The navigation logic, to navigate to relevant channel screen.
        if (channelId) {
          // navigationContainerRef.current?.navigate('ChannelScreen', { channelId })
          router.navigate(`/channel/${channelId}`)
        }
      }
    })

    return () => {
      unsubscribeOnMessage()
      unsubscribeForegroundEvent()
    }
  }, [])

  if (!isReady) {
    return null
  }

  return <>{children}</>
}
