import React from 'react';
import HubContent from '../../../../core/components';
import Histogram from '../../partials/Chart';
import { DBCard } from '../../../../core/components/common';

class HubDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      org: [
        {
          label: 'Select',
        },
        {
          label: 'Publisher',
          value: 1
        },
        {
          label: 'University',
          value: 2
        },
        {
          label: 'User',
          value: 3
        }
      ],
      deal: [
        {
          label: 'Select Deals',
        },
        {
          label: 'OA Deal',
          value: 2
        },
        {
          label: 'Non OA Deal',
          value: 3
        }
      ],
      ins: [
        {
          label: 'Select Institute',
        },
        {
          label: 'Publisher',
          value: 1
        },
        {
          label: 'University',
          value: 2
        },
        {
          label: 'User',
          value: 3
        }
      ],
      year: [
        {
          label: 'Select Years',
          value: 1
        },
        {
          label: '2018',
          value: 2
        },
        {
          label: '2019',
          value: 3
        }
      ],
    }
  }
  render() {
    let card_body = ['£ 950,000.00', '$ 300,000.00 ', '€ 300,500.00'];
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