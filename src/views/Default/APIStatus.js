import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LoadingButton } from '@mui/lab';
import { Accordion, AccordionDetails, AccordionSummary, Chip, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Common.css';

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#142952'
};

const generateRandomData = (startDate, endDate) => {
  const days = (endDate - startDate) / (24 * 60 * 60 * 1000);
  const randomData = [];

  for (let i = 0; i <= days; i++) {
    const currentDate = new Date(startDate.getTime() + i * (24 * 60 * 60 * 1000));
    const randomCount = Math.floor(Math.random() * 10); // Adjust the range as needed
    randomData.push({ date: currentDate.toISOString().split('T')[0], count: randomCount });
  }

  return randomData;
};

const data = [
  {
    name: 'Dashboard API',
    endpoint: 'https://convwebsite-dev.genzeon.com/send_info_dashboard',
    logDetails: 'Log details for API 1',
    heatmapData: generateRandomData(new Date('2023-01-01'), new Date('2023-12-31'))
  },
  {
    name: 'Conversation API',
    endpoint: 'https://convwebsite-dev.genzeon.com/get_dashboard_data',
    logDetails: 'Log details for API 2',
    heatmapData: generateRandomData(new Date('2023-01-01'), new Date('2023-12-31'))
  },
  {
    name: 'Contact us API',
    endpoint: 'https://convwebsite-dev.genzeon.com/get_feedback_data',
    logDetails: 'Log details for API 3',
    heatmapData: generateRandomData(new Date('2023-01-01'), new Date('2023-12-31'))
  }
];

console.log(data);

function getCurrentYear() {
  return new Date().getFullYear().toString();
}

function APIStatus() {
  const currentYear = getCurrentYear();

  const [apiData, setApiData] = useState(data);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const updatedApiData = await Promise.all(
        apiData.map(async (api) => {
          try {
            const response = await fetch(api.endpoint);
            if (response.status === 200) {
              return { ...api, status: 'Active' };
            } else {
              return { ...api, status: 'Inactive' };
            }
          } catch (error) {
            return { ...api, status: 'Inactive' };
          }
        })
      );
      setApiData(updatedApiData);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = async () => {
    try {
      setLoading(true);
      const updatedApiData = await Promise.all(
        apiData.map(async (api) => {
          try {
            const response = await fetch(api.endpoint);
            if (response.status === 200) {
              return { ...api, status: 'Active' };
            } else {
              return { ...api, status: 'Inactive' };
            }
          } catch (error) {
            return { ...api, status: 'Inactive' };
          }
        })
      );
      setApiData(updatedApiData);
      toast.success('APIs fetched successfully');
    } catch (error) {
      toast.error('Error updating API status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set interval to refresh API data every 30 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 30 * 60 * 1000); // 30 minutes in milliseconds

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that this effect runs once on mount

  return (
    <>
      <br />
      <Typography variant="h5" style={titleStyle}>
        API Status Details
      </Typography>
      <br />
      <Paper>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <LoadingButton onClick={handleUpdateClick} loading={loading} variant="outlined" color="secondary" sx={{ margin: 2 }}>
          Update API Status
        </LoadingButton>
        {apiData.map((api) => (
          <Accordion key={api.name}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ alignItems: 'center' }}>
              <Chip label={api.status} sx={{ margin: 1, padding: 1 }} color={api.status === 'Active' ? 'success' : 'error'} />
              <Typography variant="h4" sx={{ margin: 1, flexGrow: 1, padding: 1 }}>
                {api.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <strong>API Link:</strong> {api.endpoint}
                <br />
                <strong>Heatmap Tracker :</strong>
                <br />
                <CalendarHeatmap
                  startDate={new Date(`${currentYear}-01-01`)}
                  endDate={new Date(`${currentYear}-12-31`)}
                  values={api.heatmapData.map((entry) => ({
                    ...entry,
                    tooltipData: `${entry.date}: ${entry.count}`
                  }))}
                  classForValue={(value) => (value && value.count > 0 ? 'color-green' : 'color-red')}
                  titleForValue={(value) => (value ? value.tooltipData : null)}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </>
  );
}

export default APIStatus;
