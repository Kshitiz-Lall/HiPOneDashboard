import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TestResults = ({ testResultsLists }) => {
  const [tabIndex, setTabIndex] = useState(0);
  console.log(testResultsLists);
  const [testResults, setTestResults] = useState({
    errors: [
      'Test if the response is in the correct format (JSON)',
      'Test if the response time is within defined limits',
      'Test if response contains expected fields'
    ],
    failed_tests: [
      'Test if the response is in the correct format (JSON)',
      'Test if the response time is within defined limits',
      'Test if response contains expected fields'
    ],
    success_tests: [
      'Test if response contains all the expected data',
      'Test if response status code is correct',
      'Test if the response is in the correct format (JSON)',
      'Test if the response time is within defined limits',
      'Test if response contains expected fields'
    ],
    summary: '5 tests run, 0 failed, 0 errored.'
  });
  return (
    <div>
      <h5>{testResults.summary}</h5>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList style={tabListStyles}>
          <Tab style={tabStyles}>All</Tab>
          <Tab style={tabStyles}>Passed</Tab>
          <Tab style={tabStyles}>Failed</Tab>
          <Tab style={tabStyles}>Error</Tab>
        </TabList>

        <TabPanel>
          {[
            ...testResults.success_tests.map((result, index) => ({
              status: 'PASS',
              content: result,
              key: index,
              color: '#00cc00'
            })),
            ...testResults.failed_tests.map((result, index) => ({
              status: 'FAIL',
              content: result,
              key: index,
              color: '#ff0000'
            })),
            ...testResults.errors.map((result, index) => ({
              status: 'ERROR',
              content: result,
              key: index,
              color: '#ff0000'
            }))
          ].map(({ status, content, key, color }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', padding: '3px' }}>
              <button
                style={{
                  height: '25px',
                  width: '45px',
                  marginRight: '5px',
                  backgroundColor: color,
                  border: 'none',
                  outline: 'none',
                  fontSize: '10px',
                  borderRadius: '4px',
                  color: 'white',
                  padding: '5px'
                }}
              >
                {status}
              </button>
              <p style={{ margin: 0, fontSize: '14px' }}>{content}</p>
            </div>
          ))}
        </TabPanel>
        <TabPanel>
          {testResults.success_tests.map((result, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '3px' }}>
              <button
                style={{
                  height: '25px',
                  width: '45px',
                  marginRight: '5px',
                  backgroundColor: '#00cc00',
                  border: 'none',
                  outline: 'none',
                  fontSize: '10px',
                  borderRadius: '4px',
                  color: 'white',
                  padding: '5px'
                }}
              >
                PASS
              </button>
              <p style={{ margin: 0, fontSize: '14px' }}>{result}</p>
            </div>
          ))}
        </TabPanel>
        <TabPanel>
          {testResults.failed_tests.map((result, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '3px' }}>
              <button
                style={{
                  height: '25px',
                  width: '45px',
                  marginRight: '5px',
                  backgroundColor: '#ff0000',
                  border: 'none',
                  outline: 'none',
                  fontSize: '10px',
                  borderRadius: '4px',
                  color: 'white',
                  padding: '5px'
                }}
              >
                PASS
              </button>
              <p style={{ margin: 0, fontSize: '14px' }}>{result}</p>
            </div>
          ))}
        </TabPanel>
        <TabPanel>
          {testResults.errors.map((result, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '3px' }}>
              <button
                style={{
                  height: '25px',
                  width: '45px',
                  marginRight: '5px',
                  backgroundColor: '#ff0000',
                  border: 'none',
                  outline: 'none',
                  fontSize: '10px',
                  borderRadius: '4px',
                  color: 'white',
                  padding: '5px'
                }}
              >
                ERROR
              </button>
              <p style={{ margin: 0, fontSize: '14px' }}>{result}</p>
            </div>
          ))}
        </TabPanel>
      </Tabs>
    </div>
  );
};

const tabListStyles = {
  display: 'flex',
  justifyContent: 'start',
  marginBottom: '10px',
  borderBottom: 'none' // Remove the horizontal line
};

const tabStyles = {
  width: '60px', // Set the width you desire
  padding: '2px',
  cursor: 'pointer',
  backgroundColor: '#f0f0f0',
  marginRight: '1px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  borderRadius: '5px' // Default border radius
};

export default TestResults;
