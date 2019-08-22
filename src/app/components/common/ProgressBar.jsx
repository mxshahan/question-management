import React, { Component } from 'react';
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import NumberFormat from 'react-number-format';

class ProgressComponent extends Component {
  render() {
    return (
      <div
        className={this.props.className ? this.props.className : 'col-sm-4'}
      >
        <div className="card m-b-30">
          <div className="card-body">
            <h4 className="mt-0 header-title">{this.props.title}</h4>
            <div id="donut-chart">
              <div id="donut-chart-container" className="">
                <div className="row">
                  <div className="col-md-12">
                    <div className="float-left">Other publishers:</div>
                    <div className="float-right">
                      <NumberFormat
                        value={
                          this.props.other_value &&
                          this.props.other_value.toFixed(this.props.isRounded ? 0 : 2)
                        }
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <Progress
                      percent={this.props.other_percentage}
                      showInfo={false}
                      strokeColor="#8d83c8"
                    />
                  </div>
                </div>
              </div>

              <div id="donut-chart-container" className="">
                <div className="row">
                  <div className="col-md-12">
                    <div className="float-left">
                      {this.props.publication_name}:
                    </div>
                    <div className="float-right">
                      <NumberFormat
                        value={
                          this.props.pub_value &&
                          this.props.pub_value.toFixed(this.props.isRounded ? 0 : 2)
                        }
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <Progress
                      strokeColor="#4ac2e6"
                      percent={this.props.publication_percentage}
                      showInfo={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <h4 className="mt-0 header-title">{this.props.title_bottom}</h4>
          </div>
        </div>
      </div>
    )
  }
}
export const ProgressBar = ProgressComponent;