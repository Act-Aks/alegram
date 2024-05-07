import {
  AntDesign,
  Entypo,
  EvilIcons,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons'
import { StyleProp, ViewStyle } from 'react-native'

const ICONS = {
  AntDesign,
  Entypo,
  EvilIcons,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
}

type IconGlyphMap = {
  AntDesign: keyof typeof AntDesign.glyphMap
  Entypo: keyof typeof Entypo.glyphMap
  EvilIcons: keyof typeof EvilIcons.glyphMap
  FontAwesome: keyof typeof FontAwesome.glyphMap
  FontAwesome5: keyof typeof FontAwesome5.glyphMap
  FontAwesome6: keyof typeof FontAwesome6.glyphMap
  Fontisto: keyof typeof Fontisto.glyphMap
  Foundation: keyof typeof Foundation.glyphMap
  Ionicons: keyof typeof Ionicons.glyphMap
  MaterialCommunityIcons: keyof typeof MaterialCommunityIcons.glyphMap
  MaterialIcons: keyof typeof MaterialIcons.glyphMap
  Octicons: keyof typeof Octicons.glyphMap
  SimpleLineIcons: keyof typeof SimpleLineIcons.glyphMap
  Zocial: keyof typeof Zocial.glyphMap
}

type IconType = keyof IconGlyphMap

type IconProps<F extends IconType> = {
  iconType: F
  iconName: IconGlyphMap[F]
  size?: number
  color?: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

const Icon = <T extends keyof IconGlyphMap>({
  iconType,
  iconName,
  size = 24,
  color,
  onPress,
  style,
}: IconProps<T>): JSX.Element => {
  const IconComponent: JSX.ElementType = ICONS[iconType] ?? ICONS.Entypo

  return <IconComponent name={iconName} size={size} color={color} onPress={onPress} style={style} />
}

export default Icon
