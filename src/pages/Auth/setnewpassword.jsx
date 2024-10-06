import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './../../App.css';
import { useTheme } from '@emotion/react';
import { backendRoute } from '../../constants/routesList';
import { api } from '../../api/api';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useForm, SubmitHandler } from 'react-hook-form';

function SetNewPassword() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;

  const [open, setOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState([]);

  useEffect(() => {
    console.log('useEffect');
    if (apiResponse && apiResponse.errorCode === 'SU001') {
      localStorage.setItem('accessToken', apiResponse.data.accessToken);
      navigate('/');
    }
  }, [apiResponse]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onSubmit = async (data) => {
    const apiData = {
      method: 'post',
      url: process.env.REACT_APP_API_URL + backendRoute.USER_SET_NEW_PASSWORD,
      token: localStorage.getItem('accessToken'),
      data: data,
    };

    setApiResponse(await api(apiData));
    setOpen(true);
  };

  return (
    <div className="auth_bg">
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
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '50px 30px',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            backgroundColor: '#fff',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h4" alignSelf={'start'}>
            Set New Password
          </Typography>
          <Typography
            component="h1"
            variant="body2"
            alignSelf={'start'}
            sx={{ mt: 1 }}
          >
            Set new password here!
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
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

              //   autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="confirm password"
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Confirm password is required!',
                validate: (value) =>
                  value === watch('password') || 'Passwords does not match!',
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Set New Password
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default SetNewPassword;
