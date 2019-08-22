import React from 'react';
import { connect } from 'react-redux';
import { GoogleLoginHandler } from '../../../redux';

class SignIn extends React.Component {
  state = {
    error: {}
  }
  onGoogleLogin = (e) => {
    e.preventDefault();
    try {
      this.props.GoogleLoginHandler();
    } catch (e) {
      this.setState({ error: e })
    }
  }

  render() {
    return (
      <div className="wrapper-page pt-5">
        <div className="card">
          <div className="card-body">
            <div className="p-3 ">
              {/* <h5 className="text-danger font-18 mb-5 text-center">{this.state.error}</h5> */}
              <h4 className="text-muted font-18 text-center">Welcome Back ! Paperless Time Study</h4>
            </div>
            <div className="p-3 pb-0">
              <button
                onClick={this.onGoogleLogin}
                className="btn btn-danger w-md waves-effect waves-light w-100"
              >
                <i className="mdi mdi-google mr-1"></i>
                Log In with google
              </button>
            </div>
          </div>
        </div>

        <div className="m-t-40 text-center">
          <p>Paperless Time Study © 2018</p>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  GoogleLoginHandler: (data) => dispatch(GoogleLoginHandler(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);