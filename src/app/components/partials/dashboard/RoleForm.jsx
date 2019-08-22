import React from 'react';
import { connect } from 'react-redux';
import { InputBox } from '../../../../core/components/common';

class Form extends React.Component {
    state = {
        data: {},
    }

    onChangeHandler = (value) => {
        this.setState(() => {
            return Object.assign(this.state.data, value);
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.onSubmitHandler(this.state.data)
    }

    render() {
        return (
            <div className="tab-content">
                <div className="tab-pane active p-3" id="home-1" role="tabpanel">
                </div>
                <form >
                    <div className="form-group row">
                        <InputBox
                            label="Name"
                            onChange={this.onChangeHandler}
                            field='name'
                            placeholder="Role name"
                            className="col-sm-10"
                        />
                    </div>

                    {this.props.msg &&
                        <div className="form-group row">
                            <span className="alert alert-success col-sm-12">{this.props.msg}</span>
                        </div>
                    }

                    <div className="text-center m-t-15">
                        <button
                            type="button"
                            className="btn btn-primary waves-effect waves-light"
                            onClick={this.onSubmitHandler}
                        >Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
})
export const RoleForm = connect(mapStateToProps, mapDispatchToProps)(Form);