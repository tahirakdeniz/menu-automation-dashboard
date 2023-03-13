import React, {useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ConfirmationBox from "../../../Components/ConfirmationBox";
import UploadLabel from "../../../Components/UploadLabel";
import {addIcon, removeFile, storeFileItem} from "../menuEditerUtils";
import EditableText from "../../../Components/EditableText";
import {ResponsiveIconButton_GridItems} from "./ResponsiveIconButtonGridItems";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export const ItemAccordion = ({
                                  buttons,
                                  editMode,
                                  expanded,
                                  handleExpand,
                                  itemElement,
                                  itemChange,
                                  catIdx,
                                  itemIdx,
                                  data,
                                  iconPermissions,
                                  setIconPermissions
                              }) => {

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
    const itemChange = async (value, attr) => {
        if (attr === "name") setCurrentChangeName(value);
        if (attr === "price") setCurrentChangePrice(value);
        if (attr === "ingredients") setCurrentChangeIngredients(value);
        if (attr === "category") setCurrentChangeCategory(value);
    }

    const editMenu = async (id) => {
        setEdit(true);
        setCurrentItemId(id);
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

        return (
            <div>
                <ConfirmationBox openBox={isSaving} title={<Typography variant="h6">Kaydediyor</Typography>}>
                    <Container sx={{display: 'flex', justifyContent: 'center', py: 1}}>
                        <CircularProgress color='primary' size={32}/>
                    </Container>
                </ConfirmationBox>
                <ConfirmationBox openBox={open} onClose={() => setOpen(false)} maxWidth='false'>
                    {itemElement.image ?
                        <Box component='img'
                             src={updatedItem === itemElement.objectId ? data[1][catIdx][itemIdx].image._url : itemElement.image?.url}
                             sx={{maxWidth: '100%'}}/>
                        :
                        <Typography> NO IMAGE </Typography>
                    }
                </ConfirmationBox>
                {editMode ?
                    <Stack direction='row' spacing={1}>
                        <Avatar sx={{width: 60, height: 60}}>
                            <UploadLabel getFileOnChange={(file) => {
                                storeFileItem(itemElement.objectId, file);

                            }}>
                                <IconButton component='span'>
                                    <i class="fa-solid fa-camera"></i>
                                </IconButton>
                            </UploadLabel>
                        </Avatar>
                        <Button onClick={() => removeFile(itemElement.objectId, catIdx, itemIdx)}>resmi kaldır</Button>
                    </Stack>
                    :
                    <Avatar sx={{width: 60, height: 60}}
                            src={updatedItem !== itemElement.objectId ? (itemElement.image ? data[1][catIdx][itemIdx].image.url : itemElement.name) : data[1][catIdx][itemIdx].image?._url}
                            onClick={() => {
                                setOpen(true);
                            }}> {itemElement.name} </Avatar>
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
                        <EditableText title="İsim" isEditing={editMode} value={itemElement.name}
                                      handleChange={(value) => itemChange(value, 'name')}
                                      TextFieldProps={{fullWidth: true}}/>
                    </Grid>
                    <Grid item xs={true}>
                        <EditableText title="Ücret" isEditing={editMode} value={itemElement.price}
                                      handleChange={(value) => itemChange(value, 'price')}
                                      TextFieldProps={{
                                          InputProps: {startAdornment: trLiraAdornment},
                                          fullWidth: true
                                      }}/>
                    </Grid>
                    <ResponsiveIconButton_GridItems buttons={buttons}/>
                </Grid>
            </AccordionSummary>
            <AccordionDetails sx={{p: 0}}>
                <Grid container p={1} alignItems="center" columnSpacing={1}>
                    <Grid item xs={1} zeroMinWidth></Grid>
                    <Grid item xs={6}>
                        <UploadedAvatar/>
                    </Grid>
                    <Grid item xs={true}>
                        <EditableText title="İçindekiler" isEditing={editMode} value={itemElement.ingredients}
                                      handleChange={(value) => itemChange(value, 'ingredients')}
                                      TextFieldProps={{multiline: true, fullWidth: true}}/>
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
                                            <Checkbox checked={glass}
                                                      onChange={(event) => addIcon("glass", event.target.checked)}/>}
                                        label={
                                            <i class="fa-solid fa-martini-glass"></i>
                                        }
                                        labelPlacement="top"
                                    />
                                    <FormControlLabel
                                        value="start"
                                        control={<Checkbox checked={hot_beverage}
                                                           onChange={(event) => addIcon("hot_beverage", event.target.checked)}/>}
                                        label={
                                            <i class="fa-solid fa-mug-hot"></i>
                                        }
                                        labelPlacement="top"
                                    />
                                    <Tooltip title='VEGAN'>
                                        <FormControlLabel
                                            value="bottom"
                                            control={<Checkbox checked={vegan}
                                                               onChange={(event) => addIcon("vegan", event.target.checked)}/>}
                                            label={
                                                <i class="fa-solid fa-seedling"></i>
                                            }
                                            labelPlacement="top"
                                        />
                                    </Tooltip>
                                    <FormControlLabel
                                        value="end"
                                        control={<Checkbox checked={star}
                                                           onChange={(event) => addIcon("star", event.target.checked)}/>}
                                        label={
                                            <i class="fa-solid fa-star"></i>
                                        }
                                        labelPlacement="top"
                                    />
                                    <FormControlLabel
                                        value="end"
                                        control={<Checkbox checked={fire}
                                                           onChange={(event) => addIcon("fire", event.target.checked)}
                                                           disabled={!editMode}/>}
                                        label={
                                            <i class="ri-fire-fill"></i>
                                        }
                                        labelPlacement="top"
                                    />
                                    <FormControlLabel
                                        value="end"
                                        control={<Checkbox checked={hot_pepper}
                                                           onChange={(event) => addIcon("hot_pepper", event.target.checked)}
                                                           disabled={!editMode}/>}
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
                                        control={<Checkbox
                                            checked={itemElement.permissions?.glass ? itemElement.permissions.glass : false}
                                            onChange={(event) => addIcon("glass", event.target.checked)} disabled/>}
                                        label={
                                            <i class="fa-solid fa-martini-glass"></i>
                                        }
                                        labelPlacement="top"
                                    />
                                    <FormControlLabel
                                        value="start"
                                        // hot_beverage
                                        control={<Checkbox
                                            checked={itemElement.permissions?.hot_beverage ? itemElement.permissions.hot_beverage : false}
                                            onChange={(event) => addIcon("hot_beverage", event.target.checked)}
                                            disabled/>}
                                        label={
                                            <i class="fa-solid fa-mug-hot"></i>
                                        }
                                        labelPlacement="top"
                                    />
                                    <Tooltip title='VEGAN'>
                                        <FormControlLabel
                                            value="bottom"
                                            control={<Checkbox
                                                checked={itemElement.permissions?.vegan ? itemElement.permissions.vegan : false}
                                                onChange={(event) => addIcon("vegan", event.target.checked)} disabled/>}
                                            label={
                                                <i class="fa-solid fa-seedling"></i>
                                            }
                                            labelPlacement="top"
                                        />
                                    </Tooltip>
                                    <FormControlLabel
                                        value="end"
                                        control={<Checkbox
                                            checked={itemElement.permissions?.star ? itemElement.permissions.star : false}
                                            onChange={(event) => addIcon("star", event.target.checked)} disabled/>}
                                        label={
                                            <i class="fa-solid fa-star"></i>
                                        }
                                        labelPlacement="top"
                                    />
                                    <FormControlLabel
                                        value="end"
                                        control={<Checkbox
                                            checked={itemElement.permissions?.fire ? itemElement.permissions.fire : false}
                                            onChange={(event) => addIcon("fire", event.target.checked)} disabled/>}
                                        label={
                                            <i class="ri-fire-fill"></i>
                                        }
                                        labelPlacement="top"
                                    />
                                    <FormControlLabel
                                        value="end"
                                        control={<Checkbox
                                            checked={itemElement.permissions?.hot_pepper ? itemElement.permissions.hot_pepper : false}
                                            onChange={(event) => addIcon("hot_pepper", event.target.checked)}
                                            disabled/>}
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