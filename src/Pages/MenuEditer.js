import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import Parse from 'parse/dist/parse.min.js';
import { Accordion, CardHeader, AccordionDetails, AccordionSummary, Avatar, Box, Button, Grid, IconButton,  List, ListItem,  Tooltip, Typography, Card, CardContent, TextField,  CircularProgress, Container, Stack, useMediaQuery, Menu, MenuItem } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ConfirmationBox from '../Components/ConfirmationBox';
import InputAdornment from '@mui/material/InputAdornment';
import EditableText from '../Components/EditableText';
import Loading from '../Components/Loading';
import UploadLabel from '../Components/UploadLabel';
import ResponsiveButton from '../Components/ResposiveButton';
import { IconTooltipButton } from '../Components/IconTooltipButton';
import { useTheme } from '@emotion/react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { SketchPicker } from 'react-color';
import { setLocalDatastoreController } from 'parse';
import { getMenu } from '../utils/utils';
///////////////////////////////////////////////////////// COMPONENETS //////////////////////////////////////////////////
const ItemAccordion = ({ buttons, editMode, expanded, handleExpand, itemElement, itemChange, catIdx, itemIdx, data, iconPermissions, setIconPermissions }) => {

  const [updatedItem, setUpdatedItem] = useState("");
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [vegan, setVegan] = useState(itemElement.permissions?.vegan ? itemElement.permissions?.vegan : false);
  const [glass, setGlass] = useState(itemElement.permissions?.glass ? itemElement.permissions?.glass : false);
  const [star, setStar] = useState(itemElement.permissions?.star ? itemElement.permissions?.star : false);
  const [fire, setFire] = useState(itemElement.permissions?.fire ? itemElement.permissions?.fire : false);
  const [hot_beverage, setHot_beverage] = useState(itemElement.permissions?.hot_beverage ? itemElement.permissions?.hot_beverage : false);
  const [hot_pepper, setHot_pepper] = useState(itemElement.permissions?.hot_pepper ? itemElement.permissions?.hot_pepper : false);

  useEffect(() => {
    setVegan(itemElement.permissions?.vegan ? itemElement.permissions?.vegan : false);
    setGlass(itemElement.permissions?.glass ? itemElement.permissions?.glass : false);
    setStar(itemElement.permissions?.star ? itemElement.permissions?.star : false);
    setFire(itemElement.permissions?.fire ? itemElement.permissions?.fire : false);
    setHot_beverage(itemElement.permissions?.hot_beverage ? itemElement.permissions?.hot_beverage : false);
    setHot_pepper(itemElement.permissions?.hot_pepper ? itemElement.permissions?.hot_pepper : false);
  }, [editMode])

  const addIcon = async (name, checked) => {
    if (name == "vegan") { setVegan(checked); }
    if (name == "glass") { setGlass(checked); }
    if (name == "star") { setStar(checked); }
    if (name == "fire") { setFire(checked); }
    if (name == "hot_beverage") { setHot_beverage(checked); }
    if (name == "hot_pepper") { setHot_pepper(checked); }
    setIconPermissions(oldArray => [...oldArray, [itemElement.objectId, name, checked]]);
    // iconPermissions.push([itemElement.objectId, name, checked]);
   
   
   
  }

  const accordionStyle = {
    width: '100%',
    border: (theme) => `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }

  const accordionSummaryStyle = {
    p: 0,
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
  }

  const expandIcon = (
    <IconButton onClick={() => handleExpand()}>
      <i class="fa-solid fa-angle-right"></i>
    </IconButton>
  )

  const trLiraAdornment = (
    <InputAdornment position="start">
      <i class="fa-solid fa-turkish-lira-sign"></i>
    </InputAdornment>
  )

  const UploadedAvatar = () => {
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    const removeFile = async (itemId, catIdx, itemIdx) => {
      try {
        setIsSaving(true)
        let Item = Parse.Object.extend("Item")
        let itemQuery = new Parse.Query(Item)
        let itemElement = await itemQuery.get(itemId)
        itemElement.set("image", null);
        data[1][catIdx][itemIdx].image = {}
        await itemElement.save();
        setIsSaving(false)
      } catch (error) {
        alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
      }
    }
    const storeFile = async (id, file) => {
      try {
        setUpdatedItem(id);
        setIsSaving(true);
        var name = file.name;
        let newFile = await toBase64(file);
        var parseFile = new Parse.File(name, { base64: newFile });
        let Item = Parse.Object.extend("Item");
        let itemQuery = new Parse.Query(Item);
        let item = await itemQuery.get(id);
        item.set("image", parseFile);
        await item.save();
        data[1][catIdx][itemIdx].image = await item.get("image");
      } catch (error) {
        alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
      }
      setIsSaving(false);
    }
    return (
      <div>
        <ConfirmationBox openBox={isSaving} title={<Typography variant="h6">Kaydediyor</Typography>}>
          <Container sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
            <CircularProgress color='primary' size={32} />
          </Container>
        </ConfirmationBox>
        <ConfirmationBox openBox={open} onClose={() => setOpen(false)} maxWidth='false'>
          {itemElement.image ?
            <Box component='img' src={updatedItem === itemElement.objectId ? data[1][catIdx][itemIdx].image._url : itemElement.image?.url} sx={{ maxWidth: '100%' }} />
            :
            <Typography> NO IMAGE </Typography>
          }
        </ConfirmationBox>
        {editMode ?
          <Stack direction='row' spacing={1}>
            <Avatar sx={{ width: 60, height: 60 }}>
              <UploadLabel getFileOnChange={(file) => {
                storeFile(itemElement.objectId, file);
               
              }}>
                <IconButton component='span'>
                  <i class="fa-solid fa-camera"></i>
                </IconButton>
              </UploadLabel>
            </Avatar>
            <Button onClick={() => removeFile(itemElement.objectId, catIdx, itemIdx)}>resmi kaldır</Button>
          </Stack>
          :
          <Avatar sx={{ width: 60, height: 60 }} src={updatedItem !== itemElement.objectId ? (itemElement.image ? data[1][catIdx][itemIdx].image.url : itemElement.name) : data[1][catIdx][itemIdx].image?._url} onClick={() => { setOpen(true); }}> {itemElement.name} </Avatar>
        }
      </div>
    );
  }
  return (
    <Accordion expanded={expanded} square elevation={0} disableGutters sx={accordionStyle}>
      <AccordionSummary sx={accordionSummaryStyle}>
        <Grid container alignItems="center" wrap='nowrap' p={1} columnSpacing={1}>
          <Grid item xs={1} zeroMinWidth>
            {expandIcon}
          </Grid>
          <Grid item xs={6}>
            <EditableText title="İsim" isEditing={editMode} value={itemElement.name} handleChange={(value) => itemChange(value, 'name')}
              TextFieldProps={{ fullWidth: true }} />
          </Grid>
          <Grid item xs={true}>
            <EditableText title="Ücret" isEditing={editMode} value={itemElement.price} handleChange={(value) => itemChange(value, 'price')}
              TextFieldProps={{ InputProps: { startAdornment: trLiraAdornment }, fullWidth: true }} />
          </Grid>
          <ResponsiveIconButton_GridItems buttons={buttons} />
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Grid container p={1} alignItems="center" columnSpacing={1}>
          <Grid item xs={1} zeroMinWidth></Grid>
          <Grid item xs={6}>
            <UploadedAvatar />
          </Grid>
          <Grid item xs={true}>
            <EditableText title="İçindekiler" isEditing={editMode} value={itemElement.ingredients} handleChange={(value) => itemChange(value, 'ingredients')}
              TextFieldProps={{ multiline: true, fullWidth: true }} />
          </Grid>
        </Grid>
        <Grid container mt={1}>
          {/* <Grid item xs={1} zeroMinWidth></Grid> */}
          <Grid item xs display='flex' justifyContent='center'>
            {editMode ?
              <FormControl>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="top"
                    control={
                      <Checkbox checked={glass} onChange={(event) => addIcon("glass", event.target.checked)} />}
                    label={
                      <i class="fa-solid fa-martini-glass"></i>
                    }
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="start"
                    control={<Checkbox checked={hot_beverage} onChange={(event) => addIcon("hot_beverage", event.target.checked)} />}
                    label={
                      <i class="fa-solid fa-mug-hot"></i>
                    }
                    labelPlacement="top"
                  />
                  <Tooltip title='VEGAN'>
                    <FormControlLabel
                      value="bottom"
                      control={<Checkbox checked={vegan} onChange={(event) => addIcon("vegan", event.target.checked)} />}
                      label={
                        <i class="fa-solid fa-seedling"></i>
                      }
                      labelPlacement="top"
                    />
                  </Tooltip>
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={star} onChange={(event) => addIcon("star", event.target.checked)} />}
                    label={
                      <i class="fa-solid fa-star"></i>
                    }
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={fire} onChange={(event) => addIcon("fire", event.target.checked)} disabled={!editMode} />}
                    label={
                      <i class="ri-fire-fill"></i>
                    }
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={hot_pepper} onChange={(event) => addIcon("hot_pepper", event.target.checked)} disabled={!editMode} />}
                    label={
                      <i class="fa-solid fa-pepper-hot"></i>
                    }
                    labelPlacement="top"
                  />
                </FormGroup>
              </FormControl>
              :
              <FormControl>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="top"
                    control={<Checkbox checked={itemElement.permissions?.glass ? itemElement.permissions.glass : false} onChange={(event) => addIcon("glass", event.target.checked)} disabled />}
                    label={
                      <i class="fa-solid fa-martini-glass"></i>
                    }
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="start"
                    // hot_beverage
                    control={<Checkbox checked={itemElement.permissions?.hot_beverage ? itemElement.permissions.hot_beverage : false} onChange={(event) => addIcon("hot_beverage", event.target.checked)} disabled />}
                    label={
                      <i class="fa-solid fa-mug-hot"></i>
                    }
                    labelPlacement="top"
                  />
                  <Tooltip title='VEGAN'>
                    <FormControlLabel
                      value="bottom"
                      control={<Checkbox checked={itemElement.permissions?.vegan ? itemElement.permissions.vegan : false} onChange={(event) => addIcon("vegan", event.target.checked)} disabled />}
                      label={
                        <i class="fa-solid fa-seedling"></i>
                      }
                      labelPlacement="top"
                    />
                  </Tooltip>
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={itemElement.permissions?.star ? itemElement.permissions.star : false} onChange={(event) => addIcon("star", event.target.checked)} disabled />}
                    label={
                      <i class="fa-solid fa-star"></i>
                    }
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={itemElement.permissions?.fire ? itemElement.permissions.fire : false} onChange={(event) => addIcon("fire", event.target.checked)} disabled />}
                    label={
                      <i class="ri-fire-fill"></i>
                    }
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox checked={itemElement.permissions?.hot_pepper ? itemElement.permissions.hot_pepper : false} onChange={(event) => addIcon("hot_pepper", event.target.checked)} disabled />}
                    label={
                      <i class="fa-solid fa-pepper-hot"></i>
                    }
                    labelPlacement="top"
                  />
                </FormGroup>
              </FormControl>
            }
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

const ResponsiveIconButton_GridItems = ({ buttons, color }) => {
  const smallerSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const gridItemStyle = {
    '& 	.MuiIconButton-root': {
      color: { color }
    }
  }

  const PositionedMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <IconTooltipButton
          title="Seçenekler"
          id="demo-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          icon={<i class="fa-solid fa-ellipsis-vertical"></i>}
        />
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {buttons?.map((button) => (
            <MenuItem onClick={handleClose}>{button}</MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  if (smallerSM)
    return (
      <Grid item xs='auto' sx={gridItemStyle}>
        <PositionedMenu />
      </Grid>
    );

  return (
    <>
      {buttons?.map((button) => (
        <Grid item xs='auto' sx={gridItemStyle}>
          {button}
        </Grid>
      ))}
    </>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const MenuEditer = () => {
  const [loading, setLoading] = useState(true);
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [currIdx, setCurrIdx] = useState(-1);
  const [currId, setCurrId] = useState("");
  const [edit, setEdit] = useState(false);
  const [currentItemId, setCurrentItemId] = useState("");
  const [currentChangeName, setCurrentChangeName] = useState("");
  const [currentChangePrice, setCurrentChangePrice] = useState("");
  const [currentChangeIngredients, setCurrentChangeIngredients] = useState("");
  const [currentChangeCategory, setCurrentChangeCategory] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [openCat, setOpenCat] = useState(-1); // to open and close category accordion
  const [editCat, setEditCat] = useState(-1); // to edit category name
  const [categoryName, setCategoryName] = useState("");
  const [openItemIndex, setOpenItemIndex] = useState(-1);
  const [image, setImage] = useState('');
  const [isItemAdding, setIsItemAdding] = useState(false);
  const [openCatAdd, setOpenCatAdd] = useState(false);
  const [catName, setCatName] = useState("");
  const [iconPermissions, setIconPermissions] = useState([])
  const [openColorBox, setOpenColorBox] = useState(false);
  const [data, setData] = useState(null);
  const [primaryColor, setPrimaryColor] = useState({
    
  })
  const [secondaryColor, setSecondaryColor] = useState({

  })
  const [menuBackgroundColor, setMenuBackgroundColor] = useState({

  }) 

  //const { data, loading, error } = useFetch("http://localhost:3001/category/deneme");
  let history = useNavigate();
  const getData = async () => {
    let d = await getMenu(Parse.User.current()._getId());
    setData(d);
   
    setLoading(false);
  }

  const is_auth = async () =>{
    let currentUserRole = await Parse.User.current().get("level");
    let Role = Parse.Object.extend("Role");
    const query = new Parse.Query(Role);
    query.equalTo('name', currentUserRole);
   
    let role = await query.find().first();
   
    let is_authorized = await role.get("menuItemEdit");
   
    if(!is_authorized){
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
      history('infosortdashboard.b4a.app/log-in');
    }
  }

  useEffect(()=>{
    is_auth()
    getData()
    setRGB()
  }, []);
  //let iconPermissions = [];
  const theme = useTheme();
  const itemChange = async (value, attr) => {
    if (attr === "name") setCurrentChangeName(value);
    if (attr === "price") setCurrentChangePrice(value);
    if (attr === "ingredients") setCurrentChangeIngredients(value);
    if (attr === "category") setCurrentChangeCategory(value);

  }
  const addItem = async (catId, catIdx, e, type) => {
    if(type == "mouseClick" || (e.charCode == 13 && type == "enter")){
      try {
        let priority = 0;
        if (data[1][catIdx].length !== 0) { priority = data[1][catIdx].length; }
        let Category = Parse.Object.extend('Category');
        let categoryQuery = new Parse.Query(Category);
        let category = await categoryQuery.get(catId);
        let relation = category.relation("items");
        let Item = Parse.Object.extend('Item');
        let item = new Item();
        item.set("name", currentChangeName);
        item.set("price", currentChangePrice);
        item.set("ingredients", currentChangeIngredients);
        item.set("priority", priority);
        item.set("categoryId", catId);
        if (currentChangeName !== "" && currentChangePrice !== 0) { await item.save(); }
        setCurrentChangeName("");
        setCurrentChangePrice("");
        setCurrentChangeIngredients("");
        setIsSaving(true);
        data[1][catIdx].push({ objectId: item._getId(), name: currentChangeName, price: currentChangePrice, ingredients: currentChangeIngredients, class: "item", priority: priority, permissions: {} })
        setIsSaving(false);
        relation.add(item);
        await category.save();
      } catch (error) {
        alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
      }
      setIsItemAdding(false);
    }
  }
  const deleteCategory = async (id, index) => {
    try {
      let Category = Parse.Object.extend('Category');
      let categoryQuery = new Parse.Query(Category);
      let category = await categoryQuery.get(id);
      await category.destroy();
      setIsSaving(true);
      await data[0].splice(index, 1);
      await data[1].splice(index, 1);
      setIsSaving(false);
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
    }
  }
  const editCategory = async (catIdx, catId, e, type) => {
    if(type=="mouseClick" || (e.charCode == 13 && type=="enter")){
      let Category = Parse.Object.extend('Category');
      let categoryQuery = new Parse.Query(Category);
      let category = await categoryQuery.get(catId);
      if (categoryName != "") {
        category.set("name", categoryName);
        setCategoryName('');
        await category.save();
        setIsSaving(true);
        data[0][catIdx].name = categoryName;
        setIsSaving(false);
      }
      setEditCat(false);
    }
  }
  const addCategory = async (e,type) => {
    if(type == "mouseClick" || (e.charCode == 13 && type=="enter")){
      try {
        setIsSaving(true);
        let user = Parse.User.current();
        let companyQuery = user.get('company').query()
        let companyList = await companyQuery.find()
        let company = companyList[0];
        let menuQuery = company.get("menu").query();
        let menuList = await menuQuery.find()
        let menu = menuList[0];
        let categoryRelation = menu.relation("categories");
        let Category = Parse.Object.extend('Category');
        let category = new Category();
        category.set("name", catName);
        setCatName('');
        let priority = 0;
        if (data[0].length !== 0) { priority = data[0][data[0].length - 1].priority + 1; }
       
        category.set("priority", priority);
        await category.save();
        await categoryRelation.add(category);
        await menu.save();
        setIsSaving(false);
        setIsSaving(true);
        await data[0].push({ objectId: category._getId(), name: catName, class: "category", priority: priority })
        await data[1].push([]);
        setIsSaving(false);
        setOpenCatAdd(false);
      } catch (error) {
        alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
      }
    }
  }

  const saveMenu = async (id, catIdx, itemIdx) => {
    setEdit(false);
    try {
      let Item = Parse.Object.extend('Item');
      let itemQuery = new Parse.Query(Item);
      let item = await itemQuery.get(id);
      if (currentChangeIngredients !== "") item.set('ingredients', currentChangeIngredients);
      if (currentChangeName !== "") item.set('name', currentChangeName);
      if (currentChangePrice !== "") {item.set('price', currentChangePrice); }
     
     
      for (let i = 0; i < iconPermissions.length; i++) {
        const element = iconPermissions[i];
        if (element[0] === id) {
          data[1][catIdx][itemIdx].permissions[element[1]] = element[2];
        }
      }
      item.set("permissions", data[1][catIdx][itemIdx].permissions);
      await item.save();
      setIsSaving(true);
      data[1][catIdx][itemIdx].objectId = item._getId();
      if (currentChangeIngredients !== "") data[1][catIdx][itemIdx].ingredients = currentChangeIngredients;
      if (currentChangeName !== "") data[1][catIdx][itemIdx].name = currentChangeName;
      if (currentChangePrice !== "") data[1][catIdx][itemIdx].price = currentChangePrice;
      setCurrentChangeIngredients("")
      setCurrentChangeName("")
      setCurrentChangePrice("")
      setIsSaving(false);
      setIconPermissions([]);
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
    }
    // }
  }
  const cancelEdit = async () => {
    setEdit(false);
    setCurrentItemId("");
    setCurrentChangeName("");
    setCurrentChangeIngredients("");
    setCurrentChangePrice("");
  }
  const editMenu = async (id) => {
    setEdit(true);
    setCurrentItemId(id);
  }
  const deleteItem = async (id, catIdx, itemIdx) => {
    setIsSaving(true);
    const index = data[1][catIdx].indexOf(itemIdx);
    await data[1][catIdx].splice(itemIdx, 1);
    setIsSaving(false);
    let Item = Parse.Object.extend('Item');
    let itemQuery = new Parse.Query(Item);
    let item = await itemQuery.get(id);
    await item.destroy();
  }
  const cancelUpdatedList = async () => {
    window.location.reload();
  }
  const saveUpdatedList = async () => {
    let Item = Parse.Object.extend('Item');
    let itemQuery = new Parse.Query(Item);
    setIsSaving(true);
    for (let catI = 0; catI < data[0].length; catI++) {
      for (let itemI = 0; itemI < data[1][catI].length; itemI++) {
        let id = data[1][catI][itemI].objectId;
        let item = await itemQuery.get(id);
        item.set("priority", itemI);
        await item.save();
      }
    }
    setIsSaving(false);
  }
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  const storeFile = async (id, file, catIdx) => {
    try {
      setUpdatedCategory(id);
      setIsSaving(true);
      var name = file.name;
      let newFile = await toBase64(file);
      var parseFile = new Parse.File(name, { base64: newFile });
      let Category = Parse.Object.extend("Category");
      let categoryQuery = new Parse.Query(Category);
      let category = await categoryQuery.get(id);
      category.set("image", parseFile);
      await category.save();
     
      data[0][catIdx].image = await category.get("image");
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
    }
    setIsSaving(false);
  }

  const saveColors = async () => {
    try {
    let user = Parse.User.current();
    let companyQuery = user.get('company').query()
    let companyList = await companyQuery.find()
    let company = companyList[0];
    let menuQuery = company.get("menu").query();
    let menuList = await menuQuery.find()
    let menu = menuList[0]; 
    menu.set("primaryColor", primaryColor);
    menu.set("secondaryColor", secondaryColor);
    menu.set("backgroundColor", menuBackgroundColor);
    await menu.save();
    setOpenColorBox(false);
    } catch (error) {
      alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
    }
  }
  const setRGB = async () => {
    let user = Parse.User.current();
    let companyQuery = user.get('company').query()
    let companyList = await companyQuery.find()
    let company = companyList[0];
    let menuQuery = company.get("menu").query();
    let menuList = await menuQuery.find()
    let menu = menuList[0]; 
    setPrimaryColor(menu.get("primaryColor"));
    setSecondaryColor(menu.get("secondaryColor"));
    setMenuBackgroundColor(menu.get("backgroundColor"));
  }

  const onDragEnd = (param) => {
   
    const srcI = param.source.index;
    const desI = param.destination.index;
    const idOfCat = param.destination.droppableId;
    let indexofCat;
    for (let i = 0; i < data[0].length; i++) {
      const element = data[0][i];
      if (element.objectId === idOfCat) {
        indexofCat = i;
      }
    }
    data[1][indexofCat].splice(desI, 0, data[1][indexofCat].splice(srcI, 1)[0]);
  };

  const catButtons = (catIdx, catElement) => {
    if (editCat === catIdx)
      return (
        [
          <UploadLabel getFileOnChange={(file) => {
            storeFile(catElement.objectId, file, catIdx);
           
          }}>
            <IconTooltipButton title="Yeni Resim Ekle" icon={<i class="fa-solid fa-camera"></i>} component='span' />
          </UploadLabel>,
          <IconTooltipButton title="Kaydet" disabled={!categoryName} icon={<i class="fa-solid fa-floppy-disk"></i>} onClick={() => editCategory(catIdx, catElement?.objectId, null, "mouseClick")} />,
          <IconTooltipButton title="İptal Et" icon={<i class="fa-solid fa-x"></i>} onClick={() => setEditCat(-1)} />,
        ]
      );

    return (
      [
        <IconTooltipButton title="Yeni Ürün Ekle" icon={<i class="fa-solid fa-plus"></i>} onClick={() => { setCurrIdx(catIdx); setCurrId(catElement.objectId); setIsItemAdding(true) }} />,
        <IconTooltipButton title="Düzenle" onClick={() => { setCategoryName(""); setEditCat(catIdx) }} icon={<i class="fa-regular fa-pen-to-square"></i>} />,
        <IconTooltipButton title="Sil" icon={<i class="fa-solid fa-trash-can"></i>} onClick={() => deleteCategory(catElement.objectId, catIdx)} />
      ]
    );
  }

  if (loading) {
    return (
      <Loading />
    );
  }
  return (
    <div>
      <ConfirmationBox
        openBox={isSaving}
        title={<Typography variant="h6">Kaydediyor</Typography>}
      >
        <Container sx={{ display: "flex", justifyContent: "center", py: 1 }}>
          <CircularProgress color="primary" size={32} />
        </Container>
      </ConfirmationBox>
      <ConfirmationBox
        openBox={openCatAdd}
        title="Yeni kategori ekle"
        context={
          <TextField
            fullWidth
            label={"Kategori ismi"}
            onKeyPress={(event) => addCategory(event, "enter")}
            onChange={(event) => setCatName(event.target.value)}
            size="small"
          />
        }
      >
        <Button
          size="small"
          variant="contained"
          onClick={() => addCategory(null, "mouseClick")}
          startIcon={<i class="fa-solid fa-floppy-disk"></i>}
          disabled={!catName}
        >
          Kaydet
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => setOpenCatAdd(false)}
        >
          Çıkış
        </Button>
      </ConfirmationBox>
      <Stack direction="row" spacing={1} padding={1}>
        <ResponsiveButton
          title="Yeni Kategori Ekle"
          size="small"
          variant="contained"
          onClick={() => setOpenCatAdd(true)}
          startIcon={<i class="fa-solid fa-plus"></i>}
        />
        <ResponsiveButton
          title="Yeni Sıralamayı Kaydet"
          size="small"
          variant="contained"
          onClick={() => saveUpdatedList()}
          startIcon={<i class="fa-solid fa-floppy-disk"></i>}
        />
        <ResponsiveButton
          title="Sıralamayı İptal Et"
          size="small"
          variant="outlined"
          onClick={() => cancelUpdatedList()}
          startIcon={<i class="fa-solid fa-x"></i>}
        />
        <ResponsiveButton
          title="Renkleri Düzenle"
          size="small"
          variant="contained"
          onClick={() => setOpenColorBox(true)}
          startIcon={<i class="fa-solid fa-palette"></i>}
        />
      </Stack>
      {data?.map((dataElement, dataIdx) => (
        <div>
          {dataIdx === 0
            ? data[0].map((catElement, catIdx) => (
                <>
                  <ConfirmationBox
                    openBox={isItemAdding}
                    title={`Yeni ürün ekle: ${catElement.name}`}
                    context={
                      <>
                        <TextField
                          fullWidth
                          label={"İsim"}
                          onKeyPress={(event)=>addItem(currId, currIdx, event, "enter")}
                          onChange={(event) =>
                            itemChange(event.target.value, "name")
                          }
                          size="small"
                        />
                        <TextField
                          fullWidth
                          label={"Fiyat"}
                          onKeyPress={(event)=>addItem(currId, currIdx, event, "enter")}
                          onChange={(event) =>
                            itemChange(event.target.value, "price")
                          }
                          size="small"
                        />
                        <TextField
                          fullWidth
                          label={"İçindekiler"}
                          onKeyPress={(event)=>addItem(currId, currIdx, event, "enter")}
                          onChange={(event) =>
                            itemChange(event.target.value, "ingredients")
                          }
                          size="small"
                        />
                      </>
                    }
                  >
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                       
                        addItem(currId, currIdx, null, "mouseClick");
                      }}
                      disabled={!currentChangeName || !(!isNaN(currentChangePrice) && parseInt(currentChangePrice)>0)}
                      startIcon={<i class="fa-solid fa-plus"></i>}
                    >
                      Yeni Ürün Ekle
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setIsItemAdding(false);
                        setCurrentChangeName("");
                        setCurrentChangePrice("");
                        setCurrentChangeIngredients("");
                      }}
                    >
                      Çıkış
                    </Button>
                  </ConfirmationBox>
                  <Accordion
                    elevation={0}
                    disableGutters
                    expanded={openCat === catIdx}
                  >
                    <AccordionSummary
                      sx={{
                        borderRadius: "15px",
                        minHeight: "unset",
                        padding: "0 0",
                        ".MuiAccordionSummary-content": { margin: "0 0" },
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          borderRadius: "15px",
                          backgroundImage: catElement.image
                            ? catElement.objectId === updatedCategory
                              ? "url(" + catElement.image?._url + ")"
                              : "url(" + catElement.image?.url + ")"
                            : "url('https://www.colorhexa.com/2a4365.png')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <Grid
                          container
                          wrap="nowrap"
                          sx={{
                            borderRadius: "15px",
                            backdropFilter: "blur(3px)",
                            padding: 2,
                          }}
                        >
                          <Grid item xs="auto">
                            {openCat === catIdx ? (
                              <IconTooltipButton
                                title="Kapat"
                                color="secondary"
                                onClick={() => {
                                  setOpenCat(-1);
                                  setOpenItemIndex(-1);
                                }}
                                icon={<i class="fa-solid fa-circle-minus"></i>}
                              />
                            ) : (
                              <IconTooltipButton
                                title="Aç"
                                color="secondary"
                                onClick={() => setOpenCat(catIdx)}
                                icon={<i class="fa-solid fa-circle-plus"></i>}
                              />
                            )}
                          </Grid>
                          <Grid item xs zeroMinWidth>
                            {editCat === catIdx ? (
                              <Box
                                sx={{
                                  backgroundColor: "rgba(255,255,255, 0.8);",
                                  borderRadius: "15px",
                                  width: "fit-content",
                                  p: 1,
                                }}
                              >
                                <TextField
                                  defaultValue={catElement.name}
                                  label="Kategori İsmi"
                                  variant="standard"
                                  onKeyPress={(event)=>editCategory(catIdx, catElement.objectId, event, "enter")}
                                  onChange={(event) =>
                                    setCategoryName(event.target.value)
                                  }
                                  size="small"
                                />
                              </Box>
                            ) : (
                              <Typography
                                variant="h5"
                                sx={{ color: theme.palette.secondary.main }}
                              >
                                {catElement.name}
                              </Typography>
                            )}
                          </Grid>
                          <ResponsiveIconButton_GridItems
                            color={theme.palette.secondary.main}
                            buttons={catButtons(catIdx, catElement)}
                          />
                        </Grid>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        <Box>
                          <DragDropContext
                            onDragEnd={(param) => onDragEnd(param)}
                          >
                            <List disablePadding>
                              <Droppable
                                key={catElement.objectId}
                                droppableId={catElement.objectId}
                                index={catIdx}
                              >
                                {(provided, _) => (
                                  <Box
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                  >
                                    {data[1][catIdx].map(
                                      (itemElement, itemIdx) => (
                                        <Draggable
                                          key={itemElement.objectId}
                                          draggableId={itemElement.objectId}
                                          index={itemIdx}
                                        >
                                          {(provided, snapshot) => (
                                            <ListItem
                                              disablePadding
                                              disableGutters
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              sx={{
                                                bgcolor: "white",
                                                boxShadow: snapshot.isDragging
                                                  ? "0 0 .4rem #666"
                                                  : "none",
                                              }}
                                            >
                                              <ItemAccordion
                                                expanded={
                                                  openItemIndex === itemIdx &&
                                                  openCat === catIdx
                                                }
                                                editMode={
                                                  edit === true &&
                                                  currentItemId ===
                                                    itemElement.objectId
                                                }
                                                handleExpand={() => {
                                                  openItemIndex === itemIdx
                                                    ? setOpenItemIndex(-1)
                                                    : setOpenItemIndex(itemIdx);
                                                }}
                                                itemElement={itemElement}
                                                itemChange={(value, attr) => {
                                                  itemChange(value, attr);
                                                }}
                                                buttons={
                                                  edit === true &&
                                                  currentItemId ===
                                                    itemElement.objectId
                                                    ? [
                                                        <IconTooltipButton
                                                          title="Değişiklikleri Kaydet"
                                                          icon={
                                                            <i class="fa-solid fa-floppy-disk"></i>
                                                          }
                                                          onClick={() =>
                                                            saveMenu(
                                                              itemElement?.objectId,
                                                              catIdx,
                                                              itemIdx
                                                            )
                                                          }
                                                          disabled={!currentChangeName || !(!isNaN(currentChangePrice) && parseInt(currentChangePrice)>0)}
                                                        />,
                                                        <IconTooltipButton
                                                          title="Değişiklikleri İptal Et"
                                                          icon={
                                                            <i class="fa-solid fa-x"></i>
                                                          }
                                                          onClick={() =>
                                                            cancelEdit()
                                                          }
                                                        />,
                                                      ]
                                                    : [
                                                        <IconTooltipButton
                                                          title="Düzenle"
                                                          icon={
                                                            <i class="fa-regular fa-pen-to-square"></i>
                                                          }
                                                          onClick={() => {
                                                           
                                                            setCurrentChangeIngredients(itemElement.ingredients)
                                                            setCurrentChangePrice(itemElement.price)
                                                            setCurrentChangeName(
                                                              itemElement.name
                                                            );
                                                            editMenu(
                                                              itemElement?.objectId
                                                            );
                                                          }}
                                                        />,
                                                        <IconTooltipButton
                                                          title="Sil"
                                                          icon={
                                                            <i class="fa-solid fa-trash-can"></i>
                                                          }
                                                          onClick={() =>
                                                            deleteItem(
                                                              itemElement?.objectId,
                                                              catIdx,
                                                              itemIdx
                                                            )
                                                          }
                                                        />,
                                                      ]
                                                }
                                                catIdx={catIdx}
                                                itemIdx={itemIdx}
                                                data={data}
                                                iconPermissions={
                                                  iconPermissions
                                                }
                                                setIconPermissions={
                                                  setIconPermissions
                                                }
                                              />
                                            </ListItem>
                                          )}
                                        </Draggable>
                                      )
                                    )}
                                    {provided.placeholder}
                                  </Box>
                                )}
                              </Droppable>
                            </List>
                          </DragDropContext>
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </>
              ))
            : ""}
        </div>
      ))}
      <ConfirmationBox
        openBox={openColorBox}
        title={"Renkleri Düzenle"}
        context={
          <>
            <Card>
              <CardHeader
                title="Birincil Renk"
                titleTypographyProps={{ variant: "h6" }}
              />
              <CardContent>
                <SketchPicker
                  color={primaryColor}
                  onChange={(color) => {
                    setPrimaryColor(color.rgb);
                  }}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="İkincil Renk"
                titleTypographyProps={{ variant: "h6" }}
              />
              <CardContent>
                <SketchPicker
                  color={secondaryColor}
                  onChange={(color) => {
                    setSecondaryColor(color.rgb);
                  }}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="Arkaplan Rengi"
                titleTypographyProps={{ variant: "h6" }}
              />
              <CardContent>
                <SketchPicker
                  color={menuBackgroundColor}
                  onChange={(color) => {
                    setMenuBackgroundColor(color.rgb);
                  }}
                />
              </CardContent>
            </Card>
          </>
        }
      >
        <Button onClick={() => saveColors()}> Kaydet</Button>
        <Button onClick={() => setOpenColorBox(false)}>İptal</Button>
      </ConfirmationBox>
    </div>
  );
}

export default MenuEditer;

{/* <Card>
              <CardHeader title='Birincil Renk' titleTypographyProps={{variant: 'h6'}}/>
              <CardContent>
                <Typography>
                  R
                </Typography>
                <Slider
                  size="small"
                  defaultValue={primaryColor.r}
                  aria-label="R"
                  valueLabelDisplay="auto"
                  max={255}
                  sx={{color: 'red'}}
                  onChange = {(event)=> setPrimaryColor({...primaryColor, "r":event.target.value})}
                />
                <Typography>
                  G
                </Typography>
                <Slider
                  size="small"
                  defaultValue={primaryColor.g}
                  aria-label="G"
                  max={255}
                  valueLabelDisplay="auto"
                  sx={{color: 'green'}}
                  onChange = {(event)=> setPrimaryColor({...primaryColor, "g":event.target.value})}
                />
                <Typography>
                  B
                </Typography>
                <Slider
                  size="small"
                  defaultValue={primaryColor.b}
                  aria-label="B"
                  valueLabelDisplay="auto"
                  max={255}
                  sx={{color: 'blue'}}
                  onChange = {(event)=> setPrimaryColor({...primaryColor, "b":event.target.value})}
                />
              <Box sx={{backgroundColor: 'rgb('+primaryColor.r+','+primaryColor.g+','+primaryColor.b+')', width: 75, height: 75}}/>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title='İkincil Renk' titleTypographyProps={{variant: 'h6'}}/>
              <CardContent>
              <Typography>
                  R
                </Typography>
              <Slider
                  size="small"
                  defaultValue={secondaryColor.r}
                  aria-label="R"
                  valueLabelDisplay="auto"
                  max={255}
                  sx={{color: 'red'}}
                  onChange = {(event)=> setSecondaryColor({...secondaryColor, "r":event.target.value})}
                />
                <Typography>
                  G
                </Typography>
                <Slider
                  size="small"
                  defaultValue={secondaryColor.g}
                  aria-label="G"
                  valueLabelDisplay="auto"
                  max={255}
                  sx={{color: 'green'}}
                  onChange = {(event)=> setSecondaryColor({...secondaryColor, "g":event.target.value})}
                />
                <Typography>
                  B
                </Typography>
                <Slider
                  size="small"
                  defaultValue={secondaryColor.b}
                  aria-label="B"
                  valueLabelDisplay="auto"
                  max={255}
                  sx={{color: 'blue'}}
                  onChange = {(event)=> setSecondaryColor({...secondaryColor, "b":event.target.value})}
                />
              <Box sx={{backgroundColor: 'rgb('+secondaryColor.r+','+secondaryColor.g+','+secondaryColor.b+')', width: 75, height: 75}}/>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title='Arkaplan Rengi' titleTypographyProps={{variant: 'h6'}}/>
              <CardContent>
              <Typography>
                  R
                </Typography>
              <Slider
                  size="small"
                  defaultValue={menuBackgroundColor.r}
                  aria-label="R"
                  valueLabelDisplay="auto"
                  sx={{color: 'red'}}
                  max={255}
                  onChange = {(event)=> setMenuBackgroundColor({...menuBackgroundColor, "r":event.target.value})}
                />
                <Typography>
                  G
                </Typography>
                <Slider
                  size="small"
                  defaultValue={menuBackgroundColor.g}
                  aria-label="G"
                  valueLabelDisplay="auto"
                  sx={{color: 'green'}}
                  max={255}
                  onChange = {(event)=> setMenuBackgroundColor({...menuBackgroundColor, "g":event.target.value})}
                />
                <Typography>
                  B
                </Typography>
                <Slider
                  size="small"
                  defaultValue={menuBackgroundColor.b}
                  aria-label="B"
                  valueLabelDisplay="auto"
                  sx={{color: 'blue'}}
                  max={255}
                  onChange = {(event)=> setMenuBackgroundColor({...menuBackgroundColor, "b":event.target.value})}
                />
                <Box sx={{backgroundColor: 'rgb('+menuBackgroundColor.r+','+menuBackgroundColor.g+','+menuBackgroundColor.b+')', width: 75, height: 75}}/>
                
              </CardContent>
            </Card> */}