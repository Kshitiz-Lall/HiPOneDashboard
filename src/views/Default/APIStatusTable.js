import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Paper, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const data = [
  {
    name: 'Dashboard API',
    status: 'Active',
    details: 'https://convwebsite-dev.genzeon.com/send_info_dashboard',
    uptime: '2 hours',
    logDetails: 'Log details for API 1'
  },
  {
    name: 'Conversation API',
    status: 'Inactive',
    details: 'https://convwebsite-dev.genzeon.com/get_dashboard_data',
    uptime: 'N/A', // Set initial uptime as not available
    logDetails: 'Log details for API 2'
  },
  {
    name: 'Contact us API',
    status: 'Inactive',
    details: 'https://convwebsite-dev.genzeon.com/get_feedback_data',
    uptime: 'N/A', // Set initial uptime as not available
    logDetails: 'Log details for API 2'
  }
];

function APIStatus() {
  return (
    <Paper>
      {data.map((api) => (
        <Accordion key={api.name}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ alignItems: 'center' }}>
            <Chip label={api.status} color={api.status === 'Active' ? 'success' : 'error'} />
            <Typography variant="h4" sx={{ margin: 1, flexGrow: 1 }}>
              {api.name}
            </Typography>
            <Typography sx={{ marginRight: 2, marginTop: 1 }}>{api.uptime}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Details:</strong> {api.details}
              <br />
              <strong>Log Details:</strong> {api.logDetails}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
}

export default APIStatus;
