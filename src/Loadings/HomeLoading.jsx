import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import './Loading.css'

export const  Variants = ()=> {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3.2rem' }}>
      {[...Array(5)].map((_, index) => (
        <Stack key={index} spacing={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={180} />
          <Skeleton variant="rounded" width={210} height={60} />
          <br/>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={180} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
      ))}
    </div>
  );
}
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const variants = [ 'h3'];

function TypographyDemo(props) {
  const { loading = false } = props;

  return (
    <div>
      {variants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          {loading && <Skeleton />}
        </Typography>
      ))}
    </div>
  );
}

TypographyDemo.propTypes = {
  loading: PropTypes.bool,
};

export const SkeletonTypography = ()=> {
  return (
    <Grid container spacing={8}>
      <Grid item xs>
        <TypographyDemo loading />
      </Grid>
      <Grid item xs>
        <TypographyDemo />
      </Grid>
    </Grid>
  );
}

import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';
export  const  LinearIndeterminate=({props})=> {
  return (
    <Box sx={{ width: '100%',color:'grey',position:props.position,top:props.top }}>
      <LinearProgress  color='inherit' />
    </Box>
  );
}

export const CustomLoader = ()=>{

return(
    <>
    <div className='loader'>
    <span className='element'></span>
    <span className='element'></span>
    <span className='element'></span>
    <span className='element'></span>
    <span className='element'></span>
    <span className='element'></span>
    <span className='element'></span>
    <span className='element'></span>
    <span className='element'></span>
    <span  className='element'></span>
    <span  className='element'></span>
    <span  className='element'></span>
    <span  className='element'></span>
    <span  className='element'></span>
    <span  className='element'></span>
    
    </div>
    </>
    )
}


