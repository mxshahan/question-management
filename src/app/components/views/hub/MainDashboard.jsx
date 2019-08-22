import React from 'react';
import { HubContent } from '../../../../core/components';
import { Button } from '../../../../core/components/common';
import { AppSettings } from '../../../../base';

class DB extends AppSettings {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <HubContent title="User Dashboard">
        <h1>User Dashboard.</h1>
        <Button
          className="primary"
          text='Request APC Fund'
        />
        <Button
          className="warning"
          type="button"
          text='Request APC Fund'
        />
        <Button
          className="info"
          type="button"
          text='APC Requested'
        />
        <Button
          className="danger"
          type="button"
          text='Declined'
        />
        <Button
          className="success"
          type="button"
          text='Approved'
        />
        <Button
          className="secondary"
          type="button"
          text='Secondary Button'
        />
      </HubContent>
    )
  }
}



export const UserDashboard = (DB)