import React from 'react';
import { connect } from 'react-redux';
// import { Link, NavLink } from 'react-router-dom';
import '../../../static/styles/index.scss'

export class ViewRow extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-3">
                    <p className="m-1"><strong>{this.props.label}</strong></p>
                </div>
                <div className="col-sm-9">
                    <p className="m-1">
                        <strong className="info_seperator"> :</strong> {this.props.value}
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ViewRow)