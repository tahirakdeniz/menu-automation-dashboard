import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';
import EntryHeader from '../Components/common/entryHeader/EntryHeader';
import Box  from '@mui/material/Box';
import { Typography, Container, Button } from '@mui/material';
import EntryPageInput from '../Components/EntryPageInput';
const ResetPassword = () => {
    // State variables
    const [email, setEmail] = useState('');

    // Functions used by the screen components
    const doRequestPasswordReset = async function (e, type) {
      if(type == "mouseClick" || (e.charCode == 13 && type == "enter")){
        // Note that this value come from state variables linked to your text input
        const emailValue = email;
        try {
            await Parse.User.requestPasswordReset(emailValue);
            alert(`Success! Please check ${email} to proceed with password reset.`);
            return true;
        } catch (error) {
            // Error can be caused by lack of Internet connection
            alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
            return false;
        }
      }
    };
    return (
        <Container 
        maxWidth='xs'
        sx={{
          marginTop: '100px',
        }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              rowGap: 2,
            }}>
              <EntryHeader/>
              <Typography component="h1" variant="h5"> Şifremi Unuttum </Typography>
              <Box>
                <EntryPageInput label='E-mail' onKeyPress = {(event) => doRequestPasswordReset(event, "enter")} onChange= {(event)=>setEmail(event.target.value)}/>
              </Box>
              <Button
                  fullWidth
                  variant='contained'
                  onClick={() => doRequestPasswordReset(null,"mouseClick")}
                  sx={{
                    maxWidth:'200px'
                  }}
                >
                 e-posta gönder
                </Button>
             </Box>
        </Container>
      );
}

export default ResetPassword;
