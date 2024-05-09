import { colors, theme } from '@/constants'
import { getAppTheme, setAppTheme } from '@/utils/theme/theme.hooks'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { Appearance } from 'react-native'

type TThemeContext = {
  colorScheme: 'dark' | 'light'
  colors: typeof colors
  toggleColorScheme: () => void
}

const ThemeContext = createContext<TThemeContext>({
  colorScheme: 'light',
  colors: theme.light,
  toggleColorScheme: () => {},
})

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme() ?? 'light')

  useEffect(() => {
    const setTheme = async () => {
      try {
        const appTheme = await getAppTheme()

        if (appTheme) {
          setColorScheme(appTheme)
          Appearance.setColorScheme(appTheme)
        } else {
          await setAppTheme(colorScheme)
        }
      } catch (error) {
        console.error(error)
      }
    }

    setTheme()
  }, [])

  const toggleColorScheme = async () => {
    if (colorScheme === 'light') {
      Appearance.setColorScheme('dark')
      setColorScheme('dark')
      await setAppTheme('dark')
    } else {
      Appearance.setColorScheme('light')
      setColorScheme('light')
      await setAppTheme('light')
    }
  }

  return (
    <ThemeContext.Provider value={{ colorScheme, colors: theme[colorScheme], toggleColorScheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext)
}
