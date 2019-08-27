import React from 'react';
import { connect } from 'react-redux';
import { requestSignUpUser, hasUsers } from '../../../redux';
import { Link } from 'react-router-dom'
import { history } from '../../../route/AppRouter';
import { Loading } from '../../../../core/components';

class SignUp extends React.Component {
  state = {
    username: false,
    password: false,
    errStatus: '',
    loading: false
  }

  async componentDidMount() {
    try {
      const result = await this.props.hasUsers();
      if (result.count > 0) {
        history.push('/')
      }
    } catch (e) {
      console.log(e)
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, username, password, cpassword } = this.state;

    if (firstname && lastname && email && username && password && password) {
      if (password !== cpassword) {
        return alert("Password not matched")
      }
      let data = {
        firstname,
        lastname,
        username,
        email,
        password,
        role: 'admin'
      };
      this.setState({ loading: true });
      await this.props.requestSignUpUser(data);

      this.setState({ loading: false });
    } else {
      return alert('field cannot be empty')
    }
  }


  render() {

    return (
      <div className="wrapper-page pt-5">
        {this.state.loading && <Loading />}
        <div className="card">
          <div className="card-body">
            <h3 className="text-center m-0">
              Question Management
            </h3>

            <div className="p-3">
              {!this.props.auth.status && <h4 className="text-muted font-18 mb-5 text-center">Welcome Back !</h4>}
              {/* Login Error Message */}
              {this.props.auth &&
                this.props.auth.status === 401 &&
                <h5 className="text-danger font-18 mb-5 text-center">{this.props.auth.message}</h5>
              }
              {this.props.auth &&
                this.props.auth.status === 200 &&
                <h5 className="text-success font-18 mb-5 text-center">Success</h5>
              }
              {this.props.auth &&
                this.props.auth.status === 500 &&
                <h5 className="text-danger font-18 mb-5 text-center">Network Error! Try again after sometimes</h5>
              }
              {/* Login Error Message */}

              <form className="form-horizontal mt-30" action="" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    placeholder="First Name"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">
                    Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Username"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cpassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    name="cpassword"
                    placeholder="Enter password"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group row m-t-20">
                  <div className="col-12 text-right">
                    <button onClick={this.onSubmit} className="btn btn-primary w-md waves-effect waves-light" type="submit">Create Account</button>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>


        <div className="m-t-40 text-center">
          <p>Already have an account ? <Link to="/signin" className="text-primary">Sign in </Link> </p>
          <p>© 2018</p>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  requestSignUpUser: (data) => dispatch(requestSignUpUser(data)),
  hasUsers: () => dispatch(hasUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);