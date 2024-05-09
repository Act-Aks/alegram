import { useTheme } from '@/providers/ThemeProvider'
import { StyleSheet, Text, View } from 'react-native'
import { Switch } from 'react-native-elements'

const ThemeSwitcher = () => {
  const { colors, toggleColorScheme, colorScheme } = useTheme()

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background, borderColor: colors.icon }]}
    >
      <Switch
        trackColor={{ false: colors.textMuted, true: colors.primary }}
        thumbColor={colors.icon}
        value={colorScheme === 'dark'}
        onValueChange={toggleColorScheme}
        onChange={toggleColorScheme}
      />
      <Text style={{ ...styles.text, color: colors.text }}>{colorScheme}</Text>
    </View>
  )
}

export default ThemeSwitcher

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    marginRight: 4,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 8,
    fontWeight: '500',
    position: 'absolute',
  },
})
