import React from 'react';
import { connect } from 'react-redux';
import UserManagement from './UserManagement';

class UserBlocked extends React.Component {
  render() {
    return (
      <UserManagement
        type="blocked"
        title="Blocked Users"
      />
    )
  }
}

export default connect()(UserBlocked);