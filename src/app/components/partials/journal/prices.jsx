import React from 'react';
import { connect } from 'react-redux';
import { SelectBox, InputBox, PopupBox } from '../../../../core/components/common';




class Form extends React.Component{
    state = {
        isShow: false,
        content_type: this.props.content_type,
        content_type_taken: {},
        prices: {},
        selected_array:this.props.selected_array,
        isEmpty:false
    }

    componentDidMount(){
        this.props.value && this.setState({
            prices: this.props.value
        })        
    }

    updatedConentType = (selected=null) =>{
        let filterArray = this.state.selected_array;
        if(selected){
            filterArray = filterArray.filter(e => e !== selected);
        }
        let objArray = this.state.content_type ? this.state.content_type.filter((element)=> !filterArray.includes(element.id) ) : [];
        return objArray;
    }

    componentWillReceiveProps() {
        this.setState({
            isShow: this.props.isShow
        })
    }

    onChangeHandler = (value) => {
        console.log(value,'value value value');
        this.setState((prevState) => {
            if (Object.keys(value).includes('department')) {
                if (!value.department) {
                    // if department value is
                    // null deleting department from object 
                    delete prevState.prices.department 
                } else {
                    prevState.prices = {
                        ...prevState.prices,
                        department: {
                            name: value.department,
                        },
                    }
                }
            } else if (Object.keys(value).includes('division')) {
                if (!value.division) {
                    delete prevState.prices.department
                } else {
                    if (prevState.prices.department) { // if there any department tree in object
                        prevState.prices = {
                            ...prevState.prices,
                            department: {
                                ...prevState.prices.department,
                                division: {
                                    name: value.division
                                }
                            }
                        }
                    }
                }

            } else {
                prevState.prices = {
                    ...prevState.prices,
                    ...value
                }
            }
            return prevState;
        })
    }

    onCloseModal = (e) => {
        let overlay = document.getElementById("CoAuthorDialog");
        if (e.target === overlay) {
            this.props.onClose()
        }
    }

    onSavePrices = (e) => {
        let { prices } = this.state;
        // console.log(prices);
        if(!prices.content_type ){
            this.setState({
                isEmpty: <div>
                    {!prices.content_type && <p>Content Type Field is required!!</p>} 
                </div>
            })
        }else{
            if(Object.entries(prices).length === 0) {
                alert("fields are empty")
            }else{
                this.props.onSavePrices(prices);
            }
        }
    }

