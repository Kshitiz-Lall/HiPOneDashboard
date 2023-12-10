import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LoadingButton } from '@mui/lab';
import { Accordion, AccordionDetails, AccordionSummary, Chip, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const data = [
  {
    name: 'Dashboard API',
    endpoint: 'https://convwebsite-dev.genzeon.com/send_info_dashboard',
    logDetails: 'Log details for API 1',
    heatmapData: [
      { date: '2023-01-01', count: 3 },
      { date: '2023-01-02', count: 6 }
      // Add more data as needed
    ]
  },
  {
    name: 'Conversation API',
    endpoint: 'https://convwebsite-dev.genzeon.com/get_dashboard_data',
    logDetails: 'Log details for API 2',
    heatmapData: [
      // Add heatmap data for Conversation API
    ]
  },
  {
    name: 'Contact us API',
    endpoint: 'https://convwebsite-dev.genzeon.com/get_feedback_data',
    logDetails: 'Log details for API 3',
    heatmapData: [
      // Add heatmap data for Contact us API
    ]
  }
];

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

  const handleUpdateClick = () => {
    fetchData();
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
    <Paper>
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
              <strong>Log Details:</strong> {api.logDetails}
              <br />
              <CalendarHeatmap
                startDate={new Date(`${currentYear}-01-01`)}
                endDate={new Date(`${currentYear}-12-31`)}
                values={api.heatmapData.map((entry) => ({
                  ...entry,
                  tooltipData: `${entry.date}: ${entry.count}`
                }))}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
}

export default APIStatus;
