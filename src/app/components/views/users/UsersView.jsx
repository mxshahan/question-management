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
import { UploadImage, GetUser } from '../../../redux';
import { formatImage } from './UserFn';
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css';

class UsersView extends React.Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
  }
  state = {
    show: false,
    user: null,
    file: null,
    loading: false
  }

  onDrop = (files) => {
    this.setState({ file: files[0], imageUrl: URL.createObjectURL(files[0]) })
  }

  async componentDidMount() {
    let user;
    try {
      this.setState({ loading: true })
      user = await this.props.GetUser(this.props.match.params.id);
      this.setState({ loading: false, user })
    } catch (e) {
      this.setState({ loading: false })
    }
  }

  handleClose = () => {
    this.setState({ show: false, file: null, imageUrl: null });
  }
  handleShow = () => { this.setState({ show: true }); }

  onConfirmCrop = (blob) => {
    console.log(blob)
  }

  onSubmitHandler = async () => {
    const cropper = this.refs.cropper;
    await cropper.getCroppedCanvas().toBlob(async (blob) => {
      if (blob) {
        this.setState({ loading: true })
        let data = new FormData();
        data.append('file', blob, blob.name || "No name");
        try {
          const response = await this.props.UploadImage(data, this.state.user._id);
          console.log(response.result.user)
          const user = this.props.history.location.state;
          this.setState((prevState) => {
            prevState.loading = false;
            Object.assign(user, response.result.user);
            Object.assign(prevState.user, response.result.user);
            prevState.show = false
            prevState.file = null
            prevState.imageUrl = null
            return prevState;
          })
          // window.location.reload();
        } catch (e) {
          this.setState({ loading: false, file: { name: 'Error Occured', size: null } })
        }
      }
    })
  }

  showModal = () => {
    return (
      <Modal show={this.state.show} onHide={this.handleClose} centered >
        <div className="col-lg-12">
          <div className="card m-b-30">
            <div className="card-body">
              <div className="heading-upload">
                <h4>Upload Picture</h4>
              </div>
              <div >
                {this.state.loading ? <Loading type="flat" /> :
                  this.state.imageUrl ?
                    <div className="w-100">
                      <Cropper
                        src={this.state.imageUrl}
                        ref='cropper'
                        aspectRatio={1 / 1}
                        guides={false}
                        onCrop={this.onConfirmCrop}
                      />
                    </div>
                    :
                    <Dropzone onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <section className="text-center">
                          <div {...getRootProps()} style={styles.upload}>
                            <input {...getInputProps()} />
                            {!this.state.file && <i style={{ fontSize: 40 }} className="mdi mdi-upload"></i>}
                            <div>{this.state.file ? (
                              <React.Fragment>
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

    if (this.state.loading) {
      return <Loading type="flat" />
    }

    if (!user) {
      return <NotFound />
    }

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
      <HubContent id="user-view">
        {this.showModal()}
        <div className="row">
          <div className="col-md-4">
            <div className="card d-flex align-items-center ">
              {owl_items.length ?
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
                : <span className="p-2">No profile picture uploaded...</span>}
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
  UploadImage: (data, id) => dispatch(UploadImage(data, id)),
  GetUser: (id) => dispatch(GetUser(id))
})

export default connect(null, mapDispatchToProps)(UsersView);
