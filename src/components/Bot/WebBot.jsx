import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function WebBot() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#fff',
          minHeight: '300px',
          margin: '12px',
          padding: '15px',
          // boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          borderRadius: '5px',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'rgb(228 228 231 / 1)',
        }}
      >
        <Typography variant="h5" component="h1" fontWeight={600}>
          WebPage
        </Typography>
        <Divider></Divider>
        <Box
          sx={{
            margin: '15px 0px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            id="outlined-basic"
            label="website link"
            variant="outlined"
            size="small"
            fullWidth
            required
            sx={{ marginRight: '10px' }}
          ></TextField>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{ fontWeight: '600', padding: '6px 21px' }}
          >
            Add
          </Button>
        </Box>
        <Divider sx={{ marginBottom: '10px' }}>Added Websites</Divider>
        <Box
          sx={{
            borderRadius: '5px',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'rgb(228 228 231 / 1)',
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '250px', // Set the width according to your requirement
            }}
          >
            https://en.wikipedia.org/wiki/Ratan_Tata
          </Typography>
          <IconButton>
            <DeleteOutlinedIcon fontSize="small" color="error" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
export default WebBot;
