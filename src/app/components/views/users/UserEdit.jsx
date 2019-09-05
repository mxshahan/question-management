import React from 'react';
import { connect } from 'react-redux'
import HubContent, { InputBox, SelectBox, OaDatePicker, Loading } from '../../../../core/components';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import NotFound from '../NotFound';
import { UpdateUser, GetUser } from '../../../redux';

class UserEdit extends React.Component {
  state = {
    user: null,
    result: null
  }

  async componentDidMount() {
    let user;
    try {
      this.setState({ loading: true })
      user = await this.props.GetUser(this.props.match.params.id);
      delete user.images;
      this.setState({ loading: false, user })
    } catch (e) {
      this.setState({ loading: false })
    }
  }

  onSubmitHandler = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let result;
    try {
      result = await this.props.UpdateUser(this.state.user);
    } catch (e) {
      result = e;
      console.log(e)
    } finally {
      this.setState({ loading: false, result });
    }
  }

  onChange = (value) => this.setState((prevState) => { Object.assign(prevState.user, value) })

  render() {
    const { user } = this.state;

    const gender = [
      { name: "Male", id: "male" },
      { name: "Female", id: "female" }
    ]

    if (this.state.loading) {
      return <Loading type="flat" />
    }

    if (!user) {
      return <NotFound />
    }
    return (
      <HubContent title="Edit Profile">
        <Card>
          <Card.Body>
            <div className="form-group row">
              <InputBox
                label="Name"
                placeholder="Enter Name"
                onChange={this.onChange}
                field='name'
                defaultValue={user.name}
                value={user.name}
              />
              <InputBox
                label="Age"
                placeholder="Enter Age"
                onChange={this.onChange}
                field='age'
                defaultValue={user.age}
                value={user.age}
              />
            </div>

            <div className="form-group row">
              <OaDatePicker
                label="Date of Birth"
                placeholder="Birth Date"
                onChange={this.onChange}
                field='dob'
                defaultValue={moment(user.dob)}
                value={moment(user.dob)}
              />
              <SelectBox
                label="Category"
                onChange={this.onChange}
                field='category'
                data={gender}
                defaultValue={user.gender}
                value={user.gender}
              />
            </div>
            <div className="form-group row">
              <InputBox
                label="Country"
                placeholder="Country"
                onChange={this.onChange}
                field='country'
                defaultValue={user.country}
                value={user.country}
              />
              <InputBox
                label="Seeking"
                placeholder="Seeking"
                onChange={this.onChange}
                field='seeking'
                defaultValue={user.seeking}
                value={user.seeking}
              />
            </div>
            <div className="form-group row">
              <InputBox
                label="Latitude"
                placeholder="Latitude"
                onChange={this.onChange}
                field='latitude'
                defaultValue={user.latitude}
                value={user.latitude}
              />
              <InputBox
                label="Longitude"
                placeholder="Longitude"
                onChange={this.onChange}
                field='longitude'
                defaultValue={user.longitude}
                value={user.longitude}
              />
            </div>


            <div className="form-group row">
              <InputBox
                label="Email"
                placeholder="Email"
                onChange={this.onChange}
                field='email'
                defaultValue={user.email}
                value={user.email}
              />
            </div>

            <div className="w-100 mb-3">
              {this.state.result && <React.Fragment>
                {this.state.result.success && <div className="alert alert-success">Question Updated succesfully</div>}
                {!this.state.result.success && typeof this.state.result.error === 'object' ?
                  Object.values(this.state.result.error.errors).map((err, key) => {
                    return <div className="alert alert-warning">{err.message}</div>
                  })
                  : this.state.result.status === 501 && <div className="alert alert-warning">{this.state.result.errMessage}</div>
                }
              </React.Fragment>
              }
            </div>
            <div className=" mt-4 text-right">
              <button
                className="btn btn-primary btn-md waves-effect waves-light"
                onClick={this.onSubmitHandler}
              >Update Profile</button>
            </div>
          </Card.Body>
        </Card>
      </HubContent>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  UpdateUser: (payload) => dispatch(UpdateUser(payload)),
  GetUser: (id) => dispatch(GetUser(id))
})

export default connect(null, mapDispatchToProps)(UserEdit);