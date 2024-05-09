import AuthProvider from '@/providers/AuthProvider'
import ThemeProvider from '@/providers/ThemeProvider'

import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <Slot />
          <StatusBar style={'auto'} />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}
