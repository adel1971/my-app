import {
  AppBar,
  Container,
  createTheme,
  ThemeProvider,
  Toolbar,
  Box,
  Button,
  CssBaseline,
  Typography,
  CardMedia,
  Card,
} from '@mui/material';
import {useContext, useEffect} from 'react';

import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/ApiHooks';
import {themeOptions} from '../theme/themeOptions';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import LoginIcon from '@mui/icons-material/Login';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import LogoutIcon from '@mui/icons-material/Logout';
import HouseIcon from '@mui/icons-material/House';
import styled from '@emotion/styled';
const Layout = () => {
  const {user, setUser} = useContext(MediaContext);
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const Icons = styled(Box)(({theme}) => ({
    display: 'flax',
    alignItems: 'center',
    gap: '20px',
  }));

  const getUserInfo = async () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      console.log(userToken);
      const userData = await getUserByToken(userToken);
      if (userData) {
        setUser(userData);
        const target = location.pathname === '/' ? '/home' : location.pathname;
        navigate(target);
        return;
      }
    }
    navigate('/');
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Container maxWidth="xl">
          <AppBar position="sticky" /* color={'secondary'} */>
            <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
              <Typography
                variant="h6"
                sx={{
                  m: 2,
                  letterSpacing: '.3rem',
                }}
              >
                <Card padding="20px">
                  <CardMedia
                    component="img"
                    height="60px"
                    image="/src/images/senior App.png"
                    alt="SeniorApp"
                  />
                </Card>{' '}
              </Typography>
              <Icons>
                <Box sx={{mr: 2}}>
                  <Button sx={{color: 'white'}} component={Link} to="/home">
                    <HouseIcon />
                  </Button>
                  {user ? (
                    <>
                      <Button
                        sx={{color: 'white'}}
                        component={Link}
                        to="/profile"
                      >
                        <AccountBoxIcon />
                      </Button>
                      <Button
                        sx={{color: 'white'}}
                        component={Link}
                        to="/upload"
                      >
                        <DriveFolderUploadIcon />
                      </Button>
                      <Button
                        sx={{color: 'white'}}
                        component={Link}
                        to="/myfiles"
                      >
                        <FileOpenIcon />
                      </Button>
                      <Button
                        sx={{color: 'white'}}
                        component={Link}
                        to="/logout"
                      >
                        <LogoutIcon />
                      </Button>
                    </>
                  ) : (
                    <Button sx={{color: 'white'}} component={Link} to="/">
                      <LoginIcon />
                    </Button>
                  )}
                </Box>
              </Icons>
            </Toolbar>
          </AppBar>
          <main>
            <Outlet />
          </main>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
