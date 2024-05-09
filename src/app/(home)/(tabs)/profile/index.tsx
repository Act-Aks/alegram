import { Input } from '@/components'
import { basePadding } from '@/constants'
import { useAuth } from '@/providers/AuthProvider'
import { useTheme } from '@/providers/ThemeProvider'
import { ProfileHooks } from '@/utils/profile/profile.hooks'
import { useEffect, useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Profile() {
  const [loading, setLoading] = useState<boolean>(true)
  const [fullName, setFullName] = useState<string>('')
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const { colors } = useTheme()

  const { session } = useAuth()

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      const { data } = await ProfileHooks.getUserProfile(session)

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setFullName(data.full_name)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
    full_name,
  }: {
    username: string
    website: string
    avatar_url: string
    full_name: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        full_name,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      await ProfileHooks.updateUserProfile(updates)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const dismissKeyboard = () => Keyboard.dismiss()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity activeOpacity={1} onPress={dismissKeyboard}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Input label='Email' value={session?.user?.email} disabled />
          </View>
          <View style={styles.verticallySpaced}>
            <Input
              label='Fullname'
              value={fullName || ''}
              onChangeText={text => setFullName(text)}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Input
              label='Username'
              value={username || ''}
              onChangeText={text => setUsername(text)}
            />
          </View>
          {website && (
            <View style={styles.verticallySpaced}>
              <Input
                label='Website'
                value={website || ''}
                onChangeText={text => setWebsite(text)}
              />
            </View>
          )}
        </KeyboardAvoidingView>

        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title={loading ? 'Loading ...' : 'Update'}
            onPress={() =>
              updateProfile({ username, website, avatar_url: avatarUrl, full_name: fullName })
            }
            disabled={loading}
            buttonStyle={{ backgroundColor: colors.primary, borderRadius: 8 }}
            titleStyle={{ color: 'white', fontWeight: 'bold' }}
          />
        </View>
      </TouchableOpacity>
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
