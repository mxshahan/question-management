import React, { Component } from 'react';
import { Doughnut, Pie, Bar, HorizontalBar } from 'react-chartjs-2';
class Chart extends Component {

  render() {
    let { type, title, labels, data, colors, rotation, circumference, isShowLabel } = this.props;

    let options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        fullWidth: true,
        position: 'right',
        reverse: false,
        boxWidth: 50,
        labels: {
          boxWidth: 10,
          fontSize: 12,
          padding: 5,
        }
      },
      tooltips: {
        enabled: true,
        labelColor: 'blue',
        labelTextColor: 'yellow'
      },
    }

    let chartData = {};
    if (type === 'stacked-bar') {
      chartData = {
        labels: labels || [],
        datasets: data
      };
    } else {
      chartData = {
        labels: labels || [],
        datasets: [
          {
            data: data || [33.33, 33, 33.33],
            backgroundColor: colors || [
              'rgba(129, 119, 194, .9)',
              'rgba(40, 187, 227, 0.9)',
              'rgba(235, 239, 242, 0.9)'
            ]
          }
        ]
      };
    }
    

    let total = 0, msg = false;
    data.map((d) => {
      return total += Number(d)
    })

    if(total === 0) {
      // msg = "No data available"
    }

    if (rotation && circumference) {
      Object.assign(options, { rotation, circumference });
    }

    this.props.percentageThickness && Object.assign(options, {
      cutoutPercentage: this.props.percentageThickness
    })

    let chart = '';
    if (type.toLowerCase() === "doughnut") {
      chart = <Doughnut
        width={this.props.width || 334}
        height={this.props.height || 292}
        data={chartData}
        options={options}
      />
    } else if (type.toLowerCase() === "pie") {
      chart = <Pie
        width={this.props.width || 334}
        height={this.props.height || 292}
        data={chartData}
        options={options}
      />
    } else if (type.toLowerCase() === "gauge") {
      chart = <Doughnut
        width={this.props.width || 479.5}
        height={this.props.height || 200}
        data={chartData}
        options={options}
      />
    } else if (type.toLowerCase() === 'bar') {
      options.legend.display = isShowLabel;
      Object.assign(options, {
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            barThickness: 20,
            categorySpacing: 0
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true,
            },
          }]
        },
      })
      chart = <Bar
        width={this.props.width || 479.5}
        height={this.props.height || 200}
        data={chartData}
        options={options}
      />
    } else if (type.toLowerCase() === 'stacked-bar') {
      options.legend.display = isShowLabel;
      Object.assign(options, {
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false
            },
            barThickness: 20,
            categorySpacing: 0
          }],
          yAxes: [{
            stacked: true,
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true, 
              fontSize: 8, 
              minRotation: this.props.minRotation || 0,
            }
          }]
        },
      });
      
      chart = this.props.barOrientation === 'horizontal' ? <HorizontalBar
          width={this.props.width || 479.5}
          height={this.props.height || 200}
          data={chartData}
          options={options}
        /> : <Bar
          width={this.props.width || 479.5}
          height={this.props.height || 200}
          data={chartData}
          options={options}
        />
    }

    const style = {
      container: {
        height: this.props.containerHeight || 'auto',
        overflow: 'hidden'
      }
    }

    return (
      <div className={this.props.className || "col-md-6"}>
        <div className="card m-b-30" style={style.container}>
          <div className="card-body">
            <h4 className={"mt-0 header-title " + this.props.titleClass || ''}>{title}</h4>
            <div id="donut-chart">
              <div id="donut-chart-container" className="">
                {msg || chart}
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


export const DBChart = Chart;