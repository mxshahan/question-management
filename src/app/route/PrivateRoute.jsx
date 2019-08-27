import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { AuthHeader, AuthFooter } from '../components/common';

class PrivateRoute extends React.Component {
  render() {
    const { isAuthenticated, role_id, component: Component, ...rest } = this.props;
    return (
      isAuthenticated ? (
        <Route {...rest} component={(props) => (
          <div id="wrapper" className="HubRoute">
            <AuthHeader />
            <Component {...props} />
            <AuthFooter />
          </div>
        )} />
      ) : <Redirect to="/signin" />
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
})

export default connect(mapStateToProps)(PrivateRoute);