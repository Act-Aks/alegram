import AsyncStorage from '@react-native-async-storage/async-storage'
import { ColorSchemeName } from 'react-native'

type ColorScheme = 'light' | 'dark'

export const setAppTheme = async (theme: ColorScheme) => {
  try {
    await AsyncStorage.setItem('colorScheme', theme)
  } catch (error) {
    console.error(error)
  }
}

export const getAppTheme = async (): Promise<ColorSchemeName> => {
  try {
    const colorScheme = await AsyncStorage.getItem('colorScheme')
    return colorScheme as ColorScheme
  } catch (error) {
    console.error(error)
    return undefined
  }
}
