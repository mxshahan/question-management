import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';

// // Routes
import AuthRoute from './AuthRoute';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import {
  Auth,
  Public,
  Private
} from './Router';
import { NotFound } from '../components/views';

const createHistory = require("history").createBrowserHistory

export const history = createHistory();

class AppRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          <Switch>

            {Public.map((R, k) => {
              return (
                <PublicRoute
                  key={k}
                  path={R.path}
                  component={R.component}
                  exact={R.exact}
                />
              )
            })}



            {Auth.map((R, k) => {
              return (
                <AuthRoute
                  key={k}
                  path={R.path}
                  component={R.component}
                  exact={R.exact}
                />
              )
            })}


            {Private.map((R, k) => {
              return (
                <PrivateRoute
                  key={k}
                  {...R}
                />
              )
            })}

            <Route component={NotFound} />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => ({
})


export default connect(mapStateToProps)(AppRouter)