import React from 'react';
import { connect } from 'react-redux'
import { CHeader } from './Headers';
import { LeftSidebar } from './LeftSidebar';
import { HubSidebar } from '../../data';
import MenuItem from '../partials/dashboard/MenuItem';

export class Header extends React.Component {
  logoutUser = (e) => {
    this.props.logoutUser();
  }

  render() {

    let title = '',
      navigation = '';

    // if (group === HUB) {
    //   // Hub
    //   title = 'OaMetrix - Hub'
    //   navigation = HubSidebar.map((context, i) => {
    //     return (
    //       !context.isHide && (
    //         <MenuItem
    //           context={context}
    //           key={i}
    //           baseUrl={context.to || ''}
    //         />
    //       )
    //     )
    //   })
    // } else if (group === PUBLISHER) {
    //   // Publisher
    //   title = 'OaMetrix - Publisher'
    //   navigation = PubSidebar.map((context, i) => {
    //     return (
    //       !context.isHide && (
    //         <MenuItem
    //           context={context}
    //           key={i}
    //           baseUrl={context.to || ''}
    //         />
    //       )
    //     )
    //   })
    // } else if (group === INSTITUTION) {
    //   // University
    //   title = 'OaMetrix - University'
    //   navigation = UnivSidebar.map((context, i) => {
    //     return (
    //       !context.isHide && (
    //         <MenuItem
    //           context={context}
    //           key={i}
    //           baseUrl={context.to || ''}
    //         />
    //       )
    //     )
    //   })
    // } else if (group === CONSORTIUM) {
    //   // University
    //   title = 'OaMetrix - University'
    //   navigation = ConsortiaSidebar.map((context, i) => {
    //     return (
    //       !context.isHide && (
    //         <MenuItem
    //           context={context}
    //           key={i}
    //           baseUrl={context.to || ''}
    //         />
    //       )
    //     )
    //   })
    // } else {
    //   // Users
    //   title = 'OaMetrix - User'
    //   navigation = UserSidebar.map((context, i) => {
    //     return (
    //       !context.isHide && (
    //         <MenuItem
    //           context={context}
    //           key={i}
    //           baseUrl={context.to || ''}
    //         />
    //       )
    //     )
    //   })
    // }


    title = 'Question Management'
    navigation = HubSidebar.map((context, i) => {
      return (
        !context.isHide && (
          <MenuItem
            context={context}
            key={i}
            baseUrl={context.to || ''}
          />
        )
      )
    })


    return (
      <div>
        <CHeader logoutUser={this.logoutUser} title={title} />
        <LeftSidebar navigation={navigation} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  // group: state.auth.user && state.auth.group,
  // token: state.auth.token,
})

const mapDispatchToProps = (dispatch) => ({
  // logoutUser: () => dispatch(logoutUserData())
})

export const AuthHeader = connect(mapStateToProps, mapDispatchToProps)(Header)