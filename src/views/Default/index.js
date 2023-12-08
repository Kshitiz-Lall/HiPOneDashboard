import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { gridSpacing } from 'store/constant';
import ColumnChart from './ColumnChart';
import ContactUsTable from './ContactUsTable';
import ConversationTable from './ConversationTable';
import MultiLineChart from './MultiLineChart';
import RadialBarChart from './RadialBarChart';
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

  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get('https://convwebsite-dev.genzeon.com/send_info_dashboard')
      .then((response) => {
        const data = response.data;
        setDashboardData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
              >
                <ShareIcon fontSize="12px" />
                &nbsp;Share
              </Button>
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
              >
                <PrintIcon fontSize="12px" />
                &nbsp;Print
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#0044CC',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#0000AF'
                  }
                }}
              >
                <SystemUpdateAltIcon fontSize="12px" />
                &nbsp;Export
              </Button>
            </div>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item lg={2} md={4} sm={6} xs={12} sx={{ marginRight: '30px' }}>
                      <Card sx={{ minWidth: 275, background: 'inherit' }}>
                        <CardContent>
                          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                            Response Generated
                          </Typography>
                          <Typography variant="h3" component="div">
                            <CountUp end={dashboardData.Total_Que_Count} duration={5} />
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item lg={2} md={4} sm={6} xs={12} sx={{ marginRight: '30px' }}>
                      <Card sx={{ minWidth: 275, background: 'inherit' }}>
                        <CardContent>
                          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                            Positive Response
                          </Typography>
                          <Typography variant="h3" component="div">
                            <CountUp end={dashboardData.Positive_Count} duration={5} />
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item lg={2} md={4} sm={6} xs={12} sx={{ marginRight: '30px' }}>
                      <Card sx={{ minWidth: 275, background: 'inherit' }}>
                        <CardContent>
                          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                            Negative Response
                          </Typography>
                          <Typography variant="h3" component="div">
                            <CountUp end={dashboardData.Negative_Count} duration={5} />
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item lg={2} md={4} sm={6} xs={12} sx={{ marginRight: '30px' }}>
                      <Card sx={{ minWidth: 275, background: 'inherit' }}>
                        <CardContent>
                          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                            Total Questions Dont Know
                          </Typography>
                          <Typography variant="h3" component="div">
                            <CountUp end={dashboardData.count_questions_dont_know} duration={5} />
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item lg={2} md={4} sm={6} xs={12} sx={{ marginRight: '30px' }}>
                      <Card sx={{ minWidth: 275, background: 'inherit' }}>
                        <CardContent>
                          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                            Total Unique Users
                          </Typography>
                          <Typography variant="h3" component="div">
                            <CountUp end={dashboardData.unique_users} duration={5} />
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={10}>
                  {/* <StackedChart data={dashboardData} /> */}
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
                  {/* <TotalGrowthBarChart isLoading={isLoading} dashboardData={dashboardData} /> */}
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
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
