import React, { Component } from 'react';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

class Statistical extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: [
            // [new Date(2020, 6, 5).getTime(), 302.95],
            // [new Date(2020, 6, 1).getTime(), 300.95],
            // [new Date(2020, 6, 2).getTime(), 320.95],
            // [new Date(2020, 6, 3).getTime(), 310.95],
            // [new Date(2020, 6, 4).getTime(), 280.95],
            // [new Date(2020, 6, 5).getTime(), 302.95],
            [new Date(2020, 7, 1).getTime(), 300.95],
            [new Date(2020, 7, 2).getTime(), 320.95],
            [new Date(2020, 7, 3).getTime(), 310.95],
            [new Date(2020, 7, 4).getTime(), 280.95],
            [new Date(2020, 7, 5).getTime(), 322.95],
            [new Date(2020, 8, 1).getTime(), 300.95],
            [new Date(2020, 8, 2).getTime(), 320.95],
            [new Date(2020, 8, 3).getTime(), 210.95],
            [new Date(2020, 8, 4).getTime(), 280.95],
            [new Date(2020, 8, 5).getTime(), 202.2],
            [new Date(2020, 9, 1).getTime(), 200.2],
            [new Date(2020, 9, 2).getTime(), 220.2],
            [new Date(2020, 9, 3).getTime(), 310.2],
            [new Date(2020, 9, 4).getTime(), 290.2],
            [new Date(2020, 9, 5).getTime(), 200.95],
          ],
        },
      ],
      options: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          height: 350,
          zoom: {
            autoScaleYaxis: true,
          },
        },
        annotations: {
          yaxis: [
            {
              y: 30,
              borderColor: '#999',
              label: {
                show: true,
                text: 'Support',
                style: {
                  color: '#fff',
                  background: '#00E396',
                },
              },
            },
          ],
          xaxis: [
            {
              x: new Date().getTime(),
              borderColor: '#999',
              yAxisIndex: 0,
              label: {
                show: true,
                text: 'Rally',
                style: {
                  color: '#fff',
                  background: '#775DD0',
                },
              },
            },
          ],
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          min: new Date().getTime(),
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
      },

      selection: 'one_year',
    };
  }

  updateData(timeline) {
    this.setState({
      selection: timeline,
    });
    switch (timeline) {
      case 'one_month':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date().getTime(),
          new Date().getTime(),
        );
        break;
      case 'six_months':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date().setMonth(new Date().getMonth() - 6),
          new Date().getTime(),
        );
        break;
      case 'one_year':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date().setFullYear(new Date().getFullYear() - 1),
          new Date().getTime(),
        );
        break;
      case 'ytd':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date('01 Jan 2013').getTime(),
          new Date('27 Feb 2013').getTime(),
        );
        break;
      case 'all':
        ApexCharts.exec(
          'area-datetime',
          'zoomX',
          new Date('23 Jan 2012').getTime(),
          new Date('27 Feb 2013').getTime(),
        );
        break;
      default:
    }
  }

  render() {
    var d = new Date();
    console.log(new Date().setMonth(new Date().getMonth() - 6));
    return (
      <div id="chart">
        <div className="toolbar">
          <button
            id="one_month"
            onClick={() => this.updateData('one_month')}
            className={this.state.selection === 'one_month' ? 'active' : ''}
          >
            1M
          </button>
          &nbsp;
          <button
            id="six_months"
            onClick={() => this.updateData('six_months')}
            className={this.state.selection === 'six_months' ? 'active' : ''}
          >
            6M
          </button>
          &nbsp;
          <button
            id="one_year"
            onClick={() => this.updateData('one_year')}
            className={this.state.selection === 'one_year' ? 'active' : ''}
          >
            1Y
          </button>
          &nbsp;
          <button
            id="ytd"
            onClick={() => this.updateData('ytd')}
            className={this.state.selection === 'ytd' ? 'active' : ''}
          >
            YTD
          </button>
          &nbsp;
          <button
            id="all"
            onClick={() => this.updateData('all')}
            className={this.state.selection === 'all' ? 'active' : ''}
          >
            ALL
          </button>
        </div>

        <div id="chart-timeline">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    );
  }
}

export default Statistical;
