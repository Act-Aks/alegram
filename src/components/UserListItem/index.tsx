import { useAuth } from '@/providers/AuthProvider'
import { useTheme } from '@/providers/ThemeProvider'
import { router } from 'expo-router'
import { Pressable, StyleSheet, Text } from 'react-native'
import { useChatContext } from 'stream-chat-expo'

type UserListItemProps = {
  user: any
}

const UserListItem = ({ user }: UserListItemProps) => {
  const { client } = useChatContext()
  const { user: me } = useAuth()
  const { colors } = useTheme()

  const onPress = async () => {
    const channel = client.channel('messaging', {
      members: [me!.id, user.id],
    })
    await channel.watch()

    router.replace(`/(home)/channel/${channel.cid}`)
  }

  return (
    <Pressable onPress={onPress} style={[styles.container, { backgroundColor: colors.secondary }]}>
      <Text style={[styles.fullName, { color: colors.text }]}>{user.full_name}</Text>
      <Text style={[styles.username, { color: colors.primary }]}>{`@${user.username}`}</Text>
    </Pressable>
  )
}

export default UserListItem

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'red',
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  fullName: {
    fontSize: 14,
    fontWeight: '700',
  },
  username: {
    fontSize: 12,
    fontWeight: '400',
  },
})
