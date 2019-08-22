import React from 'react';
import { Link } from 'react-router-dom';

class ThankYou extends React.Component {
  state = {
    email: "something@example.com"
  }

  componentDidMount() {
    this.props.location.state && this.setState({
      email: this.props.location.state.user && this.props.location.state.user.email
    })
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-item-center mt-5" >
        <div className="card text-center alert p-5">
          <div className="">Thank you. You are Successfully registered. Please check your email and active your account or <Link to="/signin" className="text-primary text-underline"><u>Sign In</u></Link></div>
          <h4>A verification link send to your email <span className="text-success">{this.state.email}</span></h4>
        </div>
      </div>
    )
  }
}



export default ThankYou