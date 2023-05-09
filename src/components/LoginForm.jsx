import {Box, Button, Container, TextField} from '@mui/material';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useAuthentication} from '../hooks/ApiHooks';
import useForm from '../hooks/FormHooks';
import GoogleLogin from 'react-google-login';

const LoginForm = () => {
  const handleFailure = (result) => {
    alert(result);
  };
  const handleLogin = (googleData) => {
    console.log(googleData);
  };
  const {setUser} = useContext(MediaContext);
  const {postLogin} = useAuthentication();
  const navigate = useNavigate();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      const loginResult = await postLogin(inputs);
      localStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doLogin,
    initValues
  );

  return (
    <Container maxWidth="xs">
      <div className="google">
        <GoogleLogin
          // eslint-disable-next-line no-undef
          /* clientId={process.env.REACT_APP_GOOGLE_CLIENTID} */
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
        ></GoogleLogin>
        <p>or use your username to log in</p>
      </div>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="dense"
          name="username"
          label="Username"
          onChange={handleInputChange}
          value={inputs.username}
        />
        <TextField
          fullWidth
          margin="dense"
          name="password"
          type="password"
          label="Password"
          onChange={handleInputChange}
          value={inputs.password}
        />
        <Button fullWidth sx={{mt: 1}} variant="contained" type="submit">
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
