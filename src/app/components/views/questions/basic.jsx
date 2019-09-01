import React from 'react';
import { connect } from 'react-redux';
import HubContent, { SelectBox, Loading } from '../../../../core/components';
import { FetchQuestion, UpdateStatus, DeleteQuestion, DeleteMultiple } from '../../../redux';
import { serialize } from '../../../../core/lib/serializer';
import { Table, Tag, Divider } from 'antd';
import { formatStatus } from './questionFn';

const category = 'basic';

class Basic extends React.Component {
  state = {
    results: null,
    filterParams: { category: category },
    selectedRowKeys: [],
    selectedItems: [],
    loading: false,
    sortedInfo: null,
    pageSize: 100
  }

  async componentDidMount() {
    this.getBasicQuestion();
  }

  getBasicQuestion = async () => {
    const query = await serialize(this.state.filterParams)
    try {
      const results = await this.props.FetchQuestion(query);
      this.setState({ results })
    } catch (e) {
      this.setState({
        error: e
      })
    } finally {
      this.setState({ loading: false })
    }
  }

  pageChange = () => {

  }

  onDelete = async (id) => {
    let action = window.confirm("Do you want to delete?")
    if (action) {
      await this.props.DeleteQuestion(id)
      this.getBasicQuestion();
    }
  }

  onEdit = (data) => {
    this.props.history.push('/question/edit-question/' + data._id, data)
  }


  onStatusUpdate = async (data) => {
    let status = data.status === 'active' ? 'deactive' : 'active';
    try {
      const result = await this.props.UpdateStatus({ ...data, status });
      if (result) {
        this.getBasicQuestion();
      }
    } catch (e) {
      this.setState({
        error: e
      })
    }
  }

  onChangeFiltering = async (value) => {
    this.setState({ loading: true })
    await this.setState((prevState) => {
      Object.assign(prevState.filterParams, value)
    })
    this.getBasicQuestion();
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys
    });
  }

  deleteMultiple = async  e => {
    e.preventDefault();
    this.setState({ loading: true })
    let items = [];
    // eslint-disable-next-line no-unused-vars
    for (let key of this.state.selectedRowKeys) {
      items.push(this.state.results[key]);
    }
    // this.setState({ selectedItems: items })

    try {
      await this.props.DeleteMultiple(items);
      this.getBasicQuestion();
    } catch (e) {
      // console.log(e)
    } finally {
      this.setState({ loading: false, selectedRowKeys: [] })
    }

  }

  onChangeSearch = ({ search }) => {

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
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => a.status.length - b.status.length,
        sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
        width: '10%',
        render: (text, record) => {
          let color = record.status === 'active' ? 'green' : 'volcano'
          return (
            <span>
              <Tag color={color}>{formatStatus(record.status)}</Tag>
            </span>
          )
        }
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
        {/* {this.state.loading && <Loading />} */}
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
              {this.props.questions
                ? <Table
                  dataSource={this.props.questions}
                  columns={columns}
                  rowSelection={rowSelection}
                  onChange={this.handleChange}
                  pagination={{ pageSize: this.state.pageSize }}
                  loading={this.state.loading}
                  scroll={{ x: 1000 }}

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
  questions: state.questions[category]
})

const mapDispatchToProps = dispatch => ({
  FetchQuestion: (query) => dispatch(FetchQuestion(query)),
  UpdateStatus: (payload) => dispatch(UpdateStatus(payload)),
  DeleteQuestion: (id) => dispatch(DeleteQuestion(id)),
  DeleteMultiple: (items) => dispatch(DeleteMultiple(items))
  // UpdateQuestion: (payload) => dispatch(UpdateQuestion(payload))
})


export default connect(mapStateToProps, mapDispatchToProps)(Basic);