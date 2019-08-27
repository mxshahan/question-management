import React from 'react';
import { connect } from 'react-redux';
import { fetchLoginUser } from '../../../redux';
import { Loading } from '../../../../core/components';

class SignIn extends React.Component {
  state = {
    username: false,
    password: false,
  }
  onSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    if (username && password) {
      this.setState({ loading: true });
      let data = { username, password }
      await this.props.fetchLoginUser(data);
      this.setState({ loading: false });
    } else {
      alert('Username or Password cannot be empty')
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
                  <label htmlFor="username">
                    Username or Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username or Email"
                    onChange={(e) => this.setState({ username: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="userpassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="userpassword"
                    placeholder="Enter password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                  />
                </div>
                <div className="form-group row m-t-20">
                  <div className="col-6">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="customControlInline" />
                      <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                    </div>
                  </div>
                  <div className="col-6 text-right">
                    <button onClick={this.onSubmit} className="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
                  </div>
                </div>
                <div className="form-group m-t-10 mb-0 row">
                  <div className="col-12 m-t-20">
                    <a href="pw-recover.html" className="text-muted"><i className="mdi mdi-lock"></i> Forgot your password?</a>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>

        <div className="m-t-40 text-center">
          {/* <p>Don't have an account ? <Link to="/signup" className="text-primary"> Signup Now </Link> </p> */}
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
  fetchLoginUser: (data) => dispatch(fetchLoginUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);