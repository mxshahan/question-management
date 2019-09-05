import React from "react";
import { connect } from 'react-redux';
import { HubContent } from "../../../../core/components/hub/HubContent";
import { InputBox } from "../../../../core/components";
import { UpdateAdmin, ChangePassword } from "../../../redux";
import { formatImage } from "../users/UserFn";

class Admin extends React.Component {
  state = {
    pass: false,
    tab: 'profile',
    user: {},
    password: {},
    file: null,
    loading: false,
    error: {},
    result: {}
  };

  componentDidMount() {
    this.setState({ user: this.props.user })
  }

  componentDidUpdate(prevProps, prevState) {
    if (Object.keys(this.state.result).length > 0) {
      this.refs.profile.src = formatImage(this.props.user.profileimage);
      setTimeout(() => {
        this.setState({
          result: {}
        })
      }, 3000);
    }
  }

  changeTab = (tab) => {
    this.setState({ tab })
  }

  onChange = (value) => {
    this.setState((prevState) => {
      prevState.user = {
        ...prevState.user,
        ...value
      }
      return prevState;
    })
  }

  onChangePassword = async (value) => {
    await this.setState((prevState) => {
      prevState.password = {
        ...prevState.password,
        ...value
      }
      return prevState;
    })
    if (this.state.password.new !== this.state.password.confirm) {
      this.setState((state) => {
        return state.error.password = "New and old password mismatched"
      })
    } else {
      this.setState((state) => {
        return state.error.password = ""
      })
    }
  }

  onChangeFile = ({ file }) => {
    this.setState({
      file
    })
  }

  onUpdateHandler = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append('file', this.state.file);
    data.append('user', JSON.stringify(this.state.user));
    let result;
    try {
      this.setState({ loading: true })
      result = await this.props.UpdateAdmin(data);
      this.setState({ loading: false, result })
    } catch (e) {
      this.setState({ loading: false, result: e })
    }
  }

  onSubmitPassword = async (e) => {
    e.preventDefault();
    let result;
    if (this.state.password.new === this.state.password.confirm) {
      try {
        this.setState({ loading: true })
        result = await this.props.ChangePassword(this.state.password);
        this.setState({ loading: false, result })
      } catch (e) {
        this.setState({ loading: false, result: e })
      }
    }
  }

  render() {
    const { user } = this.state;
    console.log(this.state.result)
    const profile = (
      <div>
        <div className="header">
          <h4>Profile</h4>
        </div>
        <div className="form-group row">
          <InputBox
            label="First Name"
            onChange={this.onChange}
            field="firstname"
            inputClass="name"
            defaultValue={user.firstname}
          />
          <InputBox
            label="Last Name"
            onChange={this.onChange}
            field="lastname"
            inputClass="name"
            defaultValue={user.lastname}
          />
        </div>
        <div className="form-group row">
          <InputBox
            label="Email"
            onChange={this.onChange}
            field="email"
            inputClass="email"
            defaultValue={user.email}
          />
          <InputBox
            label="username"
            onChange={this.onChange}
            field="username"
            inputClass="username"
            defaultValue={user.username}
          />
        </div>
        <div className="form-group row">
          <InputBox
            label="Phone"
            onChange={this.onChange}
            field="phone"
            inputClass="email"
            defaultValue={user.phone}
          />
          <InputBox
            label="Profile Picture"
            field="file"
            InputType="file"
            inputClass="picture"
            onChange={this.onChangeFile}
          />
        </div>

        {this.state.result.status === 200 &&
          <div className="alert alert-success">
            Successfully profile updated
          </div>
        }

        {this.state.result.status > 400 &&
          <div className="alert alert-danger">
            {this.state.result.statusText}
          </div>
        }

        <div className="text-right">
          <button
            className="btn btn-primary btn-md waves-effect waves-light"
            onClick={this.onUpdateHandler}
          >
            {this.state.loading ? "Processing..." : "Update"}
          </button>
        </div>

      </div>
    );
    const password = <div>
      <div className="form-group row">
        <InputBox
          label="Current Password"
          onChange={this.onChangePassword}
          field="current"
          className="col-9"
          labelClass="col-3"
          InputType="password"
        />
      </div>
      <div className="form-group row">
        <InputBox
          label="New Password"
          onChange={this.onChangePassword}
          field="new"
          className="col-9"
          labelClass="col-3"
          errMsg={this.state.error.password}
          InputType="password"
        />
      </div>
      <div className="form-group row">
        <InputBox
          label="Confirm Password"
          onChange={this.onChangePassword}
          field="confirm"
          className="col-9"
          labelClass="col-3"
          errMsg={this.state.error.password}
          InputType="password"
        />
      </div>
      {this.state.result.data &&
        <React.Fragment>
          {this.state.result.status === 200 && (
            <div className="alert alert-success">
              {this.state.result.data.message}
            </div>
          )}
          {this.state.result.status === 203 && (
            <div className="alert alert-danger">
              {this.state.result.data.message}
            </div>
          )}
        </React.Fragment>
      }
      <div className="text-right">
        <button
          className="btn btn-primary btn-md waves-effect waves-light"
          onClick={this.onSubmitPassword}
        >
          {this.state.loading ? "Processing..." : "Change Password"}
        </button>
      </div>
    </div>;
    return (
      <HubContent>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="w-100 mb-2">
                <img
                  src={formatImage(user.profileimage)}
                  alt="Profile  "
                  className="img-fluid img-thumbnail"
                  ref="profile"
                />
              </div>
              <button className={`btn mb-1 w-100 ${this.state.tab === 'profile' ? " btn-primary active" : ""}`} onClick={() => this.changeTab('profile')}>
                Profile
              </button>
              <button className={`btn w-100  ${this.state.tab === 'password' ? "  btn-primary active" : ""}`} onClick={() => this.changeTab('password')}>
                Change Password
              </button>
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="card-body">
                  {this.state.tab === 'password' ? password : profile}
                </div>
              </div>
            </div>
          </div>
        </div>
      </HubContent>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  UpdateAdmin: (payload) => dispatch(UpdateAdmin(payload)),
  ChangePassword: (payload) => dispatch(ChangePassword(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
