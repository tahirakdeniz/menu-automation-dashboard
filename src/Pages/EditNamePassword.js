import React, { useState, useContext } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { UserContext } from "../Components/UserContext";
import { useNavigate } from "react-router-dom";
import EntryHeader from '../Components/common/entryHeader/EntryHeader';
import Box  from '@mui/material/Box';
import { Typography, Container, Button} from '@mui/material';
import EntryPageInput from '../Components/EntryPageInput';
import Kvkk from '../Components/Kvkk';
import ConfirmationBox from '../Components/ConfirmationBox';
import {FormControlLabel} from '@mui/material';
import {Checkbox} from '@mui/material';
const UserForm = () => {
  const { user } = useContext(UserContext);
  const history = useNavigate();
  // State variables
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [lastname, setLastname] = useState('')
  const [name, setName] = useState('')
  const [accepted, setAccepted] = useState(true)
  const [openBox, setOpenBox] = useState(false)
  const updateUserNamePassword = async (e, type) => {
    if(type == "mouseClick" || (e.charCode == 13 && type == "enter")){
      const user = Parse.User.current();
      user.set('username', username);
      user.set('name', name)
      user.set('lastname', lastname);
      user.set('password', password);
      try {
        user.set('firstTimeLogged', "0");
        await user.save();  
        history('/dashboard');
      } catch (error) {
        alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
      }
    }
  }
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
          <Typography component="h1" variant="h5"> Kullanıcı adı ve şifre düzenleme </Typography>
          <Box>
            <EntryPageInput label='Kullanıcı Adı' onKeyPress ={(event)=>{event.charCode == 13 && setOpenBox(true)}} onChange= {(event)=>setUsername(event.target.value)}/>
            <EntryPageInput label='Ad' onKeyPress ={(event)=>{event.charCode == 13 && setOpenBox(true)}} onChange= {(event)=>setName(event.target.value)}/>
            <EntryPageInput label='Soyad' onKeyPress ={(event)=>{event.charCode == 13 && setOpenBox(true)}} onChange= {(event)=>setLastname(event.target.value)}/>
            <EntryPageInput label='Şifre' onKeyPress ={(event)=>{event.charCode == 13 && setOpenBox(true)}} onChange= {(event)=>setPassword(event.target.value)} type='password'/>
          </Box>
          <Button
              fullWidth
              variant='contained'
              onClick={() =>setOpenBox(true)}
              sx={{
                maxWidth:'200px'
              }}
            >
              Kaydet
            </Button>
        </Box>
        <ConfirmationBox  
                    //accept={() => doUserRegistration()} notAccept={() => notAccept()} 
                    openBox={openBox} 
                    title={"INFOSORT BİLİŞİM SİSTEMLERİ SAN. TİC. LTD. ŞTİ. KİŞİSEL VERİLERİN KORUNMASI VE İŞLENMESİ HAKKINDA İŞLETMECİLER VE PERSONELLERİ İÇİN AYDINLATMA METNİ"} 
                    context={<Kvkk/>}
                >
                    <Box>
                    <FormControlLabel
                        sx={{
                            marginLeft:0,
                            marginRight:0,
                            maxWidth: "200px"
                        }}
                        label={"Yukarıdaki hususlarda bilgilendirildim, açık rızamla onay veriyorum."}
                        control={
                            <Checkbox
                                checked={!accepted}
                                onChange={()=>setAccepted(!accepted)}
                            />
                        }
                    />
                    </Box>
                    <Button autoFocus disabled={accepted} onClick={(event)=>updateUserNamePassword(event, "mouseClick")}>
                        Kabul ediyorum
                    </Button>
                    <Button onClick={() => setOpenBox(false)} autoFocus>
                        Vazgeçiyorum
                    </Button>
                </ConfirmationBox>
    </Container>
  );
};

export default UserForm;