import React from 'react';
import { connect } from 'react-redux';
import { HubContent } from '../../../../core/components/hub/HubContent';
import { Table, Divider } from 'antd';
import { SelectBox, Loading } from '../../../../core/components';


class Processes extends React.Component {
  state = {
    results: [],
    filterParams: { category: '' },
    selectedRowKeys: [],
    selectedItems: [],
    loading: false,
    sortedInfo: null,
    pageSize: 100
  }


  onChangeFiltering = async (value) => {
    await this.setState((prevState) => {
      Object.assign(prevState.filterParams, value)
    })
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys
    });
  }

  deleteMultiple = async  e => {
    e.preventDefault();
    let items = [];
    // eslint-disable-next-line no-unused-vars
    for (let key of this.state.selectedRowKeys) {
      items.push(this.state.results[key]);
    }
  }


  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', sorter);
    this.setState({
      sortedInfo: sorter,
    });
  };

  render() {
    // let heading = ['question', 'type'];
    let sortedInfo = this.state.sortedInfo || {};
    let columns = [
      {
        title: 'Question',
        dataIndex: 'question',
        key: 'question',
        width: '60%',
        sorter: (a, b) => a.question.length - b.question.length,
        sortOrder: sortedInfo.columnKey === 'question' && sortedInfo.order,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        width: '10%',
        sorter: (a, b) => a.type.length - b.type.length,
        sortOrder: sortedInfo.columnKey === 'type' && sortedInfo.order,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: '20%',
        render: (text, record) => (
          <span>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={() => this.onStatusUpdate(record)}>{record.status === 'active' ? 'Deactivate' : 'Activate'}</a>
            <Divider type="vertical" />
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={() => this.onEdit(record)}>Edit</a>
            <Divider type="vertical" />
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={() => this.onDelete(record._id)}>Delete</a>
          </span>
        ),
      },
    ]


    const type = [
      { name: "All", id: "" },
      { name: "Objective", id: "objective" },
      { name: "Subjective", id: "subjective" },
    ];

    const rows = [
      { name: '10', id: 10 },
      { name: '25', id: 25 },
      { name: '50', id: 50 },
      { name: '100', id: 100 },
    ]

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <HubContent className="no-pd">
        {this.state.loading && <Loading />}
        <div className="row d-flex align-items-center  mb-2">
          <SelectBox
            className="col-md-3 "
            data={type}
            onChange={this.onChangeFiltering}
            field="type"
            defaultValue=""
            label="Type"
            labelClass="col-sm-1"
          />
          <SelectBox
            className="col-md-2"
            data={rows}
            onChange={({ rows }) => this.setState({ pageSize: rows })}
            field="rows"
            defaultValue={this.state.pageSize}
            label="Rows"
            labelClass="col-sm-1"
          />
          <div className="col-md-2">
            {selectedRowKeys.length > 0 &&
              <button
                className="btn btn-primary btn-md waves-effect waves-light w-100"
                onClick={this.deleteMultiple}
              >Delete</button>
            }
          </div>

          {/* <InputBox
            className="col-md-6 float-right"
            onChange={this.onChangeSearch}
            field="search"
            placeholder="Search"
          /> */}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card m-b-20">
              {this.state.results
                ? <Table
                  dataSource={this.state.results}
                  columns={columns}
                  rowSelection={rowSelection}
                  onChange={this.handleChange}
                  pagination={{ pageSize: this.state.pageSize }}
                />
                : <Loading type="flat" />
              }
            </div>
          </div>
        </div>
      </HubContent>
    );
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(Processes);