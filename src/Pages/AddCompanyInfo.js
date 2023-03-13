import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { UserContext } from "../Components/UserContext";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import EntryHeader from '../Components/common/entryHeader/EntryHeader';
import Box  from '@mui/material/Box';
import { Typography, Checkbox, Link, Container, Button, FormControlLabel, CircularProgress } from '@mui/material';
import EntryPageInput from '../Components/EntryPageInput';
import ConfirmationBox from '../Components/ConfirmationBox';
import { validateEmail, validateNonEmptyInput } from '../utils/utils';

const AddCompanyInfo = () => {
    const [mainCompanyName, setMainCompanyName] = useState("");
    const [mainCompanyAddress, setMainCompanyAdress] = useState("");
    const [mainCompanyMail, setMainCompanyMail] = useState("");
    const [mainCompanyPhone, setMainCompanyPhone] = useState("");
    const [isSaving, setSaving] = useState(false);
    let history = useNavigate();

    const addCompany = async (e, type) => {
      if (type == "mouseClick" || (e.charCode == 13 && type == "enter")) {
        if (!validateEmail(mainCompanyMail) ||
          !validateNonEmptyInput(mainCompanyAddress) ||
          !validateNonEmptyInput(mainCompanyName) ||
          !validateNonEmptyInput(mainCompanyPhone)
        ) {
          alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
          return;
        }
        setSaving(true);
        try {
          const Role = new Parse.Role();
          let roleQuery = new Parse.Query(Role);
          let role1 = await roleQuery.get("9M3AYHPFkA");
          let role2 = await roleQuery.get("ZRpuuQb8dC");
          let role3 = await roleQuery.get("E92DFfFHCA");        
          let Menu = Parse.Object.extend('Menu');
          let menu = new Menu();
          menu.set("menuName", mainCompanyName+"Menu");
          await menu.save();
          let MainCompany = Parse.Object.extend('MainCompany');
          let mainCompany = new MainCompany();
          mainCompany.set("mainCompanyName",mainCompanyName);
          mainCompany.set("mainCompanyAddress",mainCompanyAddress);
          mainCompany.set("mainCompanyMail",mainCompanyMail);
          mainCompany.set("mainCompanyPhone",mainCompanyPhone);
          await menu.save();
          await mainCompany.save();
          let roleRelation = mainCompany.relation("roles");
          roleRelation.add(role1);
          roleRelation.add(role2);
          roleRelation.add(role3);
          let menuRelation = mainCompany.relation("menu");
          menuRelation.add(menu);
          await mainCompany.save();
          const user = Parse.User.current();
          let relation = user.relation('company');
          relation.add(mainCompany);
          await user.save(); 
          // registered user saved in users of company
          let usersRelation = mainCompany.relation("users");
          await usersRelation.add(user);
          await mainCompany.save();
          // registered user saved as admin.
          let query = new Parse.Query(Parse.Role);
          await query.equalTo("name", "admin");
          let roleObj = await query.first();
          let userRelation = roleObj.relation('users');
          userRelation.add(user);
          await roleObj.save();
          //
          history('/')
        } catch (error) {
          alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
        }
        setSaving(false);
      }
    }
    return (
      <>
      <ConfirmationBox openBox={isSaving} title={<Typography variant="h6">Kaydediyor</Typography>}>
        <Container sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
          <CircularProgress color='primary' size={32} />
        </Container>
      </ConfirmationBox>
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
              <Typography component="h1" variant="h5"> Şirket Kayıt </Typography>
              <Box>
                <EntryPageInput onKeyPress={(event)=>addCompany(event, "enter")} label='Şirket Adı' onChange= {(event)=>setMainCompanyName(event.target.value)} error={!validateNonEmptyInput(mainCompanyName)}/>
                <EntryPageInput onKeyPress={(event)=>addCompany(event, "enter")} label='Adres' onChange= {(event)=>setMainCompanyAdress(event.target.value)} multiline error={!validateNonEmptyInput(mainCompanyAddress)}/>
                <EntryPageInput onKeyPress={(event)=>addCompany(event, "enter")} label='Şirket e-postası' onChange= {(event)=>setMainCompanyMail(event.target.value)} error={!validateEmail(mainCompanyMail)}/>
                <EntryPageInput onKeyPress={(event)=>addCompany(event, "enter")} label='Şirket Telefon Numarası' onChange= {(event)=>setMainCompanyPhone(event.target.value)} error={!validateNonEmptyInput(mainCompanyPhone)}/>
              </Box>
              <Button
                  fullWidth
                  variant='contained'
                  onClick={() => addCompany(null, "mouseClick")}
                  sx={{
                    maxWidth:'200px'
                  }}
                >
                  Kaydet
                </Button>
            </Box>
        </Container>
        </>
      );
}

export default AddCompanyInfo;