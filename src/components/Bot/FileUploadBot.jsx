import { Box, Divider, IconButton, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

function FileUploadBot() {
  const [selectedFile, setSelectedFile] = useState([]);
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const fileInputRef = useRef();

  const onFileChange = (event) => {
    setSelectedFile((prevFiles) => [...prevFiles, ...event.target.files]);
  };

  const onSubmit = async (data) => {
    console.log('data: ', data);
    // const apiData = {
    //   method: 'post',
    //   url: process.env.REACT_APP_API_URL + backendRoute.USER_SIGNUP,
    //   data: data,
    // };

    // setApiResponse(await api(apiData));
    // setOpen(true);
  };
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
          Files
        </Typography>
        <Divider></Divider>
        <Box
          component="form"
          noValidate
          sx={{
            margin: '15px 0px',
            width: '100%',
            borderRadius: '5px',
            borderWidth: '2px',
            borderStyle: 'dashed',
            borderColor: 'rgb(228 228 231 / 1)',
          }}
        >
          <input
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            id="file-upload-input"
            ref={fileInputRef}
            onChange={onFileChange}
            multiple
          />
          <label htmlFor="file-upload-input">
            <Box
              sx={{
                minHeight: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FileUploadOutlinedIcon fontSize="large" />
              <Typography component="h1" variant="body2" sx={{ mt: 1 }}>
                Click to select files and upload
              </Typography>
              <Typography component="h1" sx={{ fontSize: '12px' }}>
                supported files are .pdf only
              </Typography>
            </Box>
          </label>
        </Box>
        <Divider sx={{ marginBottom: '10px' }}>Attached Files</Divider>
        {selectedFile.length > 0 &&
          selectedFile.map((data, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: '5px',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'rgb(228 228 231 / 1)',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '7px 0px',
              }}
            >
              <Typography>{data.name}</Typography>
              <IconButton>
                <DeleteOutlinedIcon fontSize="small" color="error" />
              </IconButton>
            </Box>
          ))}
      </Box>
    </>
  );
}

export default FileUploadBot;
