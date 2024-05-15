import React, { useState } from 'react';
import ImageViewer from './Components/ImageViewer';
import ImageViewer2 from './Components/Imagewithannotation';
import { Box } from '@mui/material';

const App = () => {

  return (
    <Box m="0" p="0">
      <ImageViewer />
      {/* <ImageViewer2 /> */}
      {/* <ImageWithAnnotations /> */}
    </Box>
  );
};

export default App;
