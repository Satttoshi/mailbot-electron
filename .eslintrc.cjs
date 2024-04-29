module.exports = {
  rules: {
    'react/prop-types': 'off',
    'prettier/prettier': 'error'
  },
  plugins: [
    'react',    // Ensure this if you're using React
    'prettier'  // Add Prettier as a plugin
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier',
    'prettier'
  ]
}
