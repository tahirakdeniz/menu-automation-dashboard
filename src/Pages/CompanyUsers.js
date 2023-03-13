import React, { useEffect, useState } from 'react'
import Header from "../Components/common/header/header";/// IGNORE THIS PAGE
import useFetch from './useFetch';
import Parse from 'parse/dist/parse.min.js';
import EntryPageInput from '../Components/EntryPageInput';
import { Box, Container, ListItemIcon, ListItem, ListItemText, List, ListItemButton, Collapse, Select, MenuItem, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Autocomplete, TextField, TableFooter, IconButton, Button, FormControl, CircularProgress, Stack, TablePagination, Pagination, Input, InputLabel, Chip, Tooltip, Grid } from '@mui/material';
import ConfirmationBox from '../Components/ConfirmationBox';
import DashboardBox from '../Components/common/DashboardBox';
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  DataGrid,
  useGridApiContext,
  useGridSelector,
  GridFooter,
  GridFooterPlaceholder,
  GridPanelFooter,
  GridFooterContainer,
  trTR,
} from '@mui/x-data-grid';
import { Role } from 'parse';
import Loading from '../Components/Loading';
import ResponsiveButton from '../Components/ResposiveButton';
import { IconTooltipButton } from '../Components/IconTooltipButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getUsersandRoles } from '../utils/utils';
///////////////////////////////////////////////// FOR DATA GRID //////////////////////////////////////////////////
const CustomToolbar = ({ handleUserClick, handleLevelClick }) => {
  return (
    <GridToolbarContainer sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'start', gap: 1 }}>
      <Stack direction='row' spacing={2}>
        <ResponsiveButton title='Yeni Kullanıcı Ekle ' variant='contained' onClick={handleUserClick} startIcon={<i class="fa-solid fa-user-plus"></i>} size='small' />
        <ResponsiveButton title='Yeni Ünvan Ekle' variant='contained' onClick={handleLevelClick} startIcon={<i class="fa-solid fa-chart-bar"></i>} size='small' />
      </Stack>
      <GridToolbarQuickFilter />
      <GridToolbarFilterButton />
      {/* <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport /> */}
    </GridToolbarContainer>
  );
}
const CustomFooter = ({ }) => {
  return (
    <GridFooterContainer>
      <Grid container wrap='nowrap' alignItems='center'>
        <Grid item xs='auto'>
          <GridToolbarColumnsButton />
        </Grid>
        <Grid item xs='auto'>
          <GridToolbarDensitySelector />
        </Grid>
        <Grid item xs='auto'>
          <GridToolbarExport />
        </Grid>
        <Grid item xs>
          <GridFooter sx={{
            border: 'none',
            '&	.MuiTablePagination-root': {
              overflow: 'visible',
            }
          }} />
        </Grid>
      </Grid>
      {/**/}

    </GridFooterContainer>
  );
  //     const apiRef = useGridApiContext();
  //     const { state, apiRef, options } = useGridSlotComponentProps();
  //     TablePagination
  //           count={state.pagination.rowCount}
  //           page={state.pagination.page}
  //           onPageChange={(event, value) => apiRef.current.setPage(value)}
  //           rowsPerPage={options.pageSize}
  //           rowsPerPageOptions={[]}
  //       />
}
const LevelEditComponent = (props) => {
  const { id, value, field, data } = props;
  const apiRef = useGridApiContext();

  const handleChange = (event, newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: event.target.value });
  };

  return (
    <Select
      value={value}
      onChange={(event, newValue) => handleChange(event, newValue)}
      labelId=""
      id=""
      label="Role Edit"
      defaultValue=""
    >
      {
        data[1].map((role) => (
          <MenuItem value={role.name}>{role.name}</MenuItem>
        ))}
    </Select>
  );

  // const handleRef = (element) => {
  //   // if (element) {
  //   //   const input = element.querySelector<HTMLInputElement>(
  //   //     `input[value="${value}"]`
  //   //   );
  //   //   // input?.focus();
  //   // }
  // };
}
///////////////////////////////////////////////////////////////////////////////////////////////////

///// user ekleme çıkarma butonu ekle /////////////
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
const powers = [
  "Edit Menu Style",
  "Add/Delete Users",
  "Edit Menu",
  "Alter Shift",
  "Add/Delete Table",
  "Cancel Notification"
]
const roles = [//company rollerinden cekeceksin
  "admin",
  "hr",
  "waiter",
  "sdgsdgsd"
]

