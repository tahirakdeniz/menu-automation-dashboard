import { Box, Button, Container, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import React from 'react'
import Parse from 'parse/dist/parse.min.js';
import { useState } from 'react';
import ConfirmationBox from '../Components/ConfirmationBox';
const Settings = () => {
    const [openBoxMail, setOpenBoxMail] = useState(false)
    const [openBoxPassword, setOpenBoxPassword] = useState(false)
    const [newMail, setNewMail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const changeMail = async() => {
        try {
            let user = Parse.User.current();
            user.set("email", newMail);
            await user.save();
            setOpenBoxMail(false);
        } catch (error) {
            alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
        }
    }
    const changePassword = async() => {
        if( oldPassword !== newPassword ){
            try {
                let user = Parse.User.current();
                const loggedInUser = await Parse.User.logIn(user.get("username"), oldPassword);
                user.set("password", newPassword);
                await user.save();
                setOpenBoxPassword(false);
                alert("succesfully updated"); 
            } catch (error) {
                alert("eski şifreniz uyuşmuyor");
            }
        } else{
            alert("Eski şifreniz ile yeni şifreniz aynı. Geçerli bir şifre giriniz.")
        }
    }
    return (
        <Box>
            <ConfirmationBox
                openBox={openBoxMail}
                title={"yeni mailinizi giriniz"}
                context={
                    <TextField label={"e-mail"} defaultValue={Parse.User.current().get("email")} onChange={(event)=> setNewMail(event.target.value)}/>
                }
            >
                <Button onClick={()=> changeMail()}>Kaydet</Button>
                <Button onClick={()=> setOpenBoxMail(false)}>İptal</Button>
            </ConfirmationBox>
            <ConfirmationBox
                openBox={openBoxPassword}
                title={"Şifre değiştirme"}
                context={
                    <Box>
                    <TextField type={"password"} label={"eski şifre"} onChange={(event)=> setOldPassword(event.target.value)}/>
                    <TextField type={"password"} label={"yeni şifre"} onChange={(event)=> setNewPassword(event.target.value)}/>
                    </Box>
                }
            >
                <Button onClick={()=> changePassword()}>Kaydet</Button>
                <Button onClick={()=> setOpenBoxPassword(false)}>İptal</Button>
            </ConfirmationBox>
            <Container>
                <List>
                    <ListItem>
                        <ListItemButton onClick={() => setOpenBoxMail(true)}>E-mail değiştir</ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => setOpenBoxPassword(true) }>Şifre değiştir</ListItemButton>
                    </ListItem>
                </List>
            </Container>
        </Box>
    )
}

export default Settings;