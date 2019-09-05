import React from 'react';
import { connect } from 'react-redux'
import { DashContext } from '../../../../core/context';
import { Loading } from '../../../../core/components/common';
import { Offline } from "react-detect-offline";
import { logoutUserData } from '../../../redux';
import { Link } from 'react-router-dom';

export class Header extends DashContext {
  state = {
    isLogout: false,
    hasConnectionError: true
  }

  componentDidMount() {
    this.isEnlarged();
  }

  isEnlarged = () => {
    if (this.props.menuEnlarged) {
      window.$('#root').addClass('enlarged');
    } else {
      window.$('#root').removeClass('enlarged');
    }
  }


  logoutUser = async (e) => {
    this.setState({
      isLogout: true
    })
    await this.props.logoutUser();

  }

  render() {
    return (
      <div>
        {this.state.isLogout && <Loading />}
        <div className="topbar">
          {/* <!-- LOGO --> */}
          <div className="topbar-left">
            <a href="/" className="logo">
              <span className="text-primary">
                Question
              </span>
              <i>
                QM
              </i>
            </a>
          </div>
          {/* <!-- LOGO END --> */}

          {/* Topbar Navigation */}
          <nav className="navbar-custom">
            <ul className="navbar-right d-flex list-inline float-right mb-0">
              <li className="dropdown notification-list">
                <div className="dropdown notification-list nav-pro-img">
                  <a className="dropdown-toggle nav-link arrow-none waves-effect nav-user" data-toggle="dropdown" href="/" role="button" aria-haspopup="false" aria-expanded="false">
                    <img src="/assets/images/users/user-4.jpg" alt="user" className="rounded-circle" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                    {/* <!-- item--> */}
                    <Link to="/profile" className="dropdown-item" >
                      <i className="mdi mdi-account-circle m-r-5"></i> {this.props.user && this.props.user.username}
                    </Link>

                    <div className="dropdown-divider"></div>
                    <span className="dropdown-item text-danger cursor-pointer" onClick={this.logoutUser}><i className="mdi mdi-power text-danger"></i>Logout</span>
                  </div>
                </div>
              </li>
            </ul>

            <ul className="list-inline menu-left mb-0">
              <li className="float-left">
                <button className="button-menu-mobile open-left waves-effect">
                  <i className="mdi mdi-menu"></i>
                </button>
              </li>
              <li className="float-left">
                <p style={{ marginTop: '20px', fontWeight: 700, fontSize: '16px' }}>
                  {this.props.title || 'No Title'}
                </p>
              </li>
            </ul>
          </nav>
          <Offline>
            <div className="text-white bg-danger" style={{
              position: 'fixed',
              bottom: this.state.hasConnectionError ? 0 : -100,
              left: 0,
              right: 0,
              display: 'block',
              padding: 10,
              textAlign: 'center',
              fontSize: 20,
              transition: '0.5s ease 0s'
            }}>No Internet Connection. Please check your internet connection.
              <span className="float-right mr-2" style={{ cursor: 'pointer' }} onClick={() => {
                this.setState({ hasConnectionError: false })
              }}>
                <i className="mdi mdi-close"></i>
              </span>
            </div>
          </Offline>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user || {},
  menuEnlarged: state.settings.menuEnlarged
})

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUserData())
})

export const CHeader = connect(mapStateToProps, mapDispatchToProps)(Header)