import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import globals from 'globals'

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  pluginReactConfig,
]
