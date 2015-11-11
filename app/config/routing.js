import React from 'react'
import express from 'express'
import { match } from 'react-router'
import { renderToString } from 'react-dom/server'

import configureStore from '../store/configureStore.prod'
import apiRoutes from '../api'

import routes from '../routes'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'

let app = express.Router()

// API routing
app.use('api', apiRoutes)

// Default React Rendering
app.use((req, res, next) => {
  const initialData = {} // Load initial fetch data here
  const store = configureStore(initialData)

  store.dispatch(match({ routes, location: req.url }, (error, redirectLocation, state) => {
    console.error(error, redirectLocation, state)
    state.components.map(e => console.error(e))
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else {
      const root = renderToString(
        <Provider store={store}>
          <ReduxRouter />
        </Provider>
      )
      let initialState = store.getState()
      return res.render('index', { root, initialState })
    }
  }))
})

export default app
