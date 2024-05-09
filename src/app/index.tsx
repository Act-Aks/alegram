import { colors } from '@/constants'
import { useAuth } from '@/providers/AuthProvider'
import { Redirect } from 'expo-router'
import { ActivityIndicator, StyleSheet } from 'react-native'

export default function App() {
  const { user, loading } = useAuth()

  if (!user && loading) {
    return <ActivityIndicator style={styles.loadingStyle} color={colors.primary} />
  }

  if (user) {
    return <Redirect href={'/(home)'} />
  }

  return <Redirect href={'/(auth)/login'} />
}

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
