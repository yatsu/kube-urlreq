import preset from '@rebass/preset'
import { ThemeProvider } from 'emotion-theming'
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const theme = {
  ...preset
}

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
