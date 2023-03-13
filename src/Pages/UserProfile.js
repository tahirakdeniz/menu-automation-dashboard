import React, { useState } from "react";
import Parse from 'parse/dist/parse.min.js';
import { Container, CircularProgress, Grid, Paper, Typography, Avatar, TextField, Button, Select, MenuItem, Stack, Box, FormControl, InputLabel, IconButton } from "@mui/material";
import UploadLabel from "../Components/UploadLabel";
import ConfirmationBox from '../Components/ConfirmationBox';
import { numericalInput } from "../utils/utils";
const UserProfile = () => {
    const [editAge, setEditAge] = useState(0);
    const [editGender, setEditGender] = useState("");
    const [editMaritalStatus, setEditMaritalStatus] = useState("");
    const [editEducation, setEditEducation] = useState("");
    const [editIncome, setEditIncome] = useState(0);
    const [editSmoking, setEditSmoking] = useState("");
    const [editUserName, setEditUserName] = useState("");
    const [isSaving, setSaving] = useState(false);
    const[isPhotoEditing, setIsPhotoEditing] = useState(false);
    const editUserInfo = async () => {
        setEditUserName(Parse.User.current().get("username"));
        setEditAge(Parse.User.current().get("age"))
        setEditIncome(Parse.User.current().get("income"))
    }

    const saveUserInfo = async () => {
        if(!numericalInput(editAge) || !numericalInput(editIncome)){
            alert("Lütfen Sayı Giriniz")
        }
        else {
            try {
                if (editAge !== "" && numericalInput(editAge)) { await Parse.User.current().set("age", editAge); }
                if (editGender !== "") { await Parse.User.current().set("gender", editGender); }
                if (editMaritalStatus !== "") { await Parse.User.current().set("maritalStatus", editMaritalStatus); }
                if (editEducation !== "") { await Parse.User.current().set("education", editEducation); }
                if (editIncome !== "" && numericalInput(editAge)) { await Parse.User.current().set("income", editIncome); }
                if (editSmoking !== "") { await Parse.User.current().set("smoking", editSmoking); }
                await Parse.User.current().save();
                window.location.reload()
            } catch (error) {
                alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
            }
        }
        setEditUserName("");
        setEditAge(0);
        setEditIncome(0);

    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const storeFile = async (file) => {
        setSaving(true);
        try {
            var name = file.name;
            let newFile = await toBase64(file);
            var parseFile = new Parse.File(name, { base64: newFile })
            let user = Parse.User.current();
            user.set("image", parseFile);
            await user.save();
        } catch (error) {
            alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
        }
        setSaving(false);
    }


    const isEditing = editUserName === Parse.User.current().get("username");

    //console.log(Parse.User.current().get("image").url());
    //console.log(Parse.User.current().get("image").name);
    return (
        <>
        <ConfirmationBox openBox={isSaving} title={<Typography variant="h6">Kaydediyor</Typography>}>
        <Container sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
          <CircularProgress color='primary' size={32} />
        </Container>
      </ConfirmationBox>
        <Container maxWidth="sm" disableGutters>
            <Paper sx={{ p: 5 }}>
                <Stack spacing={2}>
                    {isPhotoEditing ?
                        <Avatar sx={{
                            margin: 'auto',
                            aspectRatio: '1',
                            width: '75%',
                            height: 'unset',
                        }}>
                            <UploadLabel getFileOnChange={(file) => {
                                //const url = URL.createObjectURL(file);
                                setIsPhotoEditing(false)
                                storeFile(file);
                                //
                                //
                            }}>
                                <IconButton component='span'>
                                    <i class="fa-solid fa-camera"></i>
                                </IconButton>
                            </UploadLabel>
                        </Avatar>
                        :
                        <Avatar
                            sx={{
                                margin: 'auto',
                                aspectRatio: '1',
                                width: '75%',
                                height: 'unset',
                            }}
                            src={Parse.User.current().get("image")?.url()}
                            alt={Parse.User.current().get("username") + "_avatar"}
                        />
                    }   
                    {/* {Parse.User.current().get("username").charAt(0).toUpperCase()} */}
                    <Stack>
                        <CustomGridItem title="Kullanıcı Adı" propertyName="username" />
                        <CustomGridItem title="Soy adı" propertyName="lastname" />
                        <CustomGridItem title="E-posta" propertyName="email" />
                        <CustomGridItemWithTextField 
                            isEditing={isEditing}
                            title="Yaş" 
                            propertyName="age"
                            onChange={(e) => setEditAge(e.target.value)}
                            error={!numericalInput(editAge)}
                            value={editAge}
                        />
                        {/* <CustomGridItem title="Yaş" propertyName="age" isEditing={isEditing} handleChange={(val) => { setEditAge(val);
                        <CustomGridItem title="Cinsiyet" propertyName="gender" isEditing={isEditing} handleChange={(val) => setEditGender(val)} items={['Erkek', 'Kadın', 'Diğer']} />
                        <CustomGridItem title="Medeni Durum" propertyName="maritalStatus" isEditing={isEditing} handleChange={(val) => setEditMaritalStatus(val)} items={['Evli', 'Bekar']} />
                        <CustomGridItem title="Eğitim" propertyName="education" isEditing={isEditing} handleChange={(val) => setEditEducation(val)} value={editEducation} items={['İlkokul', 'Ortaokul', 'Lise', 'Lisans', 'Yüksek Lisans', 'Doktora']} />
                        {/* <CustomGridItemmWithTextField title="Gelir" propertyName="income" isEditing={isEditing} handleChange={(val) => setEditIncome(val)} value={editIncome} items={['0-5000', '5001-10000', '10001+']} /> */}
                        <CustomGridItemWithTextField
                            title="Gelir"
                            propertyName="income"
                            isEditing={isEditing}
                            onChange={(e) => { setEditIncome(e.target.value) }}
                            error={!numericalInput(editIncome)}
                            value={editIncome}
                        />
                        <CustomGridItem title="Sigara İçme Durumu" propertyName="smoking" isEditing={isEditing} handleChange={(val) => setEditSmoking(val)} value={editSmoking} items={['Evet', 'Hayır']} />
                    </Stack>
                    <Box display='flex' justifyContent='center'>
                        {isEditing ?
                            <Button variant="outlined" onClick={() => {saveUserInfo(); setIsPhotoEditing(false)}}> Kaydet </Button>
                            :
                            <Button variant="outlined" onClick={() => {editUserInfo(); setIsPhotoEditing(true)}}> Düzenle </Button>
                        }
                    </Box>
                </Stack>
            </Paper>
        </Container>
        </>
    )
}

const CustomGridItem = ({ title, propertyName, isEditing, handleChange, items }) => {

    const currentUser = Parse.User.current();

    return (
        <Grid item container alignItems="center" wrap="nowrap"
            sx={{
                p: 1,
                '&:hover': {
                    boxShadow: 1,
                },
            }}>
            <Grid item xs zeroMinWidth>
                <Typography noWrap>{title}</Typography>
            </Grid>
            <Grid item xs='auto'>
                <Typography align="center" padding={1}> : </Typography>
            </Grid>
            <Grid item xs zeroMinWidth>
                {isEditing ?
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
                        <Select
                            labelId="labelId"
                            id='id'
                            label={title}
                            defaultValue={currentUser.get(propertyName)}
                            onChange={(event) => handleChange(event.target.value)}
                        >
                            {items.map((item) => (
                                <MenuItem value={item}>{item}</MenuItem>
                            ))
                            }
                        </Select>
                    </FormControl>
                    :
                    <Typography noWrap>
                        {currentUser.get(propertyName)}
                    </Typography>
                }
            </Grid>
        </Grid>
    );
}

const CustomGridItemWithTextField = ({ title, propertyName, isEditing, onChange, error, value}) => {

    const currentUser = Parse.User.current();

    return (
        <Grid item container alignItems="center" wrap="nowrap"
            sx={{
                p: 1,
                '&:hover': {
                    boxShadow: 1,
                },
            }}>
            <Grid item xs zeroMinWidth>
                <Typography noWrap>{title}</Typography>
            </Grid>
            <Grid item xs='auto'>
                <Typography align="center" padding={1}> : </Typography>
            </Grid>
            <Grid item xs zeroMinWidth>
                {isEditing ?
                    <TextField label={title} onChange={onChange} error={error} value={value}/>
                    :
                    <Typography noWrap>
                        {currentUser.get(propertyName)}
                    </Typography>
                }
            </Grid>
        </Grid>
    );
}

export default UserProfile;