import React from 'react';
import { connect } from 'react-redux';
import { getGroupList, getOrgList, getAllCountry, getAllState, getAllCity } from '../../../redux';
import { getRoleList } from '../../../redux';
import { SelectBox, TextBox, InputBox } from '../../../../core/components/common';

const mapStateToProps = (state) => ({
    auth: state.auth,
    groups: state.app.groups,
    roles: state.app.roles,
    orgs: state.app.organizations,
    countries: state.app.countries,
    geoLocation: state.app.geoLocation,
    Messages: {}
})

const mapDispatchToProps = (dispatch) => ({
    getRoleList: () => dispatch(getRoleList()),
    getGroupList: () => dispatch(getGroupList()),
    getOrgList: (payload) => dispatch(getOrgList(payload)),
    getAllCountry: () => dispatch(getAllCountry()),
    getAllState: (payload) => dispatch(getAllState(payload)),
    getAllCity: (payload) => dispatch(getAllCity(payload))
})

class Form extends React.Component {
    state = {
        user: {},
        roleList: false,
        groupList: false,
        addressCounter: 0,
        addresses: [],
        user_meta: {},
        domain_meta: {},
        orgStatus: false,
        stateStatus: [],
        cityStatus: [],
        selectedOrganization: false
    }

    componentDidMount() {
        this.props.getRoleList();
        this.props.getGroupList();
        this.props.getAllCountry();
    }


    onChangeHandler = (value) => {
        this.setState((prevState) => {
            return Object.assign(this.state.user, value);
        })
            // console.log(value)
    }

