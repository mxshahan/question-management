import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Table, Divider, Select, Icon } from 'antd';
import { SelectBox, InputBox } from '../../../../core/components';
import moment from 'moment';
import { formatImage } from './UserFn';

const { Option } = Select;


class UserTable extends React.Component {
  state = {
    swalOption5: {
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'No, cancel!',
          value: null,
          visible: true,
          className: "",
          closeModal: false
        },
        confirm: {
          text: 'Yes, delete it!',
          value: true,
          visible: true,
          className: "bg-danger",
          closeModal: false
        }
      }
    },
    results: null,
    selectedRowKeys: [],
    selectedItems: [],
    sortedInfo: null,
    pageSize: 100
  }


  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys
    });
    this.props.selectedRowKeys && this.props.selectedRowKeys(selectedRowKeys)
  }

  formatImage = (record) => {
    return Array.isArray(record.images) && record.images.length > 0
      ? formatImage(record.images[record.images.length - 1])
      : (
        record.gender.toLowerCase() === 'male'
          ? "/assets/images/male.png"
          : "/assets/images/female.png"
      )
  }

  render() {
    let sortedInfo = this.state.sortedInfo || {};
    let columns = [
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        className: 'text-center',
        render: (text, record) => (
          <span>
            <img
              src={this.formatImage(record)}
              alt="Alternative"
              className="img-thumbnail rounded-circle img-fluid"
              style={{ width: 40, height: 40 }}
              onError={(e) => {
                if (record.gender.toLowerCase() === 'male') {
                  return e.target.src = "/assets/images/male.png"
                } else {
                  return e.target.src = "/assets/images/female.png"
                }
              }}
            />
          </span>
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name && a.name.localeCompare(b.name),
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        sorter: (a, b) => a.gender && a.gender.localeCompare(b.gender),
        sortOrder: sortedInfo.columnKey === 'gender' && sortedInfo.order,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email && a.email.localeCompare(b.email),
        sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
      },
      {
        title: 'Seeking',
        dataIndex: 'seeking',
        key: 'seeking',
        sorter: (a, b) => a.seeking && a.seeking.localeCompare(b.seeking),
        sortOrder: sortedInfo.columnKey === 'seeking' && sortedInfo.order,
      },
      {
        title: 'Signup date',
        dataIndex: 'date',
        key: 'date',
        sorter: (a, b) => a.date && a.date.localeCompare(b.date),
        sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
        render: (text, record) => {
          return moment(record.date).format('ll')
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => a.status && a.status.localeCompare(b.status),
        sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
        render: (text, record) => (
          record.profile === 'incomplete' ? "Incomplete" :
            <span>
              <Select defaultValue={record.status} onChange={(value) => this.props.statusUpdate && this.props.statusUpdate(value, record)}>
                <Option value="active">Active</Option>
                <Option value="blocked">Block</Option>
                <Option value="deactivated">Deactive</Option>
              </Select>
            </span>
        )
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: '10%',
        render: (text, record) => (
          <span className="d-flex align-items-center" id="action-btn">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <span className="text-default cursor-pointer" onClick={() => this.props.onView && this.props.onView(record)} >
              <Icon type="fullscreen" title="View" />
            </span>
            <Divider type="vertical" />
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <span onClick={() => this.props.onEdit && this.props.onEdit(record)} className="text-warning cursor-pointer">
              <Icon type="edit" title="Edit" />
            </span>
            {/* <Divider type="vertical" /> */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            {/* <span onClick={() => this.props.onDelete && this.props.onDelete(record._id)} className="text-danger cursor-pointer">
              <Icon type="delete" title="Delete" />
            </span> */}

          </span>
        )
      },
    ]


    const { selectedRowKeys } = this.state;
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // };


    const rows = [
      { name: '10', id: 10 },
      { name: '25', id: 25 },
      { name: '50', id: 50 },
      { name: '100', id: 100 },
    ]

    const genders = [
      { name: 'all', id: 'all' },
      { name: 'male', id: 'male' },
      { name: 'female', id: 'female' },
    ]

    return (
      <React.Fragment>
        <div className="row d-flex align-items-center  mb-2">
          <SelectBox
            className="col-md-2"
            data={rows}
            onChange={({ rows }) => this.setState({ pageSize: rows })}
            field="rows"
            defaultValue={this.state.pageSize}
            label="Shows"
            labelClass="col-sm-1"
          />
          <SelectBox
            className="col-md-2"
            data={genders}
            onChange={this.props.onFiltering && this.props.onFiltering}
            field="gender"
            defaultValue={this.props.filterParams && this.props.filterParams.gender}
            label="Gender"
            labelClass="col-sm-1"
          />
          <InputBox
            className="col-md-6"
            onChange={this.props.onSearch && this.props.onSearch}
            field="search"
            placeholder="Search... name, seeking"
          />

          <div className="col-md-2">
            {selectedRowKeys.length > 0 &&
              <button
                className="btn btn-danger btn-md waves-effect waves-light w-100"
                onClick={() => this.props.deleteMultiple && this.props.deleteMultiple(this.state.selectedRowKeys)}
              >Delete</button>
            }
          </div>
        </div>
        <div className="row" id="user-table">
          <div className="col-12">
            <Card>
              <Table
                dataSource={this.props.data}
                columns={columns}
                onChange={this.handleChange}
                // rowSelection={rowSelection}
                pagination={{ pageSize: this.state.pageSize }}
                loading={this.props.loading}
                rowKey="_id"
                scroll={{ x: 1000 }}
              />
            </Card>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect()(UserTable);