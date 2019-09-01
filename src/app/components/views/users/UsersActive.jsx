import React from 'react';
import { connect } from 'react-redux';
import UserManagement from './UserManagement';

class UserActive extends React.Component {
  render() {
    return (
      <UserManagement
        type="active"
        title="Active Users"
      />
    )
  }
}

export default connect()(UserActive);