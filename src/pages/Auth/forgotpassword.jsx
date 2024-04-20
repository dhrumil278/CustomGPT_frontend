import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
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

function ForgotPassword() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState([]);

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onSubmit = async (data) => {
    const apiData = {
      method: 'post',
      url: process.env.REACT_APP_API_URL + backendRoute.USER_FORGOT_PASSWORD,
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
          <Typography component="h1" variant="h4" alignSelf={'start'}>
            Forgot Password
          </Typography>
          <Typography
            component="h1"
            variant="body2"
            alignSelf={'start'}
            sx={{ mt: 1 }}
          >
            Forget password? Reset it here!
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: 'email is required!',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address!',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Typography variant="body2" textAlign={'center'}>
              <Link
                href="/login"
                variant="body2"
                underline="none"
                alignItems={'center'}
              >
                back to login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default ForgotPassword;
