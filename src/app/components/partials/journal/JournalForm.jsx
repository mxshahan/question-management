import React from 'react';
import { connect } from 'react-redux';
import { getGroupList, getOrgList, getAllCountry, getAllState, getAllCity } from '../../../redux';
import { getRoleList } from '../../../redux';
import { Prices } from './prices';
import { SelectBox, InputBox, Badge } from '../../../../core/components/common';
import { api } from '../../../../core/api';

// import { TextBox } from './TextBox';


class Form extends React.Component {
    constructor(props){
        super(props)
        // preserve the initial state in a new object
        this.baseState = this.state 
      }

    state = {
        journal: {},
        prices:[],
        selected_content_type:[],
        content_type:[]
    }

    resetForm = () => {
        this.setState(this.baseState)
    }
    
    getSingle = (id) => {
        this.resetForm();
        api.get('publication/'+id+'/').then((res) => {
            this.setState({
                ...res,
            })
            // console.log(res,'res res res')
         }, error => {
             console.log(error,'error error')
         }).catch()
    }

    componentWillMount() {
        this.initialState = this.state
    }

    async componentDidMount() {
        this.setState({
            content_type:this.props.content_type
        })
        const id = this.props.journal_id;
        if(id){
            this.getSingle(id);
        }  
    }

    onChangeGroupHandler = async (value) => {
        this.setState({
            domain:value.group
        })
        this.setState((prevState) => {
            prevState.user = Object.assign(this.state.user, value);
            prevState.orgStatus = false;
            return prevState;
        })
        const org = await this.props.getOrgList(value);
        // console.log(org)
        org.status && this.setState({
            orgStatus: true
        })
    }



    onChangeAddressHandler = async (i, value,name=null) => {
        // console.log(i,'  ', name , '  ',value);
        if(name === 'country'){
            this.setState({
                country:value.country
            })
        }
        if(name === 'state'){
            this.setState({
                state:value.state
            })
        }
        if(name==='city'){
            this.setState({
                city:value.city
            })
        }
        
        let adds = this.state.addresses[i] || {};
        let state, city;
        this.setState((prevState) => {
            prevState.addresses[i] = Object.assign(adds, value)
            return prevState;
        })
        if(value.country){
            this.setState((prevState) => {
                prevState.stateStatus[i] = false
                return prevState;
            })
            let newValue = {
                ...value,
                index: i
            };
            state = await this.props.getAllState(newValue)
            state.status && this.setState((prevState) => {
                prevState.stateStatus[i] = true
                return prevState;
            })
        } else if (value.state) {
            this.setState((prevState) => {
                prevState.cityStatus[i] = false
                return prevState;
            })
            let newValue = {
                ...value,
                index: i
            };
            city = await this.props.getAllCity(newValue)
            city.status && this.setState((prevState) => {
                prevState.cityStatus[i] = true
                return prevState;
            })
        }
    }

    

    onChangeOrcidHandler = (value) => {
        this.setState((prevState) => {
            Object.assign(prevState.user_meta, value);
            return prevState;
        })
    }



    onChangeDomainHandler = (value) => {
        this.setState((prevState) => {
            Object.assign(prevState.domain_meta, value);
            return prevState;
        })
    }

    onChangeEmailDomain = (value) => {
        // console.log(value)
    }

    formData(){
        let data = {
            "name":this.state.name,
            "publication_type":this.state.publication_type,
            "publisher":this.state.publisher,
            "journal_type":this.state.journal_type, 
            "pissn":this.state.pissn,
            "eissn":this.state.eissn,
            "impact_factor":this.state.impact_factor,
            "hindex":this.state.hindex,
            "indexed":this.state.indexed,
            "sherpa_romeo_info":this.state.sherpa_romeo_info,
            "note":this.state.note,
            "status":this.state.status, 
            "sub_sys_acronym":this.state.sub_sys_acronym,
            "owner":this.state.owner,    
        }
        let Journal = Object.assign(data,{prices:this.state.prices});
        return Journal;
    }

    onSubmitHandler = async (e) => {
        e.preventDefault();
        let Journal = this.props.isEdit ? this.formData() : Object.assign(this.state.journal,{prices:this.state.prices});
        this.props.onSubmitHandler(Journal);
    }

