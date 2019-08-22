import React from 'react';
import { connect } from 'react-redux';
import { getOrgInfo } from '../../redux';
import { Loading } from '../../../core/components/common';

let style = {
  icon: { fontSize: '20px', color: '#626f92' },
  list: { paddingBottom: 3 }
};

class Card extends React.Component {
  state = {
    icon: false
  }

  renderAddress = item => {
    return (
      item
        ? <li style={style.list}> {item} </li>
        : false
    )
  }

  
  render() {
    let { address, errMsg } = this.props;
    let icon = <i className="mdi mdi-home-variant mr-1" style={style.icon}></i> 
    return (
      <div className="col-xl-3 col-md-6">
        {address
          ?
          <div className=" d-flex">
            {icon}
            <ul className="list-inline">
              {this.renderAddress(address.address1)}
              {this.renderAddress(address.address2)}
              {this.renderAddress(address.city_name)}
              {this.renderAddress(address.country_name)}
              {this.renderAddress(address.postal_code)}
            </ul>
          </div>
          : (errMsg ? errMsg : <Loading type="flat" />)}
      </div>
    )
  }
}

const mapState = (state) => ({

})

const mapDispatch = (dispatch) => ({
  getOrgInfo: (id) => dispatch(getOrgInfo(id))
})

export const AddressCard = connect(mapState, mapDispatch)(Card);