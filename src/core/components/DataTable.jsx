import React from 'react';
import { TableContext } from '../context';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import uuidv1 from 'uuid/v1';

class Table extends TableContext {
  constructor(props) {
    super(props);
    this.data = props.data;
  }
  state = {
    rnd: false,
    isGoing: true,
    checkObj: {}
  }


  toTitleCase = (str) => {
    return str.replace(/_/g, ' ').charAt(0).toUpperCase() + str.replace(/_/g, ' ').substr(1).toLowerCase();
  }
  onChange = (e) => {
    this.setState((prevState) => {
      Object.assign(prevState.checkObj, { [e.target.name]: e.target.checked })
    })
    this.setState({
      checkObj: this.state.checkObj
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onChangePagination = (pageNumber) => {
    console.log('Page: ', pageNumber);
    this.props.pageChange(pageNumber);
  }

  render() {
    // function numberWithCommas(x) {
    //   var parts = x.toString().split(".");
    //   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //   return parts.join(".");
    // }
    let { wrap } = this.props;

    return (
      // dt-responsive for responsive. Will added later
      this.props.heading ?
        <div>
          <table id="datatable-buttons" className={"table table-striped" + (!wrap ? " nowrap" : "")} style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
            <thead className="text-white thead-dark">
              <tr>
                {this.props.heading.map((head, key) => {
                  return <th key={key} style={{ width: wrap && (head === 'title' || head === 'article_title') ? '35%' : 'auto' }}>{this.toTitleCase(head.replace('_', ' ')).replace(/Vat|Oa/gi, function (x) {
                    return x.toUpperCase();
                  }).replace(/Deposit/gi, "Deposited").replace(/Token id/gi, "Token ID").replace(/Article id/gi, "Article ID").replace(/Currency name/gi, "Currency")}</th>
                })}
                {!this.props.noAction && <th>Action</th>}
                {this.props.checkbox && <th>Select</th>}
              </tr>
            </thead>

            <tbody>
              {this.props.data.map((data, i) => {
                return (
                  <tr key={uuidv1(data._id)}>
                    {this.props.heading.map((head, key) => {
                      if (typeof data[head] !== "object") {
                        return <td key={head}>{data[head] ? data[head] : "-"}</td>
                      } else {
                        return (
                          <td key={head}>
                            {data[head]
                              ? JSON.stringify(data[head])
                              : '-'}
                          </td>
                        )
                      }
                    })}
                    {!this.props.noAction &&
                      <td className="text-right" >
                        {this.props.onStatusUpdate && <React.Fragment>
                          <span
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              this.props.onStatusUpdate && this.props.onStatusUpdate(data);
                            }}
                            title="Edit"
                            style={{ textDecoration: 'underline' }}
                          >
                            {data.status === 'active' ? 'Deactive' : 'Active'}
                          </span>
                          {" | "}
                        </React.Fragment>
                        }
                        <span
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            this.props.onEdit && this.props.onEdit(data._id, data);
                          }}
                          title="Edit"
                          style={{ textDecoration: 'underline' }}
                        >
                          Edit
                        </span>
                        {" | "}
                        <span
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            this.props.onDelete && this.props.onDelete(data._id);
                          }}
                          id="deleteBtn"
                          title="Delete"
                          style={{ textDecoration: 'underline' }}
                        >
                          Delete
                        </span>
                      </td>}

                    {this.props.checkbox &&
                      <td>
                        <p style={{ textAlign: 'center' }}>
                          <Checkbox
                            checked={this.state.checkObj ? this.state.checkObj['selected' + data._id] : false}
                            disabled={this.state.disabled}
                            name={'selected' + data._id}
                            onChange={this.onChange}
                            ref={'ref' + data._id}
                            value={data._id}
                            onClick={() => {
                              this.props.onSelect && this.props.onSelect(data._id);
                            }}
                          >
                          </Checkbox>
                        </p>
                      </td>
                    }

                  </tr>)
              })}
            </tbody>
          </table>
          {this.props.count && <Pagination
            style={{ marginTop: 10, marginBottom: 20, textAlign: 'center' }}
            onChange={this.onChangePagination}
            pageSize={this.props.pageSize || 10}
            total={this.props.count || undefined}
          />}
        </div> :
        <div className="card">
          <div className="card-body">
            No Data Found
          </div>
        </div>
    )
  }
}

Table.propTypes = {
  heading: PropTypes.array,
  data: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onStatusUpdate: PropTypes.func,
  count: PropTypes.number,
  pageChange: PropTypes.func,
  pageSize: PropTypes.number
}

export const DataTable = Table
