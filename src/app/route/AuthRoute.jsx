import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
// import { Header, Footer } from '../components/common';

const AuthRoute = ({ isAuthenticated, role_id, component: Component, ...rest }) => (
  isAuthenticated ?
    <Redirect to={'/'} />
    :
    <Route {...rest} component={(props) => {
      return (
        <div>
          {/* <Header /> */}
          <Component {...props} />
          {/* <Footer /> */}
        </div>
      )
    }} />
)

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
})

export default connect(mapStateToProps)(AuthRoute);