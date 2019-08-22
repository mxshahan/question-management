import React from 'react';
import { connect } from 'react-redux'
import { HubDashboard } from './hub';
import { AppSettings } from '../../../base';

class Dashboard extends AppSettings {
  render() {
    return <HubDashboard />
  }
}

const mapStateToProps = (state) => ({
  role_id: state.auth.user && state.auth.user.role_id,
  group: state.auth.user && state.auth.group
})

export default connect(mapStateToProps)(Dashboard)