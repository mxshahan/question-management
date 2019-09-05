import React from 'react';
import { connect } from 'react-redux';
import { TextBox } from '../../../../core/components/common';

const styles = {
  container: {
    position: 'fixed',
    zIndex: 9,
    backgroundColor: 'rgba(0, 0, 0, 0.64)',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    top: 0,
    left: 0
  },
  innerContainer: {
    position: "absolute",
    top: '50%',
    left: '50%',
    zIndex: 999999,
    transform: 'translate(-50%, -50%)'
  }
}

class Popup extends React.Component {
  state = {
    note: ''
  }

  onChangeHandler = (value) => {
    this.setState(value)
  }
  
  onPressOK = (e) => {
    e.preventDefault();
    this.props.onPressOK && this.props.onPressOK(this.state)
  }

  renderRequestForm = () => (
    <div className="tab-content">
      <form>
        <div className="form-group row">
          <TextBox
            label="Note"
            isPublic={true}
            className="col-md-12"
            labelClass="col-md-12 text-left"
            onChange={this.onChangeHandler}
            field="note"
            placeholder="Tell what you want to correct..."
            isRequired={true}
          />
        </div>

      </form>
    </div>
  )



  render() {
    let props = this.props;
    let className = this.props.className ? this.props.className : 'col-sm-4';

    return (
      <div style={styles.container}>
        <div
          className={`${className} text-center bg-white alert`}
          style={styles.innerContainer}
        >
          <h4>{props.title}</h4>

          {this.renderRequestForm()}

          <div className="text-center">
            {props.YesText && <button className={`m-3 col-sm-4 btn btn-lg btn-${props.type || 'primary'}`} onClick={this.onPressOK}>{props.YesText || 'Yes'}</button>
            }

            <button
              className={`m-3 col-sm-4 btn btn-lg btn-${props.NoBtnType || 'primary'}`}
              onClick={(e) => {
                e.preventDefault();
                props.onCancel ? props.onCancel() : props.ClearStatus();
              }}>{props.NoText || 'OK'}
            </button>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
})

export const CorrectionRequest = connect(mapStateToProps, mapDispatchToProps)(Popup);
