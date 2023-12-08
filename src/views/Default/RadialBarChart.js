import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RadialBarChart = ({ totalQueCount, Positive_Count, Negative_Count }) => {
  const isPercentage = false;
  let total = totalQueCount + Positive_Count + Negative_Count;
  const chartData = {
    series: [total], // Use the prop value passed from HIPOneDashboard
    options: {
      chart: {
        background: 'inherit',
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -6,
              show: true,
              color: '#111',
              fontSize: '10px'
            },
            value: {
              color: '#111',
              fontSize: '24px',
              offsetY: 12,
              show: true,
              formatter: function (val) {
                return isPercentage ? val + '%' : val;
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['All Generated Response'] // Two separate labels
    }
  };

  return (
    <div id="card">
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="radialBar" height={195} />
      </div>
    </div>
  );
};

export default RadialBarChart;
