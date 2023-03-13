import React, { useState, useContext } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { UserContext } from "../Components/UserContext";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import EntryHeader from '../Components/common/entryHeader/EntryHeader';
import Box  from '@mui/material/Box';
import { Typography, Checkbox, Link, Container, Button, FormControlLabel } from '@mui/material';
import EntryPageInput from '../Components/EntryPageInput';

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  let history = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [level, setLevel] = useState('');
  const [isLogged, setIsLogged] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const doUserLogIn = async function (e, type) {
    setButtonDisabled(true);
    if(type === "mouseClick" || (e.charCode==13 && type === "enter")){
      const usernameValue = username;
      const passwordValue = password;
      try {
        const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
        setUser(loggedInUser);
        // alert(
        //   `Success! User ${loggedInUser.get(
        //     'username'
        //   )} has successfully signed in!`
        // );
        setIsLogged(isLogged);
        const currentUser = await Parse.User.current();
        setUsername('');
        setPassword('');
        getCurrentUser();
        if (currentUser.get('level') !== 'admin') {
          //await sendData();
          currentUser.get('firstTimeLogged') === "1" ? history('/editNamePassword') : history('/dashboard');
          return;
        }
        else {
          //await sendData();
          currentUser.get('firstTimeLogged') === "1" ? history('/editNamePassword') : history('/dashboard');
          return;
        }
      } catch (error) {
        alert(`Error! ${error.message}`);
        return;
      }
    }
    setButtonDisabled(false);
  };


  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    setLevel(currentUser.get('level'));
    setCurrentUser(currentUser);
    return currentUser;
  };
  return (
    <Container
    maxWidth='xs'
    sx={{
      marginTop: '100px',
    }}>
      {currentUser === null && (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: 2,
        }}>
          <EntryHeader/>
          <Typography component="h1" variant="h5"> Kullanıcı Girişi </Typography>
          <Box>
            <EntryPageInput onKeyPress={(event) => doUserLogIn(event, "enter")} label='Kullanıcı Adı' onChange= {(event)=>setUsername(event.target.value)}/>
            <EntryPageInput onKeyPress={(event) => doUserLogIn(event, "enter")} label='Şifre' onChange= {(event)=>setPassword(event.target.value)} type='password'/>
            {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />            */}
          </Box>
          <Button
              fullWidth
              variant='contained'
              disabled={buttonDisabled}
              onClick={() => doUserLogIn(null, "mouseClick")}
              sx={{
                maxWidth:'200px',
              }}
            >
              Giriş Yap
            </Button>
            {/* <SocialLogin></SocialLogin> */}
            <Typography component="h6" variant="h6">Hesabınız yok mu? <Link  href="/signup">Kayıt ol</Link> </Typography>
            <Typography component="h6" variant="h6">Şifrenizi mi unuttunuz? <Link  href="/ResetPassword">Şifreyi yenileyin</Link></Typography>
        </Box>
      )}
      {currentUser !== null && (
        <h1>Yükleniyor ...</h1>
      )}
    </Container>
  );
};

export default Login;