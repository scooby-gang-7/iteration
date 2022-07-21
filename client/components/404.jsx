import { Paper } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import homer from '../assets/homer.gif';
import '../stylesheets/styles.css';

const FourOFour = (props) => {
  //   const { requestedUrl } = useParams();
  //   console.log(requestedUrl);

  return (
    <Paper
      id='fof-container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      elevation='10'
    >
      <h1>404</h1>
      <img
        src={homer}
        alt='404 gif'
        style={{
          width: '45%',
          border: '10px solid rgb(225,225,225)',
          borderRadius: '20px',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h3>The boys in the lab are working very hard to find your page.</h3>{' '}
        <h3> . . .</h3>
        <h3>The boys in the lab are not very good at their jobs.</h3>
      </div>
      {/* <div style={{ width: '100%', backgroundColor: 'red' }}>hello</div> */}
    </Paper>
  );
};

export default FourOFour;
