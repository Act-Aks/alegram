import { Input } from '@/components'
import { basePadding } from '@/constants'
import { supabase } from '@/lib/supabase'
import { useTheme } from '@/providers/ThemeProvider'
import { AuthHooks } from '@/utils/auth/auth.hooks'

import { useState } from 'react'
import { Alert, AppState, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signInLoading, setsignInLoading] = useState(false)
  const [signUpLoading, setsignUpLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { colors } = useTheme()

  async function signIn() {
    setsignInLoading(true)
    const { error } = await AuthHooks.signInWithEmail({ email, password })

    if (error) Alert.alert(error.message)
    setsignInLoading(false)
  }

  async function signUp() {
    setsignUpLoading(true)
    const {
      data: { session },
      error,
    } = await AuthHooks.signUpWithEmail({ email, password })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setsignUpLoading(false)
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label='Email'
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder='email@gmail.com'
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword}
          placeholder='Password'
          autoCapitalize={'none'}
          textContentType={'password'}
          rightIcon={{
            type: 'font-awesome',
            name: showPassword ? 'eye-slash' : 'eye',
            color: colors.icon,
            onPress: () => setShowPassword(t => !t),
          }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title='Sign in'
            disabled={signInLoading}
            loading={signInLoading}
            onPress={signIn}
            buttonStyle={{ backgroundColor: colors.primary, borderRadius: 8 }}
            titleStyle={{ color: 'white', fontWeight: 'bold' }}
          />
        </View>
        <View style={(styles.verticallySpaced, { backgroundColor: colors.background })}>
          <Button
            title='Sign up'
            disabled={signUpLoading}
            loading={signUpLoading}
            onPress={signUp}
            buttonStyle={{ backgroundColor: colors.background, borderRadius: 8 }}
            titleStyle={{ color: colors.text, fontWeight: 'bold' }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: basePadding.horizontal,
    paddingVertical: basePadding.vertical,
    flex: 1,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
