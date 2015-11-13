import React from 'react'
import express from 'express'
import { match } from 'redux-router/server'
import { renderToString } from 'react-dom/server'

import configureStore from '../store/configureStore'
import apiRoutes from '../api'

import Root from '../containers/root'

let app = express.Router()

// API routing
app.use('api', apiRoutes)

// Default React Rendering
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    global.webpackIsoTools.refresh()
  }
  const initialData = {} // Load initial fetch data here
  const store = configureStore(initialData)

  function callback (error, redirectLocation, state) {
    console.error(error, redirectLocation, state)
    // let fetchs = state.components.reduce((p, e) => {
    //   if (e.fetchData) {
    //     p.push(e.fetchData)
    //   }
    //   return p
    // }, [])
    // // console.error(fetchs.map(e => e()))
    // Promise.all(fetchs.map(e => e())).then(() => {
      // return res.render('index', {root: '', initialState: {}})
    // })
    // return
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else {
      const root = renderToString(<Root store={store}/>)
      let initialState = store.getState()
      res.render('index', { root, initialState })
    }
  }
  let action = match(req.originalUrl, callback)
  store.dispatch(action)
})

export default app
