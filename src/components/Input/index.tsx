import { useTheme } from '@/providers/ThemeProvider'
import { InputProps, Input as RNInput } from 'react-native-elements'

const Input = ({ leftIcon, ...props }: InputProps) => {
  const { colors } = useTheme()

  return (
    <RNInput
      leftIcon={{ ...(leftIcon as any), color: colors.icon }}
      placeholderTextColor={colors.placeholder}
      labelStyle={{ color: colors.text }}
      inputStyle={{ color: colors.text, marginLeft: 4 }}
      {...props}
    />
  )
}

export default Input
