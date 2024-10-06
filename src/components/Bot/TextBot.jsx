import { Box, Divider, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function TextBot() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#fff',
          minHeight: '300px',
          margin: '12px',
          padding: '15px',
          borderRadius: '5px',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'rgb(228 228 231 / 1)',
        }}
      >
        <Typography variant="h5" component="h1" fontWeight={600}>
          Text
        </Typography>
        <Divider></Divider>
        <Box
          sx={{
            margin: '15px 0px',
            width: '100%',
            // minHeight: '150px',
            // borderRadius: '5px',
            // borderWidth: '2px',
            // borderStyle: 'dashed',
            // borderColor: 'rgb(228 228 231 / 1)',
          }}
        >
          <TextField
            id="outlined-multiline-static"
            label="Write the text here"
            multiline
            rows={9}
            fullWidth
          />
        </Box>
      </Box>
    </>
  );
}
export default TextBot;