    cancelLoader = async () => {
        this.setState({
            isRegistering: false,
            status: false,
            isEmpty: false
        })
        await this.props.ClearStatus()
    }

    
    render() {
        let { prices,content_type } = this.state;

        console.log(content_type,'content_type content_type',this.updatedConentType(prices.content_type),prices.content_type);
        console.log(prices.content_type,'price content is content');
        let CoAuthorInfo = ( prices &&
            <div className="addresses">
                <div className="form-group row">
                    <div className="col-sm-12">
                        <h6>Content Type Price Info</h6>
                    </div>
                    <s style={{ borderBottom: '1px solid #7a6fbe', width: '100%' }}></s>
                </div>
                
                <div className="form-group row">
                    {this.updatedConentType(prices.content_type)&&
                    <SelectBox
                        label="Content Type"
                        onChange={this.onChangeHandler}
                        field='content_type'
                        className="col-sm-4"
                        data={this.updatedConentType(prices.content_type)}
                        placeholder='Select Content Type'
                        isData={true}
                        defaultValue={prices.content_type}
                        isRequired={true}   
                    />
                    }
                </div>
                <div className="form-group row">
                    <InputBox
                        label="APC GBP"
                        onChange={this.onChangeHandler}
                        field='pub_fee_gbp'
                        className="col-sm-2"
                        placeholder="APC GBP" 
                        defaultValue={prices.pub_fee_gbp} 
                        InputType="number"  
                    />
                    <InputBox
                        label="APC EUR"
                        onChange={this.onChangeHandler}
                        field='pub_fee_eur'
                        className="col-sm-2"
                        placeholder="APC EUR" 
                        defaultValue={prices.pub_fee_eur} 
                        InputType="number"   
                    />
                    <InputBox
                        label="APC USD"
                        onChange={this.onChangeHandler}
                        field='pub_fee_usd'
                        className="col-sm-2"
                        placeholder="APC USD" 
                        defaultValue={prices.pub_fee_usd}
                        InputType="number"    
                    />
                </div>
                <div className="form-group row">
                    <InputBox
                        label="Submission fee GBP"
                        onChange={this.onChangeHandler}
                        field='submission_fee_gbp'
                        className="col-sm-2"
                        placeholder="submission fee GBP"
                        defaultValue={prices.submission_fee_gbp}
                        InputType="number"    
                    />
                    <InputBox
                        label="Submission fee EUR"
                        onChange={this.onChangeHandler}
                        field='submission_fee_eur'
                        className="col-sm-2"
                        placeholder="Submission fee eur" 
                        defaultValue={prices.submission_fee_eur}
                        InputType="number"    
                    />
                    <InputBox
                        label="Submission fee USD"
                        onChange={this.onChangeHandler}
                        field='submission_fee_usd'
                        className="col-sm-2"
                        placeholder="Submission fee usd"
                        defaultValue={prices.submission_fee_usd}
                        InputType="number"    
                    />
                </div>
                <div className="form-group row">
                    <InputBox
                        label="Colour charge GBP"
                        onChange={this.onChangeHandler}
                        field='colour_charge_gbp'
                        className="col-sm-2"
                        placeholder="Colour charge GBP"
                        defaultValue={prices.colour_charge_gbp}
                        InputType="number"    
                    />
                    <InputBox
                        label="Colour charge EUR"
                        onChange={this.onChangeHandler}
                        field='colour_charge_eur'
                        className="col-sm-2"
                        placeholder="Colour charge eur" 
                        defaultValue={prices.colour_charge_eur}
                        InputType="number"    
                    />
                    <InputBox
                        label="Colour charge USD"
                        onChange={this.onChangeHandler}
                        field='colour_charge_usd'
                        className="col-sm-2"
                        placeholder="Colour charge usd" 
                        defaultValue={prices.colour_charge_usd}
                        InputType="number"    
                    />
                </div>
                <div className="form-group row">
                    <InputBox
                        label="Page charge GBP"
                        onChange={this.onChangeHandler}
                        field='page_charge_gbp'
                        className="col-sm-2"
                        placeholder="Page charge GBP"
                        defaultValue={prices.page_charge_gbp}
                        InputType="number"    
                    />
                    <InputBox
                        label="Page charge EUR"
                        onChange={this.onChangeHandler}
                        field='page_charge_eur'
                        className="col-sm-2"
                        placeholder="Pagecharge eur"
                        defaultValue={prices.page_charge_eur}
                        InputType="number"    
                    />
                    <InputBox
                        label="Page/Other charge USD"
                        onChange={this.onChangeHandler}
                        field='page_charge_usd'
                        className="col-sm-2"
                        placeholder="Page charge usd"
                        defaultValue={prices.page_charge_usd}
                        InputType="number"    
                    />
                </div>
                <div className="form-group row">
                    <InputBox
                        label="Other charge GBP"
                        onChange={this.onChangeHandler}
                        field='other_charge_gbp'
                        className="col-sm-2"
                        placeholder="Other charge GBP"
                        defaultValue={prices.other_charge_gbp}
                        InputType="number"    
                    />
                    <InputBox
                        label="Other charge EUR"
                        onChange={this.onChangeHandler}
                        field='other_charge_eur'
                        className="col-sm-2"
                        placeholder="Other charge eur"
                        defaultValue={prices.other_charge_eur} 
                        InputType="number"  
                    />
                    <InputBox
                        label="Other charge USD"
                        onChange={this.onChangeHandler}
                        field='other_charge_usd'
                        className="col-sm-2"
                        placeholder="Other charge usd"  
                        defaultValue={prices.other_charge_usd}
                        InputType="number"     
                    />
                </div>
            </div>
        )

        let errorHander = <>
            {this.state.isEmpty && <PopupBox
                Title="Following field cannot be empty"
                msg={this.state.isEmpty}
                onCancel={this.cancelLoader}
            />}
        </>
        return (
            this.props.isShow ?
            <div onClick={this.onCloseModal} id="CoAuthorDialog" style={modal.overlay}>
                    {/* ErroR handling */}
                    {errorHander}
                    {/* ErroR Handling */}
                    <div className={`col-sm-10 bg-white alert`} style={modal.boxStyle}>
                    {CoAuthorInfo}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal"
                            onClick={(e) => {
                                e.preventDefault();
                                this.props.onClose && this.props.onClose()
                            }}
                        >Close</button>
                        <button type="button" className="btn btn-primary"
                            onClick={this.onSavePrices}
                        >Save changes</button>
                    </div>
                </div>
            </div> : ''
        )
    }
}

let boxHeight = ''
if (navigator.userAgent.toLowerCase().includes('firefox')) {
    boxHeight = '-moz-fit-content'
} else if (navigator.userAgent.toLowerCase().includes('chrome')) {
    boxHeight = '-webkit-fit-content'
}

const modal = {
    overlay: {
        position: 'fixed',
        zIndex: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.64)',
        width: '100%',
        height: '100%',
        overflowY: 'scroll',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 1,
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center'
    },
    boxStyle: {
        transform: 'translate(0, 25px)',
        height: boxHeight
    }
}

const mapStateToProps = (state) => ({
    content_type: state.journals.content_type,
})

const mapDispatchToProps = (dispatch) => ({
  
})

export const Prices = connect(mapStateToProps, mapDispatchToProps)(Form);