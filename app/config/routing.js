// import React from 'react'
// import { renderToString } from 'react-dom/server'
// import Root from '../containers/root'
import express from 'express'

import { match } from 'redux-router/server'

import configureStore from '../store/configureStore'
import apiRoutes from '../api'
import authRoutes from '../api/auth'

let app = express.Router()

// API routing
app.use('/api', apiRoutes)
app.use('/', authRoutes)

// Default React Rendering
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    global.webpackIsoTools.refresh()
  }

  const initialData = {
    user: req.user || {}
  } // Load initial fetch data here

  const store = configureStore(initialData)

  const action = match(req.originalUrl, (_error, redirectLocation, state) => {
    return res.render('index.ejs', { root: '', initialState: JSON.stringify({}) })
  })
    // console.error(error, redirectLocation, state)
    // const promises = state ? state.components.reduce((p, e) => {
    //   if (e.fetchData) {
    //     p.push(e.fetchData(store.dispatch, store.getState))
    //   }
    //   return p
    // }, []) : []
    //
    // Promise.all(promises).then((_values) => {
    //   if (error) {
    //     res.status(500).send(error.message)
    //   } else if (redirectLocation) {
    //     res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    //   } else {
    //     const root = renderToString(<Root store={store}/>)
    //     const initialState = store.getState()
    //     res.render('index.ejs', { root, initialState })
    //   }
    // })

  store.dispatch(action)
})

export default app
