import React from 'react';
import { HubContent } from '../../../../core/components';
import Histogram from '../../partials/Chart';
import { DBCard } from '../../../../core/components/common';

class HubDashboard extends React.Component {
  render() {
    let card_body = [];
    return (
      <HubContent title="Admin Dashboard">
        <div className="row">
          <DBCard
            icon="mdi mdi-cube-outline"
            title="OA Income"
            body={card_body}
          />
          <DBCard
            icon="mdi mdi-buffer "
            title="Deposit"
            body={card_body}
          />
          <DBCard
            icon="mdi mdi-tag-text-outline"
            title="Available funds"
            body={card_body}
          />
          <DBCard
            icon="mdi mdi-briefcase-check"
            title="Offset"
            body={card_body}
          />
        </div>
        {/* <!-- end row --> */}

        <div className="row">
          <div className="col-lg-6">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">Articles</h4>
                <div id="donut-chart">
                  <div id="donut-chart-container" className="flot-chart flot-chart-height">
                    <Histogram />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end col --> */}

          <div className="col-lg-6">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">Tokens</h4>
                <div id="pie-chart">
                  <div id="pie-chart-container" className="flot-chart flot-chart-height">
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end col --> */}
        </div>
        {/* <!-- end row --> */}
        <div className="row">
          <div className="col-lg-6">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">New OA deals</h4>
                <div className="morris-chart-height">
                  <ul className="">
                    <li className="">
                      University of Oxford
                    </li>
                    <li className="">
                      University of Reading
                    </li>
                    <li className="">
                      Bristol University
                    </li>
                    <li className="">
                      London School of Economics
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end col --> */}
          <div className="col-lg-6">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">Target</h4>
                <div id="morris-donut-example" className="morris-chart-height"></div>
              </div>
            </div>
          </div>
        </div>
      </HubContent>
    )
  }
}



export default HubDashboard