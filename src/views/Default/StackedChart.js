import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const StackedChart = (props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Question Count',
        data: [props.data.Total_Que_Count]
      },
      {
        name: 'Positive Response',
        data: [props.data.Positive_Count]
      },
      {
        name: 'Negative Response',
        data: [props.data.Negative_Count]
      },
      {
        name: 'Questions Model Dont know',
        data: [props.data.count_questions_dont_know]
      },
      {
        name: 'Unique Users',
        data: [props.data.unique_users]
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        }
      },
      xaxis: {
        type: 'datetime',
        categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT', '01/05/2011 GMT', '01/06/2011 GMT']
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    }
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default StackedChart;
