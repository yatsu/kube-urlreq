import bodyParser from 'body-parser'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ThemeProvider } from 'theme-ui'
import fetch from 'node-fetch'
import AbortController from 'abort-controller'

import App from './App'
import theme from './theme'

let assets: any

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)
}
syncLoadAssets()

const app = express()

app.disable('x-powered-by')

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR!))

app.use(bodyParser.json()) // tslint:disable-line

app.post('/fetch', async (req: express.Request, res: express.Response) => {
  const { url } = req.body
  console.log('url', url)

  const ac = new AbortController()
  let timedout = false
  const timeout = setTimeout(() => {
    timedout = true
    ac.abort()
  }, 5000)

  try {
    const fetchRes = await fetch(url, { method: 'GET', signal: ac.signal })
    const text = await fetchRes.text()
    res.status(fetchRes.status).send(text)
  } catch (err) {
    if (timedout) {
      res.status(400).send('Timeout')
    } else {
      res.status(400).send(err)
    }
  } finally {
    clearTimeout(timeout)
  }
})

app.get('/*', (req: express.Request, res: express.Response) => {
  const context = {}
  const markup = renderToString(
    <ThemeProvider theme={theme}>
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    </ThemeProvider>
  )
  res.send(
    `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>kube-urlreq</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
  )
})

export default app
