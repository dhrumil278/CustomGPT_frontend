import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useForm, SubmitHandler } from 'react-hook-form';
import LogoutIcon from '@mui/icons-material/Logout';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@emotion/react';
import { backendRoute } from '../constants/routesList';
import { api } from '../api/api';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';

function Account() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState([]);

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  // const { errors } = formState;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const { register, handleSubmit, formState } = useForm();

  const Logout = async () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };
  const onSubmit = async (data) => {
    const apiData = {
      method: 'post',
      url: process.env.REACT_APP_API_URL + backendRoute.USER_SIGNUP,
      data: data,
    };

    setApiResponse(await api(apiData));
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
      <Container maxWidth="md">
        <Box
          sx={{ display: 'flex', justifyContent: 'end', padding: '30px 0px' }}
        >
          <Button
            size="large"
            color="primary"
            variant="contained"
            endIcon={<LogoutIcon />}
            onClick={() => Logout()}
          >
            Logout
          </Button>
        </Box>
        <Box
          sx={{
            borderRadius: '5px',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'rgb(228 228 231 / 1)',
            backgroundColor: '#fff',
            padding: '30px',
            marginBottom: '35px',
          }}
        >
          <Typography variant="h5" component="h1" fontWeight={600}>
            Email
          </Typography>
          <Typography variant="body2">Login email address</Typography>
          <TextField
            // label="email"
            defaultValue="dhrumil@yopmail.com"
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
            margin="normal"
            fullWidth
          />
        </Box>

        <Box
          sx={{
            borderRadius: '5px',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'rgb(228 228 231 / 1)',
            backgroundColor: '#fff',
            padding: '30px',
            marginBottom: '35px',
          }}
        >
          <Typography variant="h5" component="h1" fontWeight={600}>
            Username
          </Typography>
          <Typography variant="body2">update the username here</Typography>
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
        <Box
          sx={{
            borderRadius: '5px',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'rgb(228 228 231 / 1)',
            backgroundColor: '#fff',
            padding: '30px',
            marginBottom: '35px',
          }}
        >
          <Typography variant="h5" component="h1" fontWeight={600}>
            Change Password
          </Typography>
          <Typography variant="body2">
            change the current password here
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}
          >
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              sx={{ maxWidth: '400px' }}
              {...register('password', {
                required: 'password is required!',
                minLength: {
                  value: 8,
                  message: 'password atleast 8 character long',
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'password is not strong enough',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              //   autoComplete="current-password"
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="confirm password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              sx={{ maxWidth: '400px' }}
              {...register('confirmPassword', {
                required: 'Confirm password is required!',
                validate: (value) =>
                  value === watch('password') || 'Passwords does not match!',
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, maxWidth: '230px' }}
            >
              Change password
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            borderRadius: '5px',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'rgb(228 228 231 / 1)',
            backgroundColor: '#fff',
            padding: '30px',
            marginBottom: '35px',
          }}
        >
          <Typography variant="h5" component="h1" fontWeight={600}>
            Subscription Details
          </Typography>
          <Typography variant="body2">
            You are on the{' '}
            {
              <Chip
                label="FREE"
                color="warning"
                variant="filled"
                size="small"
              />
            }{' '}
            plan for free forever
          </Typography>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            <ListItem sx={{ padding: '0px' }}>
              <CheckIcon color="success" sx={{ marginRight: '5px' }} />
              <ListItemText primary="20 message credits/month" />
            </ListItem>
            <ListItem sx={{ padding: '0px' }}>
              <CheckIcon color="success" sx={{ marginRight: '5px' }} />
              <ListItemText primary="1 chatbot" />
            </ListItem>
            <ListItem sx={{ padding: '0px' }}>
              <CheckIcon color="success" sx={{ marginRight: '5px' }} />
              <ListItemText primary="400,000 characters/chatbot" />
            </ListItem>
            <ListItem sx={{ padding: '0px' }}>
              <CheckIcon color="success" sx={{ marginRight: '5px' }} />
              <ListItemText primary="Limit to 10 links to train on" />
            </ListItem>
            <ListItem sx={{ padding: '0px' }}>
              <CheckIcon color="success" sx={{ marginRight: '5px' }} />
              <ListItemText primary="Embed on unlimited websites" />
            </ListItem>
            <ListItem sx={{ padding: '0px' }}>
              <CheckIcon color="success" sx={{ marginRight: '5px' }} />
              <ListItemText primary="View chat history" />
            </ListItem>
          </List>
        </Box>
      </Container>
    </>
  );
}

export default Account;
