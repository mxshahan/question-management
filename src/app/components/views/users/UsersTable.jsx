import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Table } from 'antd';



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
    loading: false,
    sortedInfo: null,
    pageSize: 100
  }


  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', sorter);
    this.setState({
      sortedInfo: sorter,
    });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys
    });
  }

  render() {
    const data = [
      {
        id: 1,
        name: 'Test Project',
        text: 'a',
        gender: 'Male',
        image: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
        updated_by: {
          id: 1,
          first_name: 'Shahan',
          last_name: 'Chowdhury'
        }
      },
      {
        id: 1,
        name: 'Test Project',
        text: 'e',
        gender: 'Male',
        image: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
        updated_by: {
          id: 1,
          first_name: 'Shahan',
          last_name: 'Chowdhury'
        }
      },
      {
        id: 1,
        name: 'Test Project 3',
        text: 'd',
        gender: 'Male',
        image: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
        updated_by: {
          id: 1,
          first_name: 'Shahan',
          last_name: 'Chowdhury'
        }
      },
      {
        id: 1,
        name: 'Urban Project',
        text: 'c',
        gender: 'Male',
        image: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
        updated_by: {
          id: 1,
          first_name: 'Shahan',
          last_name: 'Chowdhury'
        }
      }
    ]

    let sortedInfo = this.state.sortedInfo || {};
    let columns = [
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: imgUrl => (
          <span className=" ">
            <img src={imgUrl} alt="Alternative" className="img-thumbnail rounded-circle img-fluid" width="40px" />
          </span>
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        sorter: (a, b) => a.gender.localeCompare(b.text),
        sortOrder: sortedInfo.columnKey === 'gender' && sortedInfo.order,
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        sorter: (a, b) => a.country.localeCompare(b.country),
        sortOrder: sortedInfo.columnKey === 'country' && sortedInfo.order,
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        sorter: (a, b) => a.phone.localeCompare(b.phone),
        sortOrder: sortedInfo.columnKey === 'phone' && sortedInfo.order,
      },
      {
        title: 'Seeking',
        dataIndex: 'seeking',
        key: 'seeking',
        sorter: (a, b) => a.seeking.localeCompare(b.seeking),
        sortOrder: sortedInfo.columnKey === 'seeking' && sortedInfo.order,
      },
      {
        title: 'Signup Date',
        dataIndex: 'signup_date',
        key: 'signup_date',
        sorter: (a, b) => a.signup_date.localeCompare(b.signup_date),
        sortOrder: sortedInfo.columnKey === 'signup_date' && sortedInfo.order,
      },
    ]


    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };


    return (
      <div className="row">
        <div className="col-12">
          <Card>
            <Table
              dataSource={data}
              columns={columns}
              onChange={this.handleChange}
              rowSelection={rowSelection}
            />
          </Card>
        </div>
      </div>
    )
  }
}

export default connect()(UserTable);