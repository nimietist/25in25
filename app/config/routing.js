import React from 'react'
import express from 'express'
import { match, RoutingContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import apiRoutes from '../api'
import routes from '../components/routes'
// import { createStore, applyMiddleware, compose } from 'redux'
// import Location from 'react-router/lib/Location'
// import reducers from '../components/reducers'
// import { reduxReactRouter } from 'redux-router'
// import thunk from 'redux-thunk'
// import { createHistory } from 'history'

let app = express.Router()

// API routing
app.use('api', apiRoutes)

// Default React Rendering
app.use((req, res, next) => {
  // let location = new Location(req.path, req.query)
  // let store = compose(
  //   reduxReactRouter({ routes: routes(store) }),
  //   applyMiddleware(thunk)
  // )(createStore)(reducers)
  //
  // let onMatch = (err, redirectLocation, renderProps) => {
  //   if (err) {
  //     return console.error(err)
  //   }
  //   let html = ReactDOMServer.renderToString(routes(store))
  //   return res.render('index', { react: html, state })
  // }
  //
  // let state = store.getState() || {}
  // let action = match(req.path, onMatch)
  // store.dispatch(action)

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.status(200).send(renderToString(<RoutingContext {...renderProps} />))
    } else {
      res.status(404).send('Not found')
    }
  })
})

export default app