export const CompanyUsers = () => {
  const [openLevel, setOpenLevel] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [userName, setUserName] = useState("")
  const [userLastName, setUserLastName] = useState("")
  //const { data, loading, error } = useFetch("http://localhost:3001/user/deneme");
  const [open, setOpen] = useState(-1);
  const [openButton, setOpenButton] = useState(false);
  const [rol, setRole] = useState("");
  const [settedIdx, setSettedIdx] = useState(-1);
  const [addedRole, setAddedRole] = useState("");
  const [levelName, setLevelName] = useState("");
  const [powerName, setPowerName] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [rows, setRows] = useState([]);
  const matchesPagLabel = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [data, setData] = useState(null);

  const getData = async () => {
    let d = await getUsersandRoles(Parse.User.current()._getId());
    setData(d);
   
  }


  useEffect(()=>{
   
    getData();
   
  },[]);
  ////////////////////////////////////////////////////////// FOR DATA GRID ////////////////////////////////////////////////
  const handleEditClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  }
  const handleSaveClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  }
  const handleCancelClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } });
  }
  const handleDeleteClick = async (id) => {
    const User = new Parse.User();
    let userQuery = new Parse.Query(User);
    let user = await userQuery.get(id);
    try {
      await user.destroy();
      // window.location.reload();
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
    }
    setRows(rows.filter((row) => row.objectId !== id));
    // data[0] = data[0].filter((row) => row.objectId !== id);
   
   
  }
  const toTry_Rows = [
    { username: "aaa", level: 'bbb', lastname: 'ccc' },
    { username: "aa1", level: 'bbb', lastname: 'cc1' },
    { username: "aa2", level: 'bbb', lastname: 'cc2' },
    { username: "aa3", level: 'bbb', lastname: 'cc3' },
    { username: "aa4", level: 'bbb', lastname: 'cc4' },
    { username: "aa5", level: 'bbb', lastname: 'cc5' },
  ]
  const dataGridColumn = [
    { field: 'username', headerName: 'Kullanıcı Adı', flex: 4 },
    { field: 'name', headerName: 'İsim', flex: 4 },
    { field: 'lastname', headerName: 'Soy İsim', flex: 4 },
    {
      field: 'level', headerName: 'Ünvan', editable: true, flex: 2,
      renderEditCell: (params) => {
        return (
          <LevelEditComponent {...params} data={data} />
        );
      }
    },
    {
      field: 'actions_SaveAndDelete',
      type: 'actions',
      flex: 0.3,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        // IS EDITING BUTTONS:
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<i class="fa-solid fa-floppy-disk"></i>}
              label="Save"
              onClick={() => handleSaveClick(id)}
              color="primary"
            />
          ]
        }
        // NORMAL BUTTONS:
        return [
          <GridActionsCellItem
            icon={<i class="fa-solid fa-pen"></i>}
            label="Edit"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />
        ]
      }
    },
    {
      field: 'actions_CancelAndDelete',
      type: 'actions',
      flex: 0.3,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<i class="fa-solid fa-x"></i>}
              label="Cancel"
              // className="textPrimary"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem
            icon={<i class="fa-solid fa-trash-can"></i>}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ]

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleChange = (event) => {
    for (let i = 0; i < event.target.value.length; i++) {

    }
    setPowerName(event.target.value);
  }

  const cancelAssigning = () => {
    setOpenButton(false);
    setSettedIdx(-1);
  }

  const buttonFunc = (role, idx) => {
    setOpenButton(true);
    setRole(role);
    setSettedIdx(idx);
    setOpen(-1);
  }

  const assignLevel = async (id) => {
    const User = new Parse.User();
    let userQuery = new Parse.Query(User);
    let user = await userQuery.get(id);
    try {
      var acl = new Parse.ACL();
      acl.setPublicReadAccess(true);
      acl.setWriteAccess(Parse.User.current().id, true);
      user.setACL(acl);
      await user.save();
      user.set("level", rol);
      await user.save();
      setOpenButton(false);
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
    }
  }

  const handleClick = async (idx) => {
    idx === open ? setOpen(-1) : setOpen(idx);
  };

  String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
  }

  const convertNonturkishString = function(str) {
    for (let i = 0; i < str.length; i++) {
      const element = str[i];
      if(element == "İ" || element == "ı") str = str.replaceAt(i,"i");
      if(element == "ü" || element == "Ü") str = str.replaceAt(i,"u");
      if(element == "ö" || element == "Ö") str = str.replaceAt(i, "o");
      if(element == "ğ" || element == "Ğ") str = str.replaceAt(i,"g");
      if(element == "Ş" || element == "ş") str = str.replaceAt(i,"s");
      if(element == "Ç" || element == "ç") str = str.replaceAt(i,"c");
    }
    return str;
  }

  const addCustomLevel = async (e, type) => {// create role row in this function
    if(type=="mouseClick" || (e.charCode == 13 && type == "enter")){
      try {
        let is_hr = false;
        let companyQuery = Parse.User.current().get("company").query();
        let companyList = await companyQuery.find();
        let rolesRelation = companyList[0].relation("roles");
        let role = new Parse.Role();
        for (let i = 0; i < powerName.length; i++) {
          const element = powerName[i];
          if (element === "Edit Menu Style") {
            role.set("menuStyleEdit", true);
          }
          if (element === "Add/Delete Users") {
            is_hr = true;
            role.set("userManipulation", true);
          }
          if (element === "Edit Menu") {
            role.set("menuItemEdit", true);
          }
          if (element === "Alter Shift") {
            role.set("shiftManipulation", true);
          }
          if (element === "Add/Delete Table") {
            role.set("tableManipulation", true);
          }
          if (element === "Cancel Notification") {
            role.set("notificationCancel", true);
          }
        }
        var lvlName = convertNonturkishString(levelName)
        role.set("name", lvlName);
        var acl = new Parse.ACL();
        acl.setPublicReadAccess(true);
        acl.setPublicWriteAccess(true);
        role.setACL(acl);
        await role.save();
        if(is_hr){
          let User = new Parse.User();
          var clp = new Parse.CLP();
          clp.setReadAccess(role, true);
          clp.setWriteAccess(role, true);
         
         
          // Parse.User.setCLP(clp);
          // await User.save();    
      }
        rolesRelation.add(role);
        await companyList[0].save();
        data[1] = data[1].concat([{ name: levelName }])
        setOpenLevel(false);
      } catch (error) {
        alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
        setOpenLevel(false);
      }
    }
  }
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
  const addUser = async (e, type) => {
    if(type=="mouseClick" || (e.charCode == 13 && type == "enter")){
      try {
        let companyQuery = Parse.User.current().get("company").query();
        let companyList = await companyQuery.find();
        var user = new Parse.User();
        user.set("username", userName);
        user.set("password", userName);
        //user.set("lastname", userLastName);
        user.set("level", addedRole);
        setUserName("");
        setUserLastName("");
        let relation = user.relation("company");
        relation.add(companyList[0]);
        var acl = new Parse.ACL();
        acl.setPublicReadAccess(true);
        acl.setPublicWriteAccess(true);
        user.setACL(acl);
        await user.save();
        let query = new Parse.Query(Parse.Role);
        await query.equalTo("name", addedRole);
        let roleObj = await query.first();
        let userRelation = roleObj.relation('users');
        roleObj.set("name","garson");
        userRelation.add(user);
        await roleObj.save();
       
        setRows(rows.concat([{ username: userName, lastname: userLastName, level: addedRole, objectId: user._getId() }]))
        let relation2 = companyList[0].relation("users");
        relation2.add(user);
        await companyList[0].save();
        setOpenUser(false)
      } catch (error) {
        alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
        setOpenUser(false)
      }
    }
  };

  const deleteUser = async (id) => {
    const User = new Parse.User();
    let userQuery = new Parse.Query(User);
    let user = await userQuery.get(id);
    try {
      await user.destroy();
      window.location.reload();
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
    }
  };

  const processRowUpdate = async (newRow, oldRow) => {
    try {
      const User = new Parse.User();
      let userQuery = new Parse.Query(User);
      let user = await userQuery.get(newRow.objectId);
      var acl = new Parse.ACL();
      acl.setPublicReadAccess(true);
      acl.setPublicWriteAccess(true);
      //await acl.save();
     
      await user.setACL(acl);
      await user.save();
      user.set("level", newRow.level);
      await user.save();
      let query = new Parse.Query(Parse.Role);
      await query.equalTo("name", newRow.level);
      let roleObj = await query.first();
      let userRelation = roleObj.relation('users');
      userRelation.add(user);
      await roleObj.save();
      let query2 = new Parse.Query(Parse.Role);
      await query2.equalTo("name", oldRow.level);
      let roleObj2 = await query2.first();
      let userRelation2 = roleObj2.relation('users');
      userRelation2.remove(user);
      await roleObj2.save();
      setOpenButton(false);
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
    }

   
   
   
    setRows(rows.map((row) => (row.objectId === newRow.objectId ? newRow : row)));
    return newRow
  }

  if (!data) {
    return (
      <Loading />
    );
  }

  if (data[0].length && !rows.length) setRows(data[0])
  return (
    <div>
      <ConfirmationBox
        //accept={() => doUserRegistration()} notAccept={() => notAccept()} 
        openBox={openLevel}
        title={"Ünvan oluştur"}
        context={
          <Stack spacing={1}>
            <EntryPageInput onKeyPress={(event)=>addCustomLevel(event, "enter")} required="required" sx={{ width: 200 }} label="Yeni Ünvan Adı" onChange={(event) => setLevelName(event.target.value)} />
            <FormControl>
              <InputLabel id="edit-power-select-label">Rollerini seç</InputLabel>
              <Select
                labelId="edit-power-select-label"
                id="demo-multiple-checkbox"
                multiple
                value={powerName}
                variant={'outlined'}
                onChange={handleChange}
                input={<OutlinedInput label="Edit Power" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {powers.map((power) => (
                  <MenuItem key={power} value={power}>
                    <Checkbox checked={powerName.indexOf(power) > -1} />
                    <ListItemText primary={power} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        }
      >
        <Button disabled={!levelName} autoFocus onClick={() => addCustomLevel(null, "mouseClick")}>
          Kaydet
        </Button>
        <Button onClick={() => { setOpenLevel(false); }} autoFocus>
          Çık
        </Button>
      </ConfirmationBox>

      <ConfirmationBox
        //accept={() => doUserRegistration()} notAccept={() => notAccept()} 
        openBox={openUser}
        title={"Kullanıcı oluştur"}
        context={
          <Stack spacing={1}>
            <TextField onKeyPress={(event)=>addUser(event, "enter")} required="required" sx={{ width: 180 }} label="kullanıcı adı" onChange={(event) => setUserName(event.target.value)} />
            {/*<TextField required="required" sx={{ width: 180 }} label="new user last name" onChange={(event) => setUserLastName(event.target.value)} />*/}
            <FormControl>
              <InputLabel id='role-select'> Rol Seç</InputLabel>
              <Select
                labelId='role-select'
                label='Rol Seç'
                value={addedRole}
                onChange={(event) => setAddedRole(event.target.value)}
              >
                {data[1].map((role) => (
                  <MenuItem value={role.name}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        }
      >
        <Button disabled={!userName || !addedRole} autoFocus onClick={() => addUser(null, "mouseClick")}>
          Kaydet
        </Button>
        <Button onClick={() => setOpenUser(false)} autoFocus>
          Çık
        </Button>
      </ConfirmationBox>
      <DataGrid
        autoHeight
        disableSelectionOnClick
        rowsPerPageOptions={[10, 25, 50, 100]}
        rows={rows}
        // rows={toTry_Rows}
        columns={dataGridColumn}
        getRowId={(item) => item.objectId}
        initialState={{
          pagination: {
            pageSize: 10,
          }
        }}
        components={{
          Toolbar: CustomToolbar,
          Footer: CustomFooter,
          BaseButton: ResponsiveButton,
        }}
        componentsProps={{
          toolbar: {
            handleUserClick: () => setOpenUser(true),
            handleLevelClick: () => { setOpenLevel(true); setPowerName([]) }
          },
          baseButton: {
            breakpoint: 'md'
          },
          pagination: {
            labelRowsPerPage: (matchesPagLabel ? 'Satır:' : 'Sayfa başına satır:')  
          }
        }}
        editMode="row"
        rowModesModel={rowModesModel}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`)}
        experimentalFeatures={{ newEditingApi: true }}
        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
      />
    </div>
  )
}

// ############################### PAST CODES:

{/* <h1>Company Users Page</h1>
    <Container
      maxWidth={false}
      sx={{
        marginTop: '100px',
        maxWidth: '800px'
      }}>
      <Box>
        <List>
          {
            data?.map((item, idx) => (
              <ListItem>
                <ListItemText>Name : {item?.name} Last Name : {item?.lastname}</ListItemText>
                <ListItemButton sx={{ innerWidth: 10 }} onClick={() => handleClick(idx)}>
                  {idx === settedIdx ? <ListItemText>{rol}</ListItemText> : <ListItemText>{item.level ? item.level : "Level atamak için tıklayın"}</ListItemText>}
                  <ListItemIcon>{">"}</ListItemIcon>
                </ListItemButton>
                <Collapse component="li" in={open === idx} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {roles.map((role) => (
                      <ListItemButton onClick={() => buttonFunc(role, idx)}>
                        <ListItemText>{role}</ListItemText>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
                <ListItemButton onClick={() => deleteUser(item?.id)}>
                  Delete this user
                </ListItemButton>
                {openButton && idx === settedIdx ? (<ListItemButton onClick={() => assignLevel(item?.id)}>Kaydet</ListItemButton>) : ("")}
                {openButton && idx === settedIdx ? (<ListItemButton onClick={() => cancelAssigning()}>İptal et</ListItemButton>) : ("")}
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Container>
    <div>
      <EntryPageInput required="required" sx={{ width: 180 }} label="new user name" onChange={(event) => setUserName(event.target.value)} />
      <EntryPageInput required="required" sx={{ width: 180 }} label="new user last name" onChange={(event) => setUserLastName(event.target.value)} />
      <Select value={addedRole} onChange={(event) => setAddedRole(event.target.value)}>
        {roles.map((role) => (
          <MenuItem value={role}>
            {role}
          </MenuItem>
        ))}
      </Select>
      <Button onClick={() => addUser()}>add user</Button>
    </div> */}


{/* <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
          {data?.map((item, idx) => (
        <TableBody>
        {idx === 0 ? (
              data[0].map((user, userIdx)=>(
                <TableRow>
                <TableCell>{user?.username}</TableCell>
                <TableCell>{user?.lastname}</TableCell>
                <TableCell>
                  <Button onClick={() => handleClick(userIdx)} endIcon={">"}>
                    {userIdx === settedIdx ? rol : user.level ? user.level : "Level atamak için tıklayın"}
                  </Button>
                  {openButton && userIdx === settedIdx ? (<IconButton onClick={() => assignLevel(user?.objectId)}>K</IconButton>) : ("")}
                  {openButton && userIdx === settedIdx ? (<IconButton onClick={() => cancelAssigning()}>C</IconButton>) : ("")}
                  <Collapse in={open === userIdx} timeout="auto" unmountOnExit>
                    <List disablePadding>
                      {data[1].map((role) => (
                        <ListItemButton onClick={() => buttonFunc(role.name, userIdx)}>
                          <ListItemText>{role.name}</ListItemText>
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteUser(user?.objectId)}>
                    del_icon
                  </IconButton>
                </TableCell>
              </TableRow> 
              
              ))
            ) : (
              <TableRow>
            <TableCell><EntryPageInput required="required" sx={{ width: 180 }} label="new user name" onChange={(event) => setUserName(event.target.value)} /></TableCell>
            <TableCell><EntryPageInput required="required" sx={{ width: 180 }} label="new user last name" onChange={(event) => setUserLastName(event.target.value)} /></TableCell>
            <TableCell>
              <Select value={addedRole} onChange={(event) => setAddedRole(event.target.value)}>
                {data[1].map((role) => (
                  <MenuItem value={role.name}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell><Button onClick={() => addUser()}>add user</Button></TableCell>
          </TableRow>
            )}
        </TableBody>
          ))}
        <TableFooter>
          <TableRow>
            <TableCell><EntryPageInput required="required" sx={{ width: 180 }} label="new level name" onChange={(event) => setLevelName(event.target.value)} /></TableCell>
            <TableCell>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={powerName}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {powers.map((power) => (
                  <MenuItem key={power} value={power}>
                    <Checkbox checked={powerName.indexOf(power) > -1} />
                    <ListItemText primary={power} />
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell><Button onClick={() => addCustomLevel()}>Create Level</Button></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer> */}