    incrementAddress = () => {
        if (this.state.addressCounter >= 0) {
            this.setState({
                addressCounter: this.state.addressCounter + 1
            })
        }
    }

    AddNewPrices = (e) =>{
        e.preventDefault();
        this.setState({
            isPrices:true
        })
    }

    decrementAddress = () => {
        if (this.state.addressCounter > 0) {
            this.setState((prevState) => {
                prevState.addressCounter = this.state.addressCounter - 1;
                prevState.addresses.pop();
                return prevState;
            })
        }
    }

    onSaveAuthorHander = (author_info) => {
        this.setState((prevState) => {
            prevState.author = author_info;
            prevState.isAuthor = false;
            return prevState;
        })
    }

    onChangeHandler = (value) => {
        this.setState((prevState) => {
            return Object.assign(prevState.journal, value);
        })
    }

    onCloseAuthor = () => {
        this.setState({
            isPrices: false        
        })
    }

    onSavePriceHandler = (price_info) => {
        this.setState((prevState) => {
            if (prevState.editing) {
                prevState.prices[prevState.editing] = price_info;
            } else {
                prevState.prices.push(price_info)
            }
            prevState.editing= false;
            prevState.isPrices = false;
            return prevState;
        })
    }

    onEditPrices = (id) => {
        this.setState({
            editing: id.toString(),
            isPrices:true
        })
    }

    onDeletePrice = (id) => {
        this.setState((prevState) => {
            prevState.prices.splice(id, 1)
            return prevState
        })
    }

    getSelectedContentTypeId(){
        let selectedPrices = this.state.prices;
        let selected = [];
        selectedPrices.forEach(function(element) {
            selected.push(element.content_type)
        });
        return  selected;
    }

