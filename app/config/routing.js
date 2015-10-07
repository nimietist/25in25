import React from 'react'
import { Router } from 'react-router'
import Location from 'react-router/lib/Location'
import express from 'express'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from '../assets/js/reducers'
import routes from '../assets/js/routes'
import App from '../assets/js/app'
import apiRoutes from '../api'

let app = express.Router()

// API routing
app.use('api', apiRoutes)

// Default React Rendering
app.use((req, res, next) => {
  var location = new Location(req.path, req.query)
  Router.run(routes, location, (error, initialRouteData, transition) => {
    if (error) { res.send(404) }

    const store = createStore(reducers)
    const html = React.renderToString(
      <Provider store={store}>
        {() => <App {...initialRouteData}/>}
      </Provider>
    )
    const initialState = store.getState() || {}

    return res.render('index', { react: html, initialState })
  })
})

export default app
