import { UserListItem } from '@/components'
import { basePadding } from '@/constants'
import { useAuth } from '@/providers/AuthProvider'
import { useTheme } from '@/providers/ThemeProvider'
import { ProfileHooks } from '@/utils/profile/profile.hooks'
import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native'

export default function Users() {
  const [users, setUsers] = useState<any[]>([])
  const { user } = useAuth()
  const { colors } = useTheme()

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: usersProfile } = await ProfileHooks.getUsers(user?.id!)

      setUsers(usersProfile)
    }
    fetchUsers()
  }, [])

  const renderItem: FlatListProps<any>['renderItem'] = ({ item }) => <UserListItem user={item} />

  return (
    <>
      <Stack.Screen
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
      <FlatList
        data={users}
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
      />
    </>
  )
}

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    borderBottomWidth: 1,
    opacity: 0.9,
  },
  contentContainerStyle: {
    paddingHorizontal: basePadding.horizontal,
    paddingVertical: basePadding.vertical,
    gap: 4,
  },
})