    onChangeGroupHandler = async (value) => {
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

    onChangeAddressHandler = async (i, value) => {
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
        console.log(value)
    }

    onSubmitHandler = async (e) => {
        e.preventDefault();
        await this.setState((prevState) => {
            return prevState.addresses.filter((element) => {
                element.title === "" && delete element.title;
                element.address1 === "" && delete element.address1;
                element.address2 === "" && delete element.address2;
                element.city === "" && delete element.city;
                element.postal_code === "" && delete element.postal_code;
                if (Object.entries(element).length === 0) {
                    return prevState.addresses = [];
                } else {
                    return element;
                }
            })
        })

        this.setState(() => {
            return Object.assign(this.state.user, {
                username: this.state.user.email,
                addresses: this.state.addresses,
                user_meta: this.state.user_meta
            })
        })

        // console.log(this.state.user)
        this.props.onSubmitHandler(this.state.user)
    }

    incrementAddress = () => {
        if (this.state.addressCounter >= 0) {
            this.setState({
                addressCounter: this.state.addressCounter + 1
            })
        }
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

    render() {
        let addresses = [];
        let other = [
            {
                "id": 1,
                "name": "Other",
                "short_name": "OT",
                "parent": null,
            }]

        for (let i = 0; i <= this.state.addressCounter; i++) {
            addresses.push(
                <div className="addresses" key={i}>
                    <div className="form-group row">
                        <SelectBox
                            label="Country"
                            onChange={(value) => this.onChangeAddressHandler(i, value)}
                            field='country'
                            data={this.props.countries}
                        />
                        <SelectBox
                            label="State"
                            onChange={(value) => this.onChangeAddressHandler(i, value)}
                            field='state'
                            data={this.props.geoLocation ? (this.props.geoLocation[i] ? this.props.geoLocation[i].states : other) : other}
                            disabled={!this.state.stateStatus[i]}
                        />
                    </div>
                    <div className="form-group row">
                        <SelectBox
                            label="City"
                            onChange={(value) => this.onChangeAddressHandler(i, value)}
                            field='city'
                            data={this.props.geoLocation ? (this.props.geoLocation[i] ? this.props.geoLocation[i].cities : other) : other}
                            disabled={!this.state.cityStatus[i]}
                        />
                        <TextBox
                            label="Address 1"
                            onChange={(value) => this.onChangeAddressHandler(i, value)}
                            field='address1'
                            placeholder="Address 1"
                        />
                    </div>
                    <div className="form-group row">
                        <TextBox
                            label="Address 2"
                            onChange={(value) => this.onChangeAddressHandler(i, value)}
                            field='address2'
                            placeholder="Address 2"
                        />
                        <InputBox
                            label="Post/Zip Code"
                            onChange={(value) => this.onChangeAddressHandler(i, value)}
                            field='postal_code'
                            placeholder="post code"
                        />
                    </div>
                </div>
            )
        }

        return (
            <div className="tab-content">
                <div className="tab-pane active p-3" id="home-1" role="tabpanel">
                </div>
                <form >
                    <div className="form-group row">

                        <SelectBox
                            label="Group"
                            onChange={this.onChangeGroupHandler}
                            field='group'
                            data={this.props.groups}
                        />
                        <InputBox
                            label="Organization Name"
                            onChange={this.onChangeHandler}
                            field='name'
                            defaultValue=""
                            placeholder="enter parent organization name"
                        />
                    </div>
                    <div className="form-group row">
                        <SelectBox
                            label="Parent Organization"
                            onChange={this.onChangeHandler}
                            field='organisation'
                            data={this.props.orgs || ['Loading']}
                            isRequired={true}
                            disabled={!this.state.orgStatus}
                            onRestFields={this.onChangeEmailDomain}
                            className="col-sm-10"
                        />
                    </div>

                    <div className="form-group row">
                        <InputBox
                            label="Name in other language"
                            onChange={this.onChangeHandler}
                            field='name_1_other_lang'
                            defaultValue=""
                            placeholder="name in other language if any"
                            className=""
                        />
                        <InputBox
                            label="Name in other language"
                            onChange={this.onChangeHandler}
                            field='name_2_other_lang'
                            defaultValue=""
                            placeholder="name in other language if any"
                            className=""
                        />
                    </div>
                    {addresses}

                    <div className="form-group row">
                        <InputBox
                            label="Email Domain"
                            onChange={this.onChangeHandler}
                            field="email_domain"
                            className="col-sm-10"
                            defaultValue=""
                            placeholder="enter your org domain: i.e. @ox.ac.uk"
                        />
                    </div>
                    <div className="form-group row">
                        <InputBox
                            label="Website"
                            onChange={this.onChangeHandler}
                            field="website"
                            defaultValue=""
                            placeholder="enter your website"
                        />
                        <InputBox
                            label="VAT"
                            onChange={this.onChangeHandler}
                            field="vat_number"
                            defaultValue=""
                            placeholder="enter VAT number"
                        />
                    </div>
                    <div className="form-group row">
                        <InputBox
                            label="GRID No."
                            onChange={this.onChangeHandler}
                            field="grid_number"
                            defaultValue=""
                            placeholder="GRID number"
                        />
                        <InputBox
                            label="Ringgold"
                            onChange={this.onChangeHandler}
                            field="ring_gold_number"
                            defaultValue=""
                            placeholder="Ringgold number"
                        />
                    </div>
                    <div className="form-group row">
                        <InputBox
                            label="ISNI No."
                            onChange={this.onChangeHandler}
                            field="isni_number"
                            defaultValue=""
                            placeholder="ISNI"
                        />
                        <InputBox
                            label="Note"
                            onChange={this.onChangeHandler}
                            field="note"
                            defaultValue=""
                            placeholder="Note"
                        />
                    </div>
                    {this.props.msg &&
                        <div className="form-group row">
                            <span className="alert alert-success col-sm-12">{this.props.msg}</span>
                        </div>
                    }

                    <div className="text-right m-t-15">
                        <div className="text-center m-t-15">
                            <button onClick={this.onSubmitHandler} type="button" className="btn btn-primary waves-effect waves-light">Add Organisation</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export const OrgForm = connect(mapStateToProps, mapDispatchToProps)(Form);