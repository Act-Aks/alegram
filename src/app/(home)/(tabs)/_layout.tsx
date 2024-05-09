import { Icon, Logout, ThemeSwitcher } from '@/components'
import { useTheme } from '@/providers/ThemeProvider'
import { Tabs } from 'expo-router'
import { StyleSheet, View } from 'react-native'

export default function TabsLayout() {
  const { colors } = useTheme()

  return (
    <Tabs>
      <Tabs.Screen
        name={'index'}
        options={{
          title: 'Home',
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({ size, color }) => (
            <Icon iconType={'FontAwesome'} iconName={'home'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={'profile'}
        options={{
          title: 'Profile',
          headerTintColor: colors.text,
          tabBarActiveTintColor: colors.primary,
          headerRight: () => (
            <View style={styles.rightHeader}>
              <Logout />
              <ThemeSwitcher />
            </View>
          ),
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
          tabBarIcon: ({ size, color }) => (
            <Icon iconType={'FontAwesome'} iconName={'user-circle-o'} size={size} color={color} />
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
