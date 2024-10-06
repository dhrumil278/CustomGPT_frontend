import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import FileUploadBot from '../components/Bot/FileUploadBot';
import TextBot from '../components/Bot/TextBot';
import WebBot from '../components/Bot/WebBot';
import { useTheme } from '@emotion/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { backendRoute } from '../constants/routesList';
import { api } from '../api/api';
import { useLocation } from 'react-router-dom';

// const sidebarOptions = [{ name: 'files', icon: <DescriptionOutlinedIcon /> }];
function AddNewBot(props) {
  const { state } = useLocation();

  const { id = '' } = state;
  const theme = useTheme();

  // maintain the which tab is open and which one is closed
  const [selectedIndex, setSelectedIndex] = useState(0);

  // state for open and close the snack messages (toast)
  const [open, setOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState([]);

  // chatBot data from API
  const [bot, setBot] = useState(null);

  // handle the for error and validation
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;

  // close the toaster message
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // get the bot data if the Id comes in the states
  useEffect(() => {
    if (id) {
      getChatBotById(id);
    }
  }, []);
  // API function
  const getChatBotById = async (id) => {
    const apiData = {
      method: 'get',
      url: process.env.REACT_APP_API_URL + backendRoute.GET_CHAT_BOT_BY_ID + id,
      data: null,
    };
    const response = await api(apiData);
    console.log('response: ', response);
    setApiResponse(await api(apiData));
    setBot(response.errorCode === 'SU001' ? response.data : response);
    setOpen(true);
  };

  // submit the form
  const onSubmit = async (data) => {
    const apiData = {
      method: 'post',
      url: process.env.REACT_APP_API_URL + backendRoute.CREATE_CHAT_BOT,
      data: data,
    };
    setApiResponse(await api(apiData));
    setOpen(true);
  };

  // function to change the tab
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={apiResponse.errorCode !== 'SU001' ? 'error' : 'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {apiResponse?.message || 'Internal Server Error'}
        </Alert>
      </Snackbar>
      <Navbar />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: '30px',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight={600}
            alignSelf={'center'}
          >
            Data Sources
          </Typography>
          <Typography
            component="h1"
            variant="body2"
            alignSelf={'center'}
            sx={{ mt: 1 }}
          >
            Add your data sources to train your chatbot
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: '#fff',
            width: '100%',
            margin: '35px 0px',
          }}
        >
          <Grid container>
            <Grid item xs={2.5}>
              <List component="nav">
                <ListItemButton
                  selected={selectedIndex === 0}
                  onClick={(event) => handleListItemClick(event, 0)}
                  sx={{
                    bgcolor: selectedIndex === 0 ? 'primary' : 'inherit',
                    color: selectedIndex === 0 ? 'white' : 'inherit',
                    '& .MuiListItemIcon-root': {
                      color: selectedIndex === 0 ? 'white' : 'inherit',
                    },
                  }}
                >
                  <ListItemIcon>
                    <DescriptionOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Files" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                  sx={{
                    bgcolor: selectedIndex === 1 ? 'primary' : 'inherit',
                    color: 'inherit',
                  }}
                >
                  <ListItemIcon>
                    <TitleOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Text" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                  sx={{
                    bgcolor: selectedIndex === 2 ? 'primary' : 'inherit',
                    color: 'inherit',
                  }}
                >
                  <ListItemIcon>
                    <LanguageOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Web Page" />
                </ListItemButton>
              </List>
            </Grid>

            <Grid item xs={6} minHeight={250}>
              {selectedIndex === 0 && <FileUploadBot />}
              {selectedIndex === 1 && <TextBot />}
              {selectedIndex === 2 && <WebBot />}
            </Grid>
            <Grid item xs={3.5} minHeight={250}>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{
                  margin: '0px 12px',
                }}
              >
                {console.log('bot', bot)}
                <Box>
                  <TextField
                    variant="standard"
                    label="bot name"
                    name="name"
                    // variant="outlined"
                    size="small"
                    fullWidth
                    margin="normal"
                    required
                    id="name"
                    type="text"
                    autoFocus
                    value={bot?.name || ''}
                    {...register('name', {
                      required: 'chat bot name is required',
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '150px',
                    marginTop: '12px',
                    padding: '15px',
                    borderRadius: '5px',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'rgb(228 228 231 / 1)',
                    backgroundColor: '#fff',
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    alignSelf={'center'}
                    fontWeight={600}
                  >
                    Source
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    alignSelf={'start'}
                    fontWeight={600}
                    sx={{ marginTop: '20px' }}
                  >
                    Total detected characters
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    alignSelf={'center'}
                    fontWeight={600}
                    marginTop={2}
                  >
                    <Typography
                      component="span"
                      variant="body1"
                      fontWeight={600}
                    >
                      0/
                    </Typography>
                    <Typography component="span" variant="body1">
                      400,000
                    </Typography>
                  </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ marginTop: '15px' }}
                  >
                    save bot
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default AddNewBot;
