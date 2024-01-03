import PrintIcon from '@mui/icons-material/Print';
import { Button, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { gridSpacing } from 'store/constant';
import APIStatus from 'views/Default/APIStatus';
import ColumnChart from './ColumnChart';
import ContactUsTable from './ContactUsTable';
import ConversationTable from './ConversationTable';
import MultiLineChart from './MultiLineChart';
import RadialBarChart from './RadialBarChart';
import Loading from './Loading';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#0044CC'
    }
  }
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    Total_Que_Count: 0,
    Positive_Count: 0,
    Negative_Count: 0,
    count_questions_dont_know: 0,
    unique_users: 0
  });
  const [loading, setLoading] = useState(true);

  const cardData = [
    {
      title: 'Response Generated',
      count: dashboardData.Total_Que_Count - 1,
      duration: 1
    },
    {
      title: 'Positive Response',
      count: dashboardData.Positive_Count,
      duration: 2
    },
    {
      title: 'Negative Response',
      count: dashboardData.Negative_Count,
      duration: 2
    },
    {
      title: 'Total Questions Dont Know',
      count: dashboardData.count_questions_dont_know,
      duration: 2
    },
    {
      title: 'Total Unique Users',
      count: dashboardData.unique_users,
      duration: 2
    }
  ];

  useEffect(() => {
    setLoading(true);

    axios
      .get('https://convwebsite-dev.genzeon.com/send_info_dashboard')
      .then((response) => {
        const data = response.data;

        setDashboardData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', flexDirection: 'row' }}>
            <ThemeProvider theme={Theme}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Overview" {...a11yProps(0)} />
                <Tab label="Conversation Details" {...a11yProps(1)} />
                <Tab label="Contact us Details" {...a11yProps(2)} />
                <Tab label="API Status" {...a11yProps(3)} />
              </Tabs>
            </ThemeProvider>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              <Button
                variant="outlined"
                sx={{
                  marginRight: '20px',
                  width: '20px',
                  height: '20px',
                  color: '#697586',
                  border: '0.5px solid #99BBFF',
                  '&:hover': {
                    border: '0.5px solid #0000AF'
                  }
                }}
                onClick={handlePrint}
              >
                <PrintIcon fontSize="12px" />
                &nbsp;Print
              </Button>
            </div>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {loading ? (
              <Loading />
            ) : (
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      {cardData.map((card, index) => (
                        <Grid key={index} item lg={2} md={4} sm={6} xs={12} sx={{ marginRight: '30px' }}>
                          <Card sx={{ minWidth: 275, background: 'inherit' }}>
                            <CardContent>
                              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                {card.title}
                              </Typography>
                              <Typography variant="h3" component="div">
                                <CountUp end={card.count} duration={card.duration} />
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={10}>
                  <MultiLineChart />
                </Grid>
                <Grid item xs={12} md={2}>
                  <RadialBarChart
                    totalQueCount={dashboardData.Total_Que_Count}
                    Positive_Count={dashboardData.Positive_Count}
                    Negative_Count={dashboardData.Negative_Count}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={10}>
                  <ColumnChart />
                </Grid>
                <Grid item xs={12} md={2}></Grid>
              </Grid>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ConversationTable />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <ContactUsTable />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <APIStatus />
          </CustomTabPanel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
