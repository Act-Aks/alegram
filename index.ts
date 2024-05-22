// index.js
import { supabase } from '@/lib/supabase'
import { tokenProvider } from '@/utils/auth/auth.hooks'
import { setPushConfig } from '@/utils/misc/setPushConfig'
import notifee from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'
import 'expo-router/entry'
import { StreamChat } from 'stream-chat'

setPushConfig()

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // You can also provide tokenProvider instead of static token
  // await client._setToken({ id: userId }, tokenProvider)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    console.log('No user on the session!')
    return
  }
  const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!)

  client._setToken(
    {
      id: session.user.id,
    },
    tokenProvider,
  )
  // handle the message
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
      // add a press action to open the app on press
      pressAction: {
        id: 'default',
      },
    },
  })
})
