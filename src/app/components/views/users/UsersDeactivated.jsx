import React from 'react';
import { connect } from 'react-redux';
import UserManagement from './UserManagement';

class UserDeactivated extends React.Component {
  render() {
    return (
      <UserManagement
        type="deactivated"
        title="Deactivated Users"
      />
    )
  }
}

export default connect()(UserDeactivated);