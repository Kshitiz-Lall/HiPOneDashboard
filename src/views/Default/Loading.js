import { Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import GifWaitingGirl from '../../assets/images/gifs/waitinggirl.gif';
import GifWaitingBoy from '../../assets/images/gifs/waitingboy.gif';

const Loading = () => {
  const loadingPhrases = [
    '⌛ Please wait while we fetch data for you...',
    '✨ Loading the magic...',
    '🤲 Hold on tight, data incoming...',
    '🚀 Fetching awesomeness...',
    '⏳ Almost there, just a moment...'
  ];

  const gifs = [GifWaitingGirl, GifWaitingBoy]; // List of available GIFs

  const randomIndexPhrase = Math.floor(Math.random() * loadingPhrases.length);
  const randomIndexGif = Math.floor(Math.random() * gifs.length);

  const [randomPhrase] = useState(loadingPhrases[randomIndexPhrase]);
  const [randomGif] = useState(gifs[randomIndexGif]);

  return (
    <div>
      <Paper
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          borderRadius: '12px',
          backgroundColor: '#f0f0f0',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.5s ease-in-out',
          margin: 2
        }}
      >
        <img src={randomGif} alt="Waiting GIF" style={{ width: '120px', marginRight: '10px' }} />
        <div>
          <Typography
            variant="h3"
            color="textSecondary"
            style={{
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: '#333',
              marginTop: 0
            }}
          >
            {randomPhrase}
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

export default Loading;
