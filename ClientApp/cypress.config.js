const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    experimentalStudio: true,
    viewportWidth: 1200,
    viewportHeight: 600
  },
  env: {
    apiUrl: 'https://todolistpenny.azurewebsites.net'
  },
  component: {
    specPattern: 'src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viewportWidth: 1200,
      viewportHeight: 600
    }
  }
})
