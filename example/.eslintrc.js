module.exports = {
  settings: {
    'import/ignore': ['node_modules']
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [],
  // add your custom rules here
  rules: {},
  overrides: [
    {
      files: ['components/**/*.{js,ts,vue}'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}