    render() {
        let prices_id = this.getSelectedContentTypeId();
        return (
            <div className="tab-content">
                <div className="tab-pane active p-3" id="home-1" role="tabpanel">
                </div>
                <form >
                    <div className="form-group row">
                        <SelectBox
                            label="Publication type"
                            onChange={this.onChangeHandler}
                            field='publication_type'
                            className="col-sm-4"
                            data={this.props.publication_type}
                            defaultValue={this.state.publication_type}
                            isRequired={true}
                        />
                        <SelectBox
                            label="Journal type"
                            onChange={this.onChangeHandler}
                            field='journal_type'
                            className="col-sm-4"
                            data={this.props.journal_type} 
                            defaultValue={this.state.journal_type}
                            isRequired={true}   
                        />

                    </div>

                    <div className="form-group row">
                        <InputBox
                            label="Journal name"
                            onChange={this.onChangeHandler}
                            field='name'
                            className="col-sm-10"
                            placeholder="Journal name"
                            defaultValue={this.state.name}
                            isRequired={true}
                        />
                    </div>

                    <div className="form-group row">                    
                        <SelectBox
                            label="Publisher"
                            onChange={this.onChangeHandler}
                            field='publisher'
                            className="col-sm-4"
                            data={this.props.orgs}  
                            defaultValue={this.state.publisher}
                            isRequired={true}    
                        />

                        <SelectBox
                            label="Journal owner"
                            onChange={this.onChangeHandler}
                            field='owner'
                            className="col-sm-4"
                            data={this.props.orgs} 
                            defaultValue={this.state.owner}   
                        />
                    </div>
                
                    <div className="form-group row">
                        <InputBox
                            label="Publisher acronym"
                            onChange={this.onChangeHandler}
                            field='pub_acronym'
                            className="col-sm-4"
                            placeholder="acronym" 
                            defaultValue={this.state.pub_acronym}   
                        />
                        <InputBox
                            label="Sub sys acronym"
                            onChange={this.onChangeHandler}
                            field='sub_sys_acronym'
                            className="col-sm-4"
                            placeholder="sub sys acronym" 
                            defaultValue={this.state.sub_sys_acronym}   
                        />
                    </div>
                    <div className="form-group row">
                        <InputBox
                            label="p-ISSN "
                            onChange={this.onChangeHandler}
                            field='pissn'
                            className="col-sm-4"
                            placeholder="p-ISSN "
                            defaultValue={this.state.pissn}   
                        />
                        <InputBox
                            label="e-ISSN"
                            onChange={this.onChangeHandler}
                            field='eissn'
                            className="col-sm-4"
                            placeholder="e-ISSN" 
                            defaultValue={this.state.eissn}   
                        />
                    </div>

                    <div className="form-group row mt-4">
                        <div className="col-sm-12">
                            <div className="float-left">
                                <button className="btn btn-primary mb-2"
                                    onClick={this.AddNewPrices}
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                ><i className="mdi mdi-plus"></i> Add price</button>
                            </div>
                        </div>
                        <s style={{ borderBottom: '1px solid #7a6fbe', width: '100%' }}></s>
                    </div>

                    {/* Co Author Form Modal */}
                    {this.state.isPrices&& <Prices
                        isShow={this.state.isPrices} // if true modal will show up else it will be hidden
                        onClose={this.onCloseAuthor} // Handle Close
                        onSavePrices={this.onSavePriceHandler}
                        value={this.state.prices[this.state.editing]}
                        selected_array={prices_id}
                    />}
                    {/* Co Author Form Modal End */}
                    
                    <div className="form-group row">
                        {this.state.prices.length > 0 && this.state.prices.map((price, id) => {
                            return <Badge
                                label={(price.additional_info && price.additional_info.name) || price.content_type_name}
                                onEdit={() => this.onEditPrices(id)}
                                onDelete={() => this.onDeletePrice(id)}
                                key={id}
                            />
                        })}                    
                    </div>
                    <div className="form-group row">
                        <InputBox
                            label="IF"
                            onChange={this.onChangeHandler}
                            field='impact_factor'
                            className="col-sm-2"
                            placeholder="Impact Factor"  
                            defaultValue={this.state.impact_factor} 
                        />
                        
                        <InputBox
                            label="h-index"
                            onChange={this.onChangeHandler}
                            field='hindex'
                            className="col-sm-2"
                            placeholder="h-index" 
                            defaultValue={this.state.hindex}
                        />
                        
                        <InputBox
                            label="Indexed"
                            onChange={this.onChangeHandler}
                            field='indexed'
                            className="col-sm-2"
                            placeholder="Indexed in" 
                            defaultValue={this.state.indexed}
                        />
                    </div>
                    <div className="form-group row">
                        <InputBox
                            label="Status"
                            onChange={this.onChangeHandler}
                            field='status'
                            className="col-sm-4"
                            placeholder="Status"
                            defaultValue={this.state.status}
                        />    
                        
                        <InputBox
                            label="Sherpa Romeo info"
                            onChange={this.onChangeHandler}
                            field='sherpa_romeo_info'
                            className="col-sm-4"
                            placeholder="Sherpa Romeo info"
                            defaultValue={this.state.sherpa_romeo_info}
                        />
                    </div>
                    <div className="form-group row">   
                        <InputBox
                            label="Note"
                            onChange={this.onChangeHandler}
                            field='note'
                            className="col-sm-10"
                            placeholder="Note"
                            defaultValue={this.state.note}
                        />    
                    </div>  

                    <div className="text-right m-t-15">
                </div> 
                    {this.props.msg &&
                        <div className="form-group row">
                            <span className="alert alert-success col-sm-12">{this.props.msg}</span>
                        </div>
                    }

                    <div className="text-right m-t-15">
                        <div className="text-center m-t-15">
                            <button onClick={this.onSubmitHandler} type="button" className="btn btn-primary waves-effect waves-light"> {this.props.isEdit ? 'Update journal' : 'Add journal' }</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    groups: state.app.groups,
    roles: state.app.roles,
    orgs: state.app.organizations,
    countries: state.app.countries,
    geoLocation: state.app.geoLocation,
    journal_type: state.journals.journal_type,
    content_type: state.journals.content_type,
    publication_type: state.journals.publication_type,
    addressCounter: 3,
    isPrices:false,
    Messages: {},
})

const mapDispatchToProps = (dispatch) => ({
    getRoleList: () => dispatch(getRoleList()),
    getGroupList: () => dispatch(getGroupList()),
    getOrgList: (payload) => dispatch(getOrgList(payload)),
    getAllCountry: () => dispatch(getAllCountry()),
    getAllState: (payload) => dispatch(getAllState(payload)),
    getAllCity: (payload) => dispatch(getAllCity(payload))
})

export const JournalForm = connect(mapStateToProps, mapDispatchToProps)(Form);