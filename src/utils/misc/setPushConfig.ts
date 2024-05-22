import { supabase } from '@/lib/supabase'
import { AndroidImportance } from '@notifee/react-native'
import { StreamVideoClient, StreamVideoRN } from '@stream-io/video-react-native-sdk'
import { router } from 'expo-router'
import { tokenProvider } from '../auth/auth.hooks'

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY!

export function setPushConfig() {
  StreamVideoRN.setPushConfig({
    // pass true to inform the SDK that this is an expo app
    isExpo: true,
    ios: {
      // add your push_provider_name for iOS that you have setup in Stream dashboard
      pushProviderName: 'APN',
    },
    android: {
      // add your push_provider_name for Android that you have setup in Stream dashboard
      pushProviderName: 'Firebase',
      // configure the notification channel to be used for incoming calls for Android.
      incomingCallChannel: {
        id: 'stream_incoming_call',
        name: 'Incoming call notifications',
        // This is the advised importance of receiving incoming call notifications.
        // This will ensure that the notification will appear on-top-of applications.
        importance: AndroidImportance.HIGH,
        // optional: if you dont pass a sound, default ringtone will be used
        // sound: <your sound url>
      },
      // configure the functions to create the texts shown in the notification
      // for incoming calls in Android.
      incomingCallNotificationTextGetters: {
        getTitle: (createdUserName: string) => `Incoming call from ${createdUserName}`,
        getBody: (_createdUserName: string) => 'Tap to answer the call',
      },
    },
    // add the callback to be executed a call is accepted, used for navigation
    navigateAcceptCall: () => {
      router.push('/call')
    },
    // add the callback to be executed when a notification is tapped,
    // but the user did not press accept or decline, used for navigation
    navigateToIncomingCall: () => {
      router.push('/call')
    },
    // add the async callback to create a video client
    // for incoming calls in the background on a push notification
    createStreamVideoClient: async () => {
      // note that since the method is async,
      // you can call your server to get the user data or token or retrieve from offline storage.
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        console.log('No user on the session!')
        return
      }

      return new StreamVideoClient({
        apiKey, // pass your stream api key
        user: session.user,
        tokenProvider,
      })
    },
  })
}
