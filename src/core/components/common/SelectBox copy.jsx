import React from 'react';
import Select from 'react-select';


class Selects extends React.Component {
    state = {
        msg: this.props.errMsg || '',
        selectedValue: null,
        defaultValue: 1,

    }

    componentDidMount() {
        this.setState({
            selectedValue: {
                value: this.props.defaultValue,
                label: "Select"
            }
        })
    }

    componentWillReceiveProps() {
        let selectedValue;
        if (this.props.defaultValue && this.props.data) {
            selectedValue = this.props.data.find((value) => {
                return value.id === this.props.defaultValue && value
            })
            selectedValue && this.setState({
                selectedValue: {
                    value: this.props.defaultValue,
                    label: selectedValue.name
                }
            })
        }
    }

    onBlurHandler = (e) => {
        e.preventDefault();
        if (!this.state.selectedValue.value && this.props.isRequired) {
            this.setState({
                msg: 'Filled is Required'
            })
        } else {
            this.setState({
                msg: ''
            })
        }
    }

    handleChange = (data) => {
        if (data) {
            this.setState({
                selectedValue: data,
                msg: ''
            })
            if (this.props.field && this.props.isData) {
                this.props.onChange({ [this.props.field]: data.value, ...data })
            }else if(this.props.field){
                this.props.onChange({ [this.props.field]: data.value })
            }
        }
        this.props.OnChangeTextBox && this.props.OnChangeTextBox(data.value,this.props.field);
    }


    render() {
        let options = [];
        let { selectedValue } = this.state;
        this.props.data && this.props.data.map((data) => {
            return options.push({ value: data.id, label: data.name, ...data })
        })
        return (
            this.props.isPublic ?
                <div className="page-title-box">
                    <label
                        htmlFor={this.props.field || ''}
                        className={`${this.props.labelClass || ""}`}
                    >{this.props.label ? this.props.label : ''} {this.props.isRequired && <span className="text-danger"> * </span>}</label>

                    <div style={{ position: 'relative' }}>
                        {this.state.msg && <span className="text-danger text-small" style={{ fontSize: 12, position: 'absolute', right: 20, top: -10, backgroundColor: '#fff', padding: '0px 10px', zIndex: 99999 }}>{this.state.msg}</span>}

                        <Select
                            id={this.props.id || ''}
                            onChange={this.handleChange}
                            options={options}
                            onBlur={this.onBlurHandler}
                            required={this.props.isRequired || false}
                            isDisabled={this.props.disabled || false}
                            value={selectedValue}
                        />
                    </div>
                </div>
                :
                <>

                    <label
                        htmlFor={this.props.field || ''}
                        className={` col-form-label ${this.props.labelClass || "col-sm-2"}`}
                    >{this.props.label ? this.props.label : ''} {this.props.isRequired && <span className="text-danger"> * </span>}</label>

                    <div className={` ${this.props.className ? this.props.className : 'col-sm-4'}`} style={{ position: 'relative' }}>

                        {this.state.msg && <span className="text-danger text-small" style={{ fontSize: 12, position: 'absolute', right: 20, top: -10, backgroundColor: '#fff', padding: '0px 10px', zIndex: 99999 }}>{this.state.msg}</span>}

                        <Select
                            id={this.props.id || ''}
                            onChange={this.handleChange}
                            options={options}
                            onBlur={this.onBlurHandler}
                            required={this.props.isRequired || false}
                            isDisabled={this.props.disabled || false}
                            value={selectedValue}
                            defaultValue={{value: 1, label: "Add"}}
                        />
                    </div>
                </>
        )
    }
}

export const SelectBox = Selects;