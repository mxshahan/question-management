import React from 'react';
import { connect } from 'react-redux';
import { getGroupList, getOrgList, getAllCountry, getAllState, getAllCity, singleOrg } from '../../../redux';
import { getRoleList } from '../../../redux';
import { TextBox } from '../../../../core/components/common/TextBox';
import { api } from "../../../../core/api";
import { SelectBox, InputBox } from '../../../../core/components/common';

class Form extends React.Component {
  state = {
    org: {
      is_active: true,
      meta: {
        is_active: true,
      },
      address: {
        is_active: true,
        title: ''
      }
    },
    roleList: false,
    title: '',
    groupList: false,
    addressCounter: 0,
    addresses: [],
    user_meta: {},
    domain_meta: {},
    orgStatus: false,
    stateStatus: [],
    cityStatus: [],
    selectedOrganization: false,
    address: {},
    meta: {}
  }

  getSingle = async (id) => {
    api.get('organisation/' + id + '/').then((res) => {
      this.setState({
        org: res
      }, async function () {
        await this.props.getAllState({ country: this.state.org.address.country })
        this.setState((prevState) => {
          prevState.stateStatus[0] = true
          return prevState;
        })
      })
    }, error => {
      console.log(error, 'error error')
    }).catch()
  }


  async componentDidMount() {
    const id = this.props.org_id;
    this.props.getRoleList();
    this.props.getGroupList();
    this.props.getAllCountry();
    if (id) {
      await this.getSingle(id);
    }
  }



  onChangeGroupHandler = async (value) => {
    value.group && this.onChangeEmailDomain(value.group)
    this.setState({
      domain: value.group
    })
    this.setState((prevState) => {
      prevState.user = Object.assign(this.state.org, value);
      prevState.orgStatus = false;
      return prevState;
    })
    const org = await this.props.getOrgList(value);
    // console.log(org)
    org.status && this.setState({
      orgStatus: true
    })
    // Object.keys(value).map((key,index)=>{
    //     if(key=='group'){
    //         value['domain']
    //     }
    // })
    this.setState((prevState) => {
      return Object.assign(prevState.org, value);
    })
  }

  onChangeEmailDomain = (value) => {
    console.log(value)
  }

  onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(this.state.org,'this.state.org ');
    this.props.onSubmitHandler(this.state.org);
  }

  onChangeAddressHandler = async (i, value) => {
    console.log(i, 'hell i here');
    let adds = this.state.addresses[i] || {};
    let state, city;
    this.setState((prevState) => {
      prevState.addresses[i] = Object.assign(adds, value)
      return prevState;
    })
    let newValue = {
      ...value,
      index: i
    };

    if (value.country) {
      this.setState((prevState) => {
        prevState.stateStatus[i] = false
        return prevState;
      })
      console.log(newValue, 'newValue is here');
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
      city = await this.props.getAllCity(newValue)
      city.status && this.setState((prevState) => {
        prevState.cityStatus[i] = true
        return prevState;
      })
    }
    this.setState((prevState) => {
      return Object.assign(prevState.org.address, value);
    })
    console.log(this.state.org, 'value value');

  }

  onChangeHandler = (value) => {
    if (value.hasOwnProperty('organisation')) {
      value.parent = value.organisation
    }
    console.log(value, 'value is value');
    this.setState((prevState) => {
      return Object.assign(prevState.org, value);
    })
  }

  onChangeAddressHandlers = (value) => {
    // this.setState((prevState) => {
    //     return Object.assign(prevState.address, value);
    // })
    this.setState((prevState) => {
      return Object.assign(prevState.org.address, value);
    })
  }

  onChangeMetaHandler = (value) => {
    this.setState((prevState) => {
      return Object.assign(prevState.meta, value);
    })
    this.setState((prevState) => {
      return Object.assign(prevState.org, { meta: this.state.meta });
    })
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
              onChange={(value) => this.onChangeAddressHandler(i, value, 'country')}
              field='country'
              data={this.props.countries}
              defaultValue={this.state.org.address && this.state.org.address.country}
            />
            <SelectBox
              label="State"
              onChange={(value) => this.onChangeAddressHandler(i, value, 'state')}
              field='state'
              data={this.props.state_list ? this.props.state_list : this.props.geoLocation ? (this.props.geoLocation[i] ? this.props.geoLocation[i].states : other) : other}
              // disabled={ this.props.org ? this.state.org.address && this.state.org.address.state : !this.state.stateStatus[i]  }
              defaultValue={this.state.org.address && this.state.org.address.state}
            />
          </div>
          <div className="form-group row">
            <SelectBox
              label="City"
              onChange={(value) => this.onChangeAddressHandler(i, value, 'city')}
              field='city'
              data={this.props.geoLocation ? (this.props.geoLocation[i] ? this.props.geoLocation[i].cities : other) : other}
              disabled={!this.state.cityStatus[i]}
              defaultValue={this.state.org.address && this.state.org.address.city}
            />
            <TextBox
              label="Address 1"
              onChange={this.onChangeAddressHandlers}
              field='address1'
              placeholder="Address 1"
              defaultValue={this.state.org.address && this.state.org.address.address1}
            />
          </div>
          <div className="form-group row">
            <TextBox
              label="Address 2"
              onChange={this.onChangeAddressHandlers}
              field='address2'
              placeholder="Address 2"
              defaultValue={this.state.org.address && this.state.org.address.address2}
            />
            <InputBox
              label="Post/Zip code"
              onChange={this.onChangeAddressHandlers}
              field='postal_code'
              placeholder="post code"
              defaultValue={this.state.org.address && this.state.org.address.postal_code}
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
              defaultValue={this.state.org.domain}
            />
            <InputBox
              label="Organization name"
              onChange={this.onChangeHandler}
              field="name"
              placeholder="Enter Organisation Name"
              defaultValue={this.state.org.name}
            />
          </div>
          <div className="form-group row">
            <SelectBox
              label="Parent organization"
              onChange={this.onChangeHandler}
              field='organisation'
              data={this.props.orgs || ['Loading']}
              disabled={this.props.org ? !this.state.org.parent : !this.props.orgs}
              onRestFields={this.onChangeEmailDomain}
              className="col-sm-10"
              defaultValue={this.state.org.parent}
            />
          </div>
          <div className="form-group row">
            <InputBox
              label="Name in other language"
              field='name_1_other_lang'
              placeholder="Name in other language if any"
              onChange={this.onChangeMetaHandler}
              defaultValue={this.state.org.meta && this.state.org.meta.name_1_other_lang}
            />
            <InputBox
              label="Name in other language"
              onChange={this.onChangeMetaHandler}
              field='name_2_other_lang'
              placeholder="name in other language if any"
              defaultValue={this.state.org.meta && this.state.org.meta.name_2_other_lang}
            />
          </div>
          {addresses}
          <div className="form-group row">
            <InputBox
              label="Email domain"
              onChange={this.onChangeHandler}
              field="email_domain"
              className="col-sm-10"
              placeholder="enter your org domain: i.e. @ox.ac.uk"
              isRequired={true}
              defaultValue={this.state.org.email_domain}

            />
          </div>
          <div className="form-group row">
            <InputBox
              label="Website"
              onChange={this.onChangeHandler}
              field="website"
              placeholder="enter your website"
              defaultValue={this.state.org.website}
            />
            <InputBox
              label="VAT"
              field="vat_number"
              placeholder="enter VAT number"
              onChange={this.onChangeHandler}
              defaultValue={this.state.org.vat_number}
            />
          </div>
          <div className="form-group row">
            <InputBox
              label="GRID no."
              field="grid_number"
              placeholder="GRID number"
              onChange={this.onChangeMetaHandler}
              defaultValue={this.state.org.meta && this.state.org.meta.grid_number}
            />
            <InputBox
              label="Ringgold"
              field="ring_gold_number"
              placeholder="Ringgold number"
              onChange={this.onChangeMetaHandler}
              defaultValue={this.state.org.meta && this.state.org.meta.ring_gold_number}
            />
          </div>
          <div className="form-group row">
            <InputBox
              label="ISNI no."
              field="isni_number"
              placeholder="ISNI"
              onChange={this.onChangeMetaHandler}
              defaultValue={this.state.org.meta && this.state.org.meta.isni_number}
            />
            <InputBox
              label="Note"
              field="note"
              placeholder="Note"
              onChange={this.onChangeHandler}
              defaultValue={this.state.org.note || ''}
            />
          </div>
          {this.props.msg &&
            <div className="form-group row">
              <span className="alert alert-success col-sm-12">{this.props.msg}</span>
            </div>
          }

          <div className="text-right m-t-15">
            <div className="text-center m-t-15">
              <button onClick={this.onSubmitHandler} type="button" className="btn btn-primary waves-effect waves-light"> {this.props.org ? 'Edit Organisation' : 'Add Organisation'}</button>
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
  singleOrg: state.orgs.org_single,
  state_list: state.orgs.state_list,
  Messages: {}
})

const mapDispatchToProps = (dispatch) => ({
  getRoleList: () => dispatch(getRoleList()),
  getGroupList: () => dispatch(getGroupList()),
  getOrgList: (payload) => dispatch(getOrgList(payload)),
  getAllCountry: () => dispatch(getAllCountry()),
  getAllState: (payload) => dispatch(getAllState(payload)),
  getAllCity: (payload) => dispatch(getAllCity(payload)),
  singleOrg: (id) => dispatch(singleOrg(id)),
})

export const OrgForm = connect(mapStateToProps, mapDispatchToProps)(Form);