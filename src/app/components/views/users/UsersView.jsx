import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OwlCarousel from 'react-owl-carousel';
import { Modal } from 'react-bootstrap';
import Dropzone from "react-dropzone";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import HubContent, { Loading } from '../../../../core/components';


class UsersView extends React.Component {
  state={show: false}
  handleClose=()=>{this.setState({show: false});}
  handleShow=()=>{this.setState({show: true});}
  render() {
    const user = this.props.history.location.state;
    console.log(user)
    return (
      <HubContent>
        <div className="row">
          <div className="col-md-4">
            <OwlCarousel
              items={1}
              className="owl-theme"
              loop
              margin={10}
              nav
            >
              {user.images.map((item, index)=>(
                <div class="item">
                  <img src={user.images[user.images.length - (index+1)]} alt="" className="img-fluid user-img"/>
                </div>)
              )}
            </OwlCarousel>
            <div className="btn-box">
              <button
                className="btn btn-primary btn-md waves-effect waves-light float-right"
              >Change Picture</button>
              <button
                className="btn btn-primary btn-md waves-effect waves-light float-right"
                onClick={this.handleShow}
              >Upload Picture</button>
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <div className="col-lg-12">
                  <div className="card m-b-30">
                    <div className="card-body">
                      <div className="heading-upload">
                        <h4>Upload Picture</h4>
                      </div>
                      <div >
                        {this.state.loading ? <Loading type="flat" /> :
                          <Dropzone onDrop={this.onDrop}>
                            {({ getRootProps, getInputProps }) => (
                              <section className="text-center">
                                <div {...getRootProps()} style={styles.upload}>
                                  <input {...getInputProps()} />
                                  <i style={{ fontSize: 40 }} className="mdi mdi-upload"></i>
                                  <p>{this.state.file ? (
                                    <React.Fragment>
                                      <p>{this.state.file.name}</p>
                                      <p>{(this.state.file.size / 1024).toFixed(2)} KB</p>
                                    </React.Fragment>
                                  ) : "Drag 'n' drop some files here, or click to select files"}</p>
                                </div>
                              </section>
                            )}
                          </Dropzone>
                        }
                      </div>
                      <div className=" mt-4 text-right">
                        <button
                          className="btn btn-primary btn-md waves-effect waves-light"
                          onClick={this.onSubmitHandler}
                        >Upload File</button>
                      </div>
                      {this.state.status && <div className="col-md-12 alert alert-success mt-4">Successfully record updated</div>}
                      {this.state.status === false && <div className="col-md-12 alert alert-warning mt-4">Error Found...</div>}
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
          <div className="col-md-8">
            <div className="profile-info-box">
              <Link
                className="btn btn-primary btn-md waves-effect waves-light float-right"
                to="/"
              >Edit Profile</Link>
              <p class="text-capitalize"><strong className="mr-2">Name:</strong> {user.name}</p>
              <p class="text-capitalize"><strong className="mr-2">Age:</strong> {user.age}</p>
              <p class="text-capitalize"><strong className="mr-2">Date Birth:</strong> {user.dob}</p>
              <p class="text-capitalize"><strong className="mr-2">Gender:</strong> {user.gender}</p>
              <p class="text-capitalize"><strong className="mr-2">Country:</strong> {user.country}</p>
              <p class="text-capitalize"><strong className="mr-2">Status:</strong> {user.status}</p>
              <p class="text-capitalize"><strong className="mr-2">Profile:</strong> {user.profile}</p>
              <p class="text-capitalize"><strong className="mr-2">Seeking:</strong> {user.seeking}</p>
              <p class="text-capitalize"><strong className="mr-2">Latitude:</strong> {user.latitude}</p>
              <p class="text-capitalize"><strong className="mr-2">Longitude:</strong> {user.longitude}</p>
              <p class="text-capitalize"><strong className="mr-2">Created At:</strong> {user.createdAt}</p>
            </div>
          </div>
        </div>
      </HubContent>
    )
  }
}

const styles = {
  upload: {
    border: '1px dotted #ddd',
    padding: '20px 20px'
  }
}

export default connect()(UsersView);
