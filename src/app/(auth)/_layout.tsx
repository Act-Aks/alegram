import { ThemeSwitcher } from '@/components'
import { useAuth } from '@/providers/AuthProvider'
import { useTheme } from '@/providers/ThemeProvider'
import { Redirect, Stack } from 'expo-router'
import { View } from 'react-native'

export default function AuthLayout() {
  const { user } = useAuth()
  const { colors } = useTheme()

  if (!!user) {
    return <Redirect href={'/(home)'} />
  }

  return (
    <Stack>
      <Stack.Screen
        name={'login'}
        options={{
          headerTitle: 'Login',
          headerTitleAlign: 'center',
          headerTintColor: colors.text,
          headerBackground: () => <View style={{ flex: 1, backgroundColor: colors.background }} />,
          headerRight: () => <ThemeSwitcher />,
        }}
      />
    </Stack>
  )
}
