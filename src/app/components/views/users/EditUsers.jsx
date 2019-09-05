import React from 'react';
import { connect } from 'react-redux'
import HubContent, { InputBox, SelectBox } from '../../../../core/components';

class EditUsers extends React.Component {

  onSubmitHandler = () => {}
  onChange = ()=>{}

  render() {
    const user = this.props.history.location.state;
    console.log(user)
    const gender =[
      { name: "Male", id: "male" },
      { name: "Female", id: "female" }
    ]
    return (
      <HubContent title="Edit Profile">
        <div className="form-group row">
          <InputBox
            label="Name"
            placeholder="Enter Name"
            onChange={this.onChange}
            field='name'
            defaultValue={user.name}
          />
          <InputBox
            label="Age"
            placeholder="Enter Age"
            onChange={this.onChange}
            field='age'
            defaultValue={user.age}
          />
        </div>

        <div className="form-group row">
          <InputBox
            label="Date of Birth"
            placeholder="Birth Date"
            onChange={this.onChange}
            field='dob'
            defaultValue={user.dob}
          />
          <SelectBox
            label="Category"
            onChange={this.onChange}
            field='category'
            data={gender}
            defaultValue={user.gender}
          />
        </div>
        <div className="form-group row">
          <InputBox
            label="Country"
            placeholder="Country"
            onChange={this.onChange}
            field='country'
            defaultValue={user.country}
          />
          <InputBox
            label="Seeking"
            placeholder="Seeking"
            onChange={this.onChange}
            field='seeking'
            defaultValue={user.seeking}
          />
        </div>
        <div className="form-group row">
          <InputBox
            label="Latitude"
            placeholder="Latitude"
            onChange={this.onChange}
            field='latitude'
            defaultValue={user.latitude}
          />
          <InputBox
            label="Longitude"
            placeholder="Longitude"
            onChange={this.onChange}
            field='longitude'
            defaultValue={user.longitude}
          />
        </div>

        <div className=" mt-4 ">
          <button
            className="btn btn-primary btn-md waves-effect waves-light"
            onClick={this.onSubmitHandler}
          >Update Profile</button>
        </div>
      </HubContent>
    );
  }
}



export default connect()(EditUsers);