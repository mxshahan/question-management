import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import NotificationDropdown from '../../partials/NotificationDropdown';
import { logoutUserData } from '../../../redux/Auth';
import BaseComponent from '../../../../core/components/BaseComponent';
import { Loading } from '../../../../core/components/common';

export class Header extends React.Component {
    state = {
        isLogout: false
    }

    componentDidMount() {
        this.isEnlarged();
    }

    isEnlarged = () => {
        if (localStorage.getItem('menuEnlarged') === '1') {
            window.$('body').addClass('enlarged');
        } else {
            window.$('body').removeClass('enlarged');
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
                            <span>
                                <img src="/assets/images/logo-sm.png" alt="" width="100" />
                            </span>
                            <i>
                                <img src="/assets/images/logo-fav.png" alt="" height="40" />
                            </i>
                        </a>
                    </div>
                    {/* <!-- LOGO END --> */}

                    {/* Topbar Navigation */}
                    <nav className="navbar-custom">
                        <ul className="navbar-right d-flex list-inline float-right mb-0">
                            <li className="d-none d-sm-block">
                                <div className="dropdown pt-3 d-inline-block">
                                    <a className="btn btn-outline-info  dropdown-toggle" href="/" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Action <i className="mdi mdi-arrow-down"></i>
                                    </a>

                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <Link to="#" className="dropdown-item" href="add_publishers.html">Add publishers</Link>
                                        <Link to="#" className="dropdown-item" href="add-institution.html">Add organisations</Link>
                                        <Link to="#" className="dropdown-item" href="add-funder.html">Add funder</Link>
                                        <Link to="#" className="dropdown-item" href="add-consortia.html">Add consortia</Link>
                                        <Link to="#" className="dropdown-item" href="#">Add consortia member</Link>
                                        <Link to="#" className="dropdown-item" href="#">Add journal</Link>
                                        <Link to="#" className="dropdown-item" href="add-article.html">Add article</Link>
                                        <Link to="#" className="dropdown-item" href="oa-policy.html">Add OA policy</Link>
                                        <Link to="#" className="dropdown-item" href="add-orcid-id.html">Add orcid id</Link>
                                        <Link to="#" className="dropdown-item" href="add-vat.html">Add VAT</Link>
                                        <Link to="#" className="dropdown-item" href="pubdate-updator.html">pub date updater</Link>

                                    </div>
                                </div>
                            </li>

                            {/* Notificatin Dropdown */}
                            <NotificationDropdown />
                            {/* Notificatin Dropdown End */}

                            <li className="dropdown notification-list">
                                <div className="dropdown notification-list nav-pro-img">
                                    <a className="dropdown-toggle nav-link arrow-none waves-effect nav-user" data-toggle="dropdown" href="/" role="button" aria-haspopup="false" aria-expanded="false">
                                        <img src="/assets/images/users/user-4.jpg" alt="user" className="rounded-circle" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                        {/* <!-- item--> */}
                                        <a className="dropdown-item" href="#void"><i className="mdi mdi-account-circle m-r-5"></i> {this.props.user && this.props.user.username}</a>
                                        <a className="dropdown-item" href="#void"><i className="mdi mdi-poll m-r-5"></i> Settings</a>
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
                                <p style={{ marginTop: '20px', fontWeight: 700, fontSize: '16px' }}>OaMetrix</p>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user || ''
})

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUserData())
})

export const PubHeader = connect(mapStateToProps, mapDispatchToProps)(Header)