import {
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { api } from '../api/api';
import { backendRoute } from '../constants/routesList';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  // borderWidth: '2px',
  // borderStyle: 'solid',
  // borderColor: 'rgb(228 228 231 / 1)',
  // boxShadow: 24,
  p: 4,
};

function Home() {
  const [open, setOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState([]);
  const [botList, setBotList] = useState([]);
  const { register, handleSubmit, formState, watch } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    listBotAPI();
  }, []);

  useEffect(() => {
    if (botList?.statusCode === 403) {
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  }, [botList]);

  const getChatBot = async (id) => {
    console.log('getChatBot: ', getChatBot);
    navigate('/addNewBot', { state: { id: id } });
  };

  const deleteChatBot = async (id) => {
    const apiData = {
      method: 'post',
      url: process.env.REACT_APP_API_URL + backendRoute.DELETE_CHAT_BOT + id,
    };
    setApiResponse(await api(apiData));
  };

  const listBotAPI = async () => {
    const apiData = {
      method: 'get',
      url: process.env.REACT_APP_API_URL + backendRoute.LIST_CHAT_BOT,
    };
    setBotList(await api(apiData));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const onSubmit = () => setModalOpen(false);

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextField
              variant="standard"
              margin="normal"
              autoComplete="given-name"
              name="username"
              required
              fullWidth
              id="username"
              label="username"
              autoFocus
              {...register('username', {
                required: 'username is required!',
                minLength: {
                  value: 2,
                  message: 'username atleast 2 character long',
                },
              })}
              sx={{ marginRight: '65px' }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, minWidth: '150px' }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
      <Navbar />
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '50px 0px',
          }}
        >
          <Typography variant="h3" component="h1" alignSelf={'center'}>
            Chatbots
          </Typography>
          <Typography
            component="h1"
            variant="body2"
            alignSelf={'center'}
            sx={{ mt: 1 }}
          >
            currently Active chatbots
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              size="large"
              color="primary"
              variant="contained"
              // href="/addNewBot"
              // endIcon={<LogoutIcon />}
              onClick={handleModalOpen}
            >
              Add New Bot
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {botList?.data?.length > 0 &&
              botList.data.map((data) => {
                {
                  /* console.log('data: ', data); */
                }
                return (
                  <>
                    <Box
                      sx={{
                        borderRadius: '5px',
                        borderWidth: '3px',
                        borderStyle: 'solid',
                        borderColor: 'rgb(228 228 231 / 1)',
                        backgroundColor: '#fff',
                        width: '100%',
                        minHeight: '60px',
                        padding: '15px 0px',
                        margin: '15px 0px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: 2,
                        cursor: 'pointer',
                      }}
                    >
                      <Box sx={{ paddingLeft: '25px' }}>
                        <Typography
                          variant="h5"
                          component="h1"
                          sx={{ fontWeight: '600' }}
                        >
                          {data.name}
                        </Typography>
                      </Box>
                      <Box sx={{ paddingRight: '25px' }}>
                        <IconButton
                          aria-label="delete-bot"
                          color="error"
                          size="large"
                          onClick={() => deleteChatBot(data?._id)}
                        >
                          <DeleteOutlineIcon fontSize="medium" />
                        </IconButton>
                        <IconButton
                          aria-label="open-bot"
                          color="primary"
                          size="large"
                          onClick={() => getChatBot(data?._id)}
                        >
                          <ArrowForwardIcon fontSize="medium" />
                        </IconButton>
                      </Box>
                    </Box>
                  </>
                );
              })}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Home;
