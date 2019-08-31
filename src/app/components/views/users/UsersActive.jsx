import React from 'react';
import { connect } from 'react-redux';
import HubContent from '../../../../core/components';
import UsersTable from './UsersTable';

class UserActive extends React.Component {
  render() {
    return (
      <HubContent>
        <UsersTable />
      </HubContent>
    )
  }
}

export default connect()(UserActive);