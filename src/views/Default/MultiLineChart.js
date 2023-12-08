import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const LineChart = (props) => {
  const [dashboardChart, setDashboardChart] = useState({
    series: [
      {
        name: 'Positive Response',
        data: []
      },
      {
        name: 'Negative Response',
        data: []
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        background: '#fff'
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 4
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      title: {
        text: '+ve / -ve Feedback',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: []
      }
    }
  });

  useEffect(() => {
    // Fetch data from your API
    axios
      .get('https://convwebsite-dev.genzeon.com/get_dashboard_data')
      .then((response) => {
        const data = response.data.data;

        // Sort the data by date in ascending order
        data.sort((a, b) => new Date(a.date) - new Date(b.date));

        const datewiseData = data.reduce((acc, entry) => {
          const date = new Date(entry.date).toDateString();
          if (!acc[date]) {
            acc[date] = {
              trueCount: 0,
              falseCount: 0
            };
          }
          if (entry.feedback === true) {
            acc[date].trueCount += 1;
          } else if (entry.feedback === false) {
            acc[date].falseCount += 1;
          }
          return acc;
        }, {});

        const dates = Object.keys(datewiseData);
        const trueData = dates.map((date) => datewiseData[date].trueCount);
        const falseData = dates.map((date) => datewiseData[date].falseCount);

        // Extract only the date part from the full date string
        const formattedDates = dates.map((date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

        setDashboardChart({
          series: [
            {
              name: 'Positive Response',
              data: trueData
            },
            {
              name: 'Negative Response',
              data: falseData
            }
          ],
          options: {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              },
              background: '#fff'
            },
            dataLabels: {
              enabled: false
            },
            markers: {
              size: 4
            },
            stroke: {
              curve: 'smooth',
              width: 2
            },
            title: {
              text: '+ve / -ve Feedback',
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
              }
            },
            xaxis: {
              categories: formattedDates // Use the formatted date
            }
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={dashboardChart.options} series={dashboardChart.series} type="line" height={250} />
    </div>
  );
};

export default LineChart;
