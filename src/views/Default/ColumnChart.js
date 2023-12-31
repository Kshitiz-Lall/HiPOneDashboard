import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function ColumnChart() {
  const [options, setOptions] = useState({
    series: [
      {
        name: 'Response Generated Day wise',
        data: []
      }
    ],
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: []
    },
    fill: {
      colors: ['#0044CC', '#0000AF', '#142952']
    }
  });

  useEffect(() => {
    fetch('https://convwebsite-dev.genzeon.com/get_dashboard_data')
      .then((response) => response.json())
      .then((data) => {
        data.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        const datewiseData = data.data.reduce((acc, entry) => {
          const date = new Date(entry.date).toDateString();
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date]++;
          return acc;
        }, {});
        const dates = Object.keys(datewiseData);
        const answerCounts = dates.map((date) => datewiseData[date]);

        setOptions({
          series: [
            {
              name: 'Number of Response',
              data: answerCounts
            }
          ],
          chart: {
            type: 'bar',
            height: 350
          },
          xaxis: {
            categories: dates
          },
          title: {
            text: 'Total Response Generated',
            align: 'left'
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div id="chart">
      <Chart options={options} series={options.series} type="bar" height={350} />
    </div>
  );
}

export default ColumnChart;
