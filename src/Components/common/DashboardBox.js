import { AppBar, Card, Toolbar, Box, Drawer, CardHeader, Button, Avatar, CssBaseline, CardActionArea, Typography, Grid, CardContent, Paper, Divider, Icon, Tooltip, useMediaQuery, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Parse from 'parse/dist/parse.min.js';
import Logo from './entryHeader/logo.png';
import DrawerContent from './sidebar/DrawerContent';
import IconButton from '@mui/material/IconButton';
//import useFetch from '../../Pages/useFetch';
import ResponsiveButton from '../ResposiveButton';
import { IconTooltipButton } from '../IconTooltipButton';
import { setLocalDatastoreController } from 'parse';
import { getUserPermissions } from '../../utils/utils';
export const DashboardBox = (props) => {
  const [data, setData] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const history = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isSmallerMD = useMediaQuery((theme) => theme.breakpoints.down('md'));


  const getData = async () => {
    let d = await getUserPermissions(Parse.User.current().get("level"));
    setData(d);
   
  }

  useEffect(()=>{
    getData();
   
  },[]);

  const doUserLogOut = async function () {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser = await Parse.User.current();
      localStorage.clear();
      if (currentUser === null) {
      }
      // Update state variable holding current user
      history('/');
      return true;
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
      return false;
    }
  };

  const USERNAME = Parse.User.current().get('username');
  const APP_BAR_HEIGHT = "80px";
  const SIDEBAR_WIDTH = "225px";
  const childrenArray = React.Children.toArray(props.children);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'white'
      }}>
        <Toolbar sx={{
          minHeight: APP_BAR_HEIGHT,
          height: APP_BAR_HEIGHT,
          py: "10px",
          px: 3,
        }}>
          <Grid container wrap='nowrap' alignItems="center">
            <Grid item xs='auto'>
              <IconButton sx={{ display: { md: 'none' } }} onClick={() => setDrawerOpen(!drawerOpen)}>
                <i class="fa-solid fa-bars"></i>
              </IconButton>
            </Grid>
            <Grid item xs={true}>
              <Box component="img" src={Logo} sx={{
                width: '100%',
                maxWidth: 200,
                minWidth: 100,
              }} />
            </Grid>
            <Grid item xs={'auto'} container direction="row" justifyContent="flex-end" alignItems="center" spacing={2} wrap='nowrap'>
              <Grid item>
                <Card sx={{
                  border: 'none',
                  boxShadow: 'none'
                }}>
                  <CardHeader
                    avatar={
                      <Tooltip title={USERNAME}>
                        <Avatar src={Parse.User.current().get("image")?.url()}> {USERNAME.charAt(0).toUpperCase()} </Avatar>
                      </Tooltip>
                    }
                    title={
                      <>
                        {!isSmallerMD && <Typography align='center' sx={{ maxWidth: 200, height: 40, display: 'flex', alignItems: 'center', overflow: 'hidden', }}>
                          {USERNAME}
                        </Typography>}
                      </>
                    }
                    sx={{
                      py: '0',
                      px: '0',
                    }}
                  />
                </Card>
              </Grid>
              <Grid item>
                <ResponsiveButton title="Çıkış Yap" endIcon={<i class="fa-solid fa-arrow-right-from-bracket"></i>} variant="contained" onClick={() => doUserLogOut()} size='small' />
              </Grid>
            </Grid>
          </Grid>



        </Toolbar>
      </AppBar>
      <Drawer variant="permanent"
        sx={{
          width: SIDEBAR_WIDTH,
          // flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: SIDEBAR_WIDTH, boxSizing: 'border-box' },
          display: { xs: 'none', md: 'block' },
        }}>
        <DrawerContent appBarHeight={APP_BAR_HEIGHT} data={data} />
      </Drawer>
      <Drawer variant='temporary' open={drawerOpen} onClose={() => setDrawerOpen(!drawerOpen)}
        sx={{
          width: SIDEBAR_WIDTH,
          // flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: SIDEBAR_WIDTH, boxSizing: 'border-box' },
          display: { xs: 'block', md: 'none' },
        }}>
        <DrawerContent appBarHeight={APP_BAR_HEIGHT} data={data} handleClick={()=> setDrawerOpen(false)}/>
        <Stack height='100%' justifyContent="flex-end" alignItems="center" p={1}>
          <IconTooltipButton title='Kapat' icon={<i class="fa-solid fa-xmark"></i>} onClick={()=> setDrawerOpen(false)}/>
        </Stack>
      </Drawer>
      <Box
        sx={{
          marginTop: APP_BAR_HEIGHT,
          padding: 3,
          width: '100%',
          height: '100%'
        }}>
        {props.title &&
          <Box sx={{ marginBottom: 3 }}>
            <Typography component="h1" variant="h2"> {props.title} </Typography>
            <Divider />
          </Box>}
        {/* {props.children} */}
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          rowSpacing={1}
        >
          {React.Children.map(childrenArray, (child, index) => {
            return (
              <Grid item sx={{ width: '100%' }}>
                {child}
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box >
  )
}

export default DashboardBox
