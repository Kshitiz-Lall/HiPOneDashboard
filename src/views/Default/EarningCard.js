import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

let titles = {
  Negative_Count: 'Negative Response',
  Positive_Count: 'Positive Response',
  Total_Que_Count: 'Total Questions Asked',
  count_questions_dont_know: "Total Questions Don't Know",
  unique_users: 'Total Unique Users'
};
export default function BasicCard({ data }) {
  return (
    <Card sx={{ minWidth: 275, background: 'inherit' }}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {titles[data.key]}
        </Typography>
        <Typography variant="h3" component="div">
          {data.value}
        </Typography>
      </CardContent>
    </Card>
  );
}
