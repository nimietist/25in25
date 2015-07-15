import _ from 'lodash';
import React from 'react';
import Router from 'react-router';
import Location from 'react-router/lib/Location';
import express from 'express';
import routes from '../assets/js/routes';

let app = express.Router();

// React Rendering

app.use((req, res, next) => {
  var location = new Location(req.path, req.query);
  Router.run(routes, location, (error, initialState, transition) => {
    // TODO: data fetching per route
    var html = React.renderToString(<Router {...initialState}/>);
    return res.render('index', { react: html });
  });
});

// TODO: API routes (move up?)

export default app;
