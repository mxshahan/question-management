import React from "react";
import { HubContent } from "../../../../core/components/hub/HubContent";
import { InputBox } from "../../../../core/components";

class Admin extends React.Component {
  state = {
    pass: false
  };

  adminProfile(){
    this.setState(()=>({pass: false}))
  }
    adminPassword(){
      this.setState(()=>({pass: true}))
    }

  render() {
    const profile = (
      <div>
        <div className="header">
          <h4>Profile</h4>
        </div>
        <form action="">
        <div className="name-form mb-35">
          <InputBox
            label="First Name"
            onChange={this.onChange}
            field="first_name"
            inputClass="name"
          />
          <InputBox
            label="Last Name"
            onChange={this.onChange}
            field="last_name"
            inputClass="name"
          />
        </div>
        <div className="email-form mb-35">
          <InputBox
            label="Email"
            onChange={this.onChange}
            field="email"
            inputClass="email"
          />
        </div>
        <div className="email-form mb-35">
          <InputBox
            label="Phone"
            onChange={this.onChange}
            field="number"
            inputClass="email"
          />
        </div>
        <div className="picture-upload mb-35">
          <InputBox
          label="Profile Picture"
          field="profile_picture"
          InputType="file"
          inputClass="picture"
          />
        
        </div>
        <div className="submit">
        <button
            className="btn btn-primary btn-md waves-effect waves-light"
            onClick={this.onSubmitHandler}
          >Update
          </button>
        </div>
        </form>
       
      </div>
    );
    const password = <div>
      <div className="email-form mb-35">
          <InputBox
            label="Email"
            onChange={this.onChange}
            field="email"
            inputClass="email"
          />
        </div>
        <div className="email-form mb-35">
          <InputBox
            label="Phone"
            onChange={this.onChange}
            field="number"
            inputClass="email"
          />
        </div>
    </div>;
    return (
      <HubContent>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="profile" onClick={this.adminProfile}>
                <h4>Profile</h4>
              </div>
              <div className="profile" onClick={this.adminPassword}>
                <h4>Change Password</h4>
              </div>
            </div>
            <div className="col-md-9">
              <div className="pro-pass">
                {this.state.pass ? password : profile}
              </div>
            </div>
          </div>
        </div>
      </HubContent>
    );
  }
}

export default Admin;
