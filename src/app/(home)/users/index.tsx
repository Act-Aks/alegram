import { UserListItem } from '@/components'
import { basePadding } from '@/constants'
import { useAuth } from '@/providers/AuthProvider'
import { useTheme } from '@/providers/ThemeProvider'
import { ProfileHooks } from '@/utils/profile/profile.hooks'
import { useEffect, useState } from 'react'
import { FlatList, FlatListProps, StyleSheet } from 'react-native'

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
    <FlatList
      data={users}
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.contentContainerStyle}
      renderItem={renderItem}
      keyExtractor={item => item?.id}
    />
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: basePadding.horizontal,
    paddingVertical: basePadding.vertical,
    gap: 4,
  },
})
