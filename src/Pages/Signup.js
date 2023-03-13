import React, { useEffect, useState } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { useNavigate } from "react-router-dom";
import EntryHeader from '../Components/common/entryHeader/EntryHeader';
import Box from '@mui/material/Box';
import { Typography, Link, Container, Button } from '@mui/material';
import EntryPageInput from '../Components/EntryPageInput';
import ConfirmationBox from '../Components/ConfirmationBox';
import Kvkk from '../Components/Kvkk';
import {Checkbox} from '@mui/material';
import {FormControlLabel} from '@mui/material';
const Signup = () => {
    let history = useNavigate();
    const [accepted, setAccepted] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isequal, setIsequal] = useState(false);
    const [openBox, setOpenBox] = useState(false);
    const notAccept = async function () {
        setOpenBox(false);
    }
    const doUserRegistration = async (e, type) => {
        if(type == "mouseClick" || (e.charCode == 13 && type == "enter")){
            const usernameValue = username;
            const passwordValue = password;
            const passwordValue2 = password2;
            if (passwordValue === passwordValue2) {
                try {
                    const createdUser = await Parse.User.signUp(usernameValue, passwordValue);
                    //const currentUser = await Parse.User.current();
                    createdUser.set("level", "admin");
                    await createdUser.save();
                    setOpenBox(false);
                    history("/addCompanyInfo");
                    return true;
                } catch (error) {
                    setOpenBox(false);
                    alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
                    return false;
                }
            }
            else{
                alert('password is not matching!');
                window.location.reload();
            }
        }
    };
    useEffect(()=>{
        (password === password2 && password !== "") ? setIsequal(true) : setIsequal(false);
    }, [password2]);

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
                <EntryHeader />
                <Typography component="h1" variant="h5"> Kullanıcı Kayıt </Typography>
                <Box>
                    <EntryPageInput onKeyPress={(event) => doUserRegistration(event, "enter")} label='Kullanıcı adı' onChange={(event) => setUsername(event.target.value)} />
                    <EntryPageInput onKeyPress={(event) => doUserRegistration(event, "enter")} label='Şifre' onChange={(event) => setPassword(event.target.value)} type='password' />
                    <EntryPageInput onKeyPress={(event) => doUserRegistration(event, "enter")} label='Şifreyi tekrar girin' onChange={(event) => setPassword2(event.target.value)} color = {isequal ? "success" : "warning"} helperText = {isequal ? "eşlendi" : "eşlenmedi"} type='password' />
                </Box>
                <Button
                    fullWidth
                    variant='contained'
                    onClick={() => setOpenBox(true)}
                    sx={{
                        maxWidth: '200px'
                    }}
                >
                    Sign Up
                </Button>
                {/* <SocialLogin></SocialLogin> */}
                <Typography component="h6" variant="h6">Hesabınız var mı?<Link href="/log-in">Giriş Yap</Link> </Typography>
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
                    <Button autoFocus disabled={accepted} onClick={(e)=>doUserRegistration(e, 'mouseClick')}>
                        Kabul ediyorum
                    </Button>
                    <Button onClick={() => notAccept()} autoFocus>
                        Vazgeçiyorum
                    </Button>
                </ConfirmationBox>
            </Box>
        </Container>
    );
};

export default Signup;
