// material-ui
import { Divider, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, padding } from '@mui/system';
import PropTypes from 'prop-types';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Authorization } from './Components/Authorization';
import { Headers } from './Components/Headers';
import KeyValueTable from './Components/Params';
import { Body } from './Components/Body';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Resizable } from 're-resizable';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setGenraetedTest } from 'store/postman';
import { useEffect } from 'react';
import TestResults from './Components/TestResults';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#00cca5'
    }
  }
});
const baseUrl = 'http://127.0.0.1:5000';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
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
function a11yProps1(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const SamplePage = () => {
  const [url, setUrl] = useState('');
  const [value, setValue] = useState(0); // Add this line to initialize the 'value' state
  const [value1, setValue1] = useState(0);
  const [requestType, setRequestType] = useState('GET');
  const [isResponseRecived, setIsResponseRecived] = useState(true);
  const [genTests, setGenTests] = useState(true);
  const bodydata = useSelector((state) => state.automation.bodyContent);
  const contentType = useSelector((state) => state.automation.bodyContentType);
  const headerData = useSelector((state) => state.automation.headerData);
  const paramsdata = useSelector((state) => state.automation.paramsdata);
  const authorization = useSelector((state) => state.automation.authToken);
  const test_code = useSelector((state) => state.automation.genratedTest);
  const [testResults, seTestResults] = useState(null);
  const [testResultsLists, seTestResultsLists] = useState({ errors: [], failed_tests: [], success_tests: [] });
  const [height, setHeight] = useState('38vh');
  const [responseBody, setResponseBody] = useState('Response');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const handleSend = async () => {
    let content_type;
    let request_body;
    if (contentType === 1) {
      content_type = 'form-data';
    } else {
      content_type = bodydata.raw.type;
      request_body = bodydata.raw.data;
      console.log(bodydata.raw.data);
    }
    console.log(content_type);
    let fromData = bodydata.fromData;
    let selectedFormData = fromData.filter((item) => item.selected);
    let selectedHeadersdata = headerData.filter((item) => item.selected);
    let selectedparams = paramsdata.filter((item) => item.selected);
    let param_keys = selectedparams.map((item) => item.key);
    let param_values = selectedparams.map((item) => item.value);
    let header_keys = selectedHeadersdata.map((item) => item.key);
    let header_values = selectedHeadersdata.map((item) => item.value);
    let form_keys = selectedFormData.map((item) => item.key);
    let form_types = selectedFormData.map((item) => item.type);
    let form_values = selectedFormData.map((item) => (item.type === 'text' ? item.value : item.file));
    let resp;
    try {
      resp = await axios.post(`${baseUrl}/explore_api_and_generate_test`, {
        api_url: url,
        http_method: requestType,
        content_type: 'json',
        form_keys,
        form_types,
        form_values,
        header_keys,
        header_values,
        param_keys,
        param_values,
        Authorization: authorization,
        request_body
      });
      console.log(resp);
      dispatch(setGenraetedTest(resp.data.test_code));
      setResponseBody(resp.data.code_content);
      seTestResultsLists(resp.data.results);
    } catch (e) {
      console.log(e);
    }
    console.log(testResultsLists);
  };
  const runTest = async () => {
    try {
      const response = await axios.post(`${baseUrl}/run_test`);
      seTestResults(response.data);
    } catch (error) {
      console.error('Error making the request:', error);
      // Handle error as needed
    }
  };
  const handleChangeType = (event) => {
    setRequestType(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };
  const getColorForOption = (selectedOption) => {
    switch (selectedOption) {
      case 'GET':
        return 'green';
      case 'POST':
        return 'orange';
      case 'PUT':
        return 'blue';
      case 'PATCH':
        return 'purple';
      case 'DELETE':
        return 'red';
      default:
        return 'black'; // Default color
    }
  };
  useEffect(() => { }, [height]);
  const openInNewWindow = (htmlContent) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    } else {
      alert('Your browser blocked the pop-up window. Please allow pop-ups for this site.');
    }
  };

  return (
    <MainCard style={{ position: 'relative' }}>
      <Stack direction="row">
        <select
          value={requestType}
          onChange={handleChangeType}
          style={{
            width: '10%',
            height: '6vh',
            borderRight: 'none',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: '5px 0px 0px 5px',
            fontWeight: '600',
            border: '1px solid #787878',
            color: getColorForOption(requestType) // Function to get color based on the selected value
          }}
        >
          <option value="GET" style={{ color: 'green', fontWeight: '600' }}>
            GET
          </option>
          <option value="POST" style={{ color: 'orange', fontWeight: '600' }}>
            POST
          </option>
          <option value="PUT" style={{ color: 'blue', fontWeight: '600' }}>
            PUT
          </option>
          <option value="PATCH" style={{ color: 'purple', fontWeight: '600' }}>
            PATCH
          </option>
          <option value="DELETE" style={{ color: 'red', fontWeight: '600' }}>
            DELETE
          </option>
        </select>

        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter Url"
          style={{
            width: '76%',
            height: '6vh',
            borderLeft: 'none',
            outline: 'none',
            borderRadius: '0px 5px 5px 0px',
            paddingLeft: '15px', // Adjust the left padding as needed
            border: '1px solid #787878'
          }}
        />

        <Button
          sx={{
            width: '10%',
            backgroundColor: '#00cca5',
            height: '6vh',
            borderRadius: '4px',
            boxSizing: 'border-box',
            marginLeft: '2vh',
            '&:hover': {
              backgroundColor: '#008e72' // Change the color on hover
            }
          }}
          variant="contained"
          onClick={handleSend}
        >
          Send
        </Button>
      </Stack>
      <Resizable
        enable={{
          top: false,
          right: false,
          bottom: true,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false
        }}
        handleClasses={{
          bottom: 'pointer-events-none'
        }}
        minHeight={51}
        onResize={(e, direction, ref, d) => {
          setHeight(`calc(${ref.style.height} - 40px)`);
        }}
      >
        <ThemeProvider theme={Theme}>
          <Box
            sx={{
              width: '100%',
              height: { height }
            }}
          >
            <Box sx={{ marginLeft: '0.7%', borderBottom: 1, borderColor: 'divider', padding: '10', width: '97%' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab sx={{ padding: '2vh', fontSize: '12px' }} label="Params" {...a11yProps(0)} />
                <Tab sx={{ padding: '2vh', fontSize: '12px' }} label="Authorization" {...a11yProps(1)} />
                <Tab sx={{ padding: '2vh', fontSize: '12px' }} label="Headers" {...a11yProps(2)} />
                <Tab sx={{ padding: '2vh', fontSize: '12px' }} label="Body" {...a11yProps(3)} />
                <Tab sx={{ padding: '2vh', fontSize: '12px' }} label="Tests" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel sx={{ padding: '0px' }} value={value} index={0}>
              <KeyValueTable
                setUrl={setUrl}
                url={url}
                onSelectedParamsChange={(selectedParams) => setAppendedata(selectedParams)}
                height={height}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Authorization height={height}></Authorization>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Headers height={height}></Headers>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3} style={{ height: '35vh' }}>
              <Body height={height}></Body>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button onClick={runTest} className="genrate_button">
                  Run Test
                </button>
              </div>

              <textarea
                value={test_code}
                style={{ width: '97%', height: height, border: 'none', outline: 'none', resize: 'none' }}
                placeholder="Enter raw data"
              ></textarea>
            </CustomTabPanel>
          </Box>
        </ThemeProvider>
      </Resizable>
      <Divider sx={{ marginLeft: '0.7%', width: '97%' }}></Divider>
      <Paper sx={{ position: 'relative' }}>
        <ThemeProvider theme={Theme}>
          <Box sx={{ marginLeft: '0.7%', width: '97%', height: '100%', position: 'relative', bottom: '0' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value1} onChange={handleChange1} aria-label="basic tabs example">
                <Tab sx={{ padding: '2vh', fontSize: '12px' }} label="Body" {...a11yProps1(0)} />
                <Tab sx={{ padding: '2vh', fontSize: '12px' }} label="Header" {...a11yProps1(1)} />
                <Tab sx={{ padding: '2vh', fontSize: '12px' }} label="Test Results" {...a11yProps1(2)} />
                <Tab sx={{ padding: '2vh', fontSize: '12px' }} label="Test Summery" {...a11yProps1(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value1} index={0}>
              <p style={{ whiteSpace: 'pre-wrap' }}>{responseBody}</p>
            </CustomTabPanel>
            <CustomTabPanel value={value1} index={1}>
              Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value1} index={2}>
              <TestResults testResultsLists={testResultsLists}></TestResults>
            </CustomTabPanel>
            <CustomTabPanel value={value1} index={3}>
              <button
                onClick={() => {
                  openInNewWindow(testResults);
                }}
                className="genrate_button"
              >
                Display summery
              </button>
            </CustomTabPanel>
          </Box>
        </ThemeProvider>
      </Paper>
    </MainCard>
  );
};

export default SamplePage;
