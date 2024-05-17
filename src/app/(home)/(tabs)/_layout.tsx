import { Icon, Logout, ThemeSwitcher } from '@/components'
import { useTheme } from '@/providers/ThemeProvider'
import { Link, Tabs } from 'expo-router'
import { StyleSheet, View } from 'react-native'

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
          headerTitle: 'Alegram',
          title: 'Home',
          ...screenOptions,
          headerRight: () => (
            <Link href={'/(home)/users'} style={{ marginHorizontal: 16 }}>
              <Icon iconType={'FontAwesome5'} iconName={'users'} size={24} color={colors.primary} />
            </Link>
          ),
          tabBarIcon: ({ size, color }) => (
            <Icon iconType={'FontAwesome'} iconName={'home'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={'profile'}
        options={{
          headerTitle: 'Profile',
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
    borderTopWidth: 2,
    opacity: 0.9,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
})
