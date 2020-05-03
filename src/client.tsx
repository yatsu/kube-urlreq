import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'theme-ui'

import App from './App'
import theme from './theme'

hydrate(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
