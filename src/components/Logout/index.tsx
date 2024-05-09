import { AuthHooks } from '@/utils/auth/auth.hooks'
import { Pressable, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

const Logout = () => {
  const { signOut } = AuthHooks

  return (
    <Pressable style={styles.container} onPress={signOut}>
      <Icon name='logout' type='antdesign' color='red' />
    </Pressable>
  )
}

export default Logout

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
