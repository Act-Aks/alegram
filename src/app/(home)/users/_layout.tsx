import { useTheme } from '@/providers/ThemeProvider'
import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function UsersLayout() {
  const { colors } = useTheme()

  return (
    <Stack>
      <Stack.Screen
        name={'index'}
        options={{
          headerTitle: 'Users',
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
