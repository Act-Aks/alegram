import { Icon, Logout, ThemeSwitcher } from '@/components'
import { useTheme } from '@/providers/ThemeProvider'
import { Tabs } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'stream-chat-expo'

export default function TabsLayout() {
  const { colors } = useTheme()

  const screenOptions: any = {
    headerTintColor: colors.text,
    tabBarActiveTintColor: colors.primary,
    headerBackground: () => (
      <View
        style={{
          ...styles.headerBackground,
          backgroundColor: colors.background,
          borderBottomColor: colors.primary,
        }}
      />
    ),
    tabBarStyle: {
      ...styles.tabBarStyle,
      backgroundColor: colors.background,
      borderColor: colors.primary,
      shadowColor: colors.primary,
    },
  }

  return (
    <Tabs>
      <Tabs.Screen
        name={'index'}
        options={{
          title: 'Alegram',
          ...screenOptions,
          tabBarIcon: ({ size, color }) => (
            <Icon iconType={'FontAwesome'} iconName={'home'} size={size} color={color} />
          ),
          headerRight: () => (
            <View style={styles.marginR}>
              <Avatar size={32} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name={'profile'}
        options={{
          title: 'Profile',
          ...screenOptions,
          tabBarIcon: ({ size, color }) => (
            <Icon iconType={'FontAwesome'} iconName={'user-circle-o'} size={size} color={color} />
          ),
          headerRight: () => (
            <View style={styles.rightHeader}>
              <Logout />
              <ThemeSwitcher />
            </View>
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  rightHeader: {
    flexDirection: 'row',
    gap: 8,
  },
  marginR: {
    marginRight: 12,
  },
  headerBackground: {
    flex: 1,
    borderBottomWidth: 1,
    opacity: 0.9,
  },
  tabBarStyle: {
    borderWidth: 1,
    opacity: 0.9,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
})
