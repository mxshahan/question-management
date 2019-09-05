import React from 'react';
import { connect } from 'react-redux';
import HubContent from '../../../../core/components';
import UsersTable from './UsersTable';
import { GetUserList, UpdateUser, DeleteUser, DeleteMultipleUser, filterData } from '../../../redux';
import { history } from '../../../route/AppRouter';

class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    const status = props.type;
    this.state = {
      filterParams: {
        status,
      },
      searchParams: {

      },
      loading: true,
    }
  }

  async componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      await this.props.GetUserList(this.state.filterParams);
    } catch (e) {
      console.log(e.response)
    } finally {
      this.setState({ loading: false })
    }
  }

  onView = (record) => {
    history.push('/users/' + record._id, record)
  }

  onEdit = (record) => {
    history.push('/users/user-edit/' + record._id, record)
  }

  onDelete = async (id) => {
    let action = window.confirm("Do you want to delete?")
    if (action) {
      this.setState({ loading: true })
      await this.props.DeleteUser(id)
      this.getUsers();
    }
  }

  onFiltering = async (value) => {
    await this.setState((prevState) => {
      if (value.hasOwnProperty('gender') && value.gender === 'all') {
        delete prevState.filterParams.gender
      } else {
        Object.assign(prevState.filterParams, value);
      }
      return prevState;
    })
    this.getUsers();
  }

  statusUpdate = async (value, record) => {
    this.setState({ loading: true })
    let newData = { status: value, _id: record._id }
    await this.props.UpdateUser(newData);
    this.getUsers();
  }


  deleteMultiple = async (rowKeys) => {
    let action = window.confirm("Do you want to delete all selected items?")
    if (action) {
      this.setState({ loading: true })
      await this.props.DeleteMultipleUser(rowKeys)
      this.getUsers();
    }
  }

  onSearch = (params) => {
    this.props.filterData({ ...params, status: this.props.type })
  }

  render() {
    return (
      <HubContent title={this.props.title}>
        <UsersTable
          {...this.props}
          onView={this.onView}
          onEdit={this.onEdit}
          loading={this.state.loading}
          data={this.props.data}
          filterParams={this.state.filterParams}
          onFiltering={this.onFiltering}
          onSearch={this.onSearch}
          statusUpdate={this.statusUpdate}
          deleteMultiple={this.deleteMultiple}
        />
      </HubContent>
    )
  }
}

const mapStateToProps = (state, props) => ({
  data: state.users[props.type] && state.users[props.type].filtered,
  // filterData: (params) => UserFilter(state.users[props.type], params)
})

const mapDispatchToProps = (dispatch) => ({
  GetUserList: (params) => dispatch(GetUserList(params)),
  UpdateUser: (payload) => dispatch(UpdateUser(payload)),
  DeleteUser: (id) => dispatch(DeleteUser(id)),
  DeleteMultipleUser: (rowKeys) => dispatch(DeleteMultipleUser(rowKeys)),
  filterData: (params) => dispatch(filterData(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);