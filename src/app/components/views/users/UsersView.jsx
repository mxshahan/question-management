import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OwlCarousel from 'react-owl-carousel';
import { Modal, Card } from 'react-bootstrap';
import Dropzone from "react-dropzone";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import HubContent, { Loading } from '../../../../core/components';
import NotFound from '../NotFound';
import moment from 'moment';
import { UploadImage } from '../../../redux';
import { formatImage } from './UserFn';

class UsersView extends React.Component {
  state = {
    show: false,
    user: null,
    file: null,
    loading: false
  }

  onDrop = (files) => {
    this.setState({ file: files[0], imageUrl: URL.createObjectURL(files[0]) })
  }

  componentDidMount() {
    const user = this.props.history.location.state;
    if (user) {
      this.setState({ user })
    }
  }

  handleClose = () => {
    this.setState({ show: false, file: null });
  }
  handleShow = () => { this.setState({ show: true }); }

  onSubmitHandler = async () => {
    if (this.state.file) {
      this.setState({ loading: true })
      let data = new FormData();
      data.append('file', this.state.file);

      try {
        const response = await this.props.UploadImage(data, this.state.user._id);
        console.log(response.result.user)
        const user = this.props.history.location.state;
        this.setState((prevState) => {
          prevState.loading = false;
          Object.assign(user, response.result.user);
          Object.assign(prevState.user, response.result.user);
          prevState.show = false
          return prevState;
        })
        window.location.reload();
      } catch (e) {
        this.setState({ loading: false, file: { name: 'Error Occured', size: null } })
      }
    }
  }

  showModal = () => {
    return (
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
                          {!this.state.file && <i style={{ fontSize: 40 }} className="mdi mdi-upload"></i>}
                          <div>{this.state.file ? (
                            <React.Fragment>
                              <div className="w-100">
                                {this.state.imageUrl && <img className="img-fluid" src={this.state.imageUrl} alt="Profile " />}
                              </div>
                              <div className="w-100 mt-2">
                                <p>{this.state.file.name}</p>
                                <br />
                                <p>{(this.state.file.size / 1024).toFixed(2)} KB</p>
                              </div>
                            </React.Fragment>
                          ) : "Drag 'n' drop some files here, or click to select files"}</div>
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
    )
  }

  render() {
    const user = this.state.user;
    if (!user) {
      return <NotFound />
    }
    console.log(user.images.length)
    let owl_items = [];

    user.images.map((item, index) => (
      owl_items.push(
        <div className="item" key={index}>
          <img
            src={formatImage(item)}
            alt=""
            className="img-fluid user-img"
          />
        </div>
      )
    ))

    return (
      <HubContent>
        {this.showModal()}
        <div className="row">
          <div className="col-md-4">
            <div className="card d-flex align-items-center " style={{ height: 200, overflow: 'hidden' }}>
              {user.images.length &&
                <OwlCarousel
                  items={1}
                  className="owl-theme"
                  loop
                  margin={10}
                  nav={true}
                  navText={["next", "prev"]}
                  navContainerClass="nav-profile-picture"
                  center={true}
                >
                  {owl_items.reverse()}
                </OwlCarousel>
              }
            </div>
          </div>
          <div className="col-md-8">
            <Card>
              <div className="profile-info-box">
                <button
                  className="btn btn-info btn-md waves-effect waves-light float-right ml-2"
                  onClick={this.handleShow}
                >
                  Upload Picture
                </button>
                <Link
                  className="btn btn-primary btn-md waves-effect waves-light float-right"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(user);
                    this.props.history.push(`/users/user-edit/${user._id}`, user)
                  }}
                >Edit Profile</Link>
                <p className="text-capitalize"><strong className="mr-2">Name:</strong> {user.name}</p>
                <p className="text-capitalize"><strong className="mr-2">Age:</strong> {user.age}</p>
                <p className="text-capitalize"><strong className="mr-2">Date Birth:</strong> {moment(user.dob).format('ll')}</p>
                <p className="text-capitalize"><strong className="mr-2">Gender:</strong> {user.gender}</p>
                <p className="text-capitalize"><strong className="mr-2">Country:</strong> {user.country}</p>
                <p className="text-capitalize"><strong className="mr-2">Status:</strong> {user.status}</p>
                <p className="text-capitalize"><strong className="mr-2">Profile:</strong> {user.profile}</p>
                <p className="text-capitalize"><strong className="mr-2">Seeking:</strong> {user.seeking}</p>
                <p className="text-capitalize"><strong className="mr-2">Latitude:</strong> {user.latitude}</p>
                <p className="text-capitalize"><strong className="mr-2">Longitude:</strong> {user.longitude}</p>
                <p className="text-capitalize"><strong className="mr-2">Created At:</strong> {user.createdAt}</p>
              </div>
            </Card>
          </div>
        </div>
      </HubContent >
    )
  }
}

const styles = {
  upload: {
    border: '1px dotted #ddd',
    padding: '20px 20px'
  }
}

const mapDispatchToProps = (dispatch) => ({
  UploadImage: (data, id) => dispatch(UploadImage(data, id))
})

export default connect(null, mapDispatchToProps)(UsersView);
