import React from 'react';
import HubContent, { Loading } from '../../../../core/components';
import Dropzone from "react-dropzone";
import { connect } from 'react-redux';
import { uploadFile } from '../../../redux';

class BulkUpload extends React.Component {
  state = {
    file: null,
    loading: false
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log('sss')
    console.log(e.target.files[0])
  }

  onDrop = (files) => {
    this.setState({ file: files[0] })
  }

  onSubmitHandler = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append('csv', this.state.file);
    this.setState({ loading: true })
    try {
      await this.props.uploadFile(data);
      this.setState({
        status: true
      })
    } catch (e) {
      console.log(e)
      this.setState({
        status: false
      })
    } finally {
      this.setState({
        loading: false,
        file: false
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <HubContent>
          <div className="col-lg-6">
            <div className="card m-b-30">
              <div className="card-body">
                <div className="heading-upload">
                  <h4>Bulk Upload Questions</h4>
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
        </HubContent>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  uploadFile: (data) => dispatch(uploadFile(data))
})

export default connect(undefined, mapDispatchToProps)(BulkUpload);


const styles = {
  upload: {
    border: '1px dotted #ddd',
    padding: '20px 20px'
  }
}