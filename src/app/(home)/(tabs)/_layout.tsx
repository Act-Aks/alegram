import { Icon } from '@/components'
import { colors } from '@/constants'
import { Tabs } from 'expo-router'

export default function TabsLayout() {
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
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({ size, color }) => (
            <Icon iconType={'FontAwesome'} iconName={'user-circle-o'} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
