import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import Chart from 'react-apexcharts';

function BarChart() {
  const [response, setResponse] = useState(null); // State to hold the API response

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const result = await axios.get('https://convwebsite-dev.genzeon.com/send_info_dashboard');
      setResponse(result.data); // Set the API response in state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  return (
    <div id="chart">
      {response && (
        <BarChart
          positiveCount={response.Positive_Count}
          negativeCount={response.Negative_Count}
          dontKnowCount={response.count_questions_dont_know}
        />
      )}
    </div>
  );
}

export default BarChart;
