import React, {useEffect, useState} from 'react'
import {Accordion, AccordionDetails, Box, Button, List, ListItem, Stack, TextField} from '@mui/material';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import ConfirmationBox from '../../Components/ConfirmationBox';
import Loading from '../../Components/Loading';
import UploadLabel from '../../Components/UploadLabel';
import ResponsiveButton from '../../Components/ResposiveButton';
import {IconTooltipButton} from '../../Components/IconTooltipButton';
import {useTheme} from '@emotion/react';
import {
    addCategory,
    addItem,
    cancelEdit,
    cancelUpdatedList,
    deleteCategory,
    deleteItem,
    editCategory,
    editMenu,
    itemChange,
    saveColors,
    saveMenu,
    saveUpdatedList,
    storeFileCategory
} from './menuEditerUtils'
import EditColorConfirmationBox from './Components/EditColorConfirmationBox';
import ProgressConfirmationBox from '../../Components/ProgressConfirmationBox';
import {ItemAccordion} from "./Components/ItemAccordion";
import {AddNewItemConfirmationBox} from "./Components/AddNewItemConfirmationBox";
import * as PropTypes from "prop-types";
import {CategoryAccordionSummary} from "./Components/CategoryAccordionSummary";
import {AddNewCatConfirmationBox} from "./Components/AddNewCatConfirmationBox";

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
    const theme = useTheme();

    useEffect(() => {
        is_auth()
        getData()
        setRGB()
    }, []);
    //let iconPermissions = [];

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
                        storeFileCategory(catElement.objectId, file, catIdx);

                    }}>
                        <IconTooltipButton title="Yeni Resim Ekle" icon={<i class="fa-solid fa-camera"></i>}
                                           component='span'/>
                    </UploadLabel>,
                    <IconTooltipButton title="Kaydet" disabled={!categoryName}
                                       icon={<i class="fa-solid fa-floppy-disk"></i>}
                                       onClick={() => editCategory(catIdx, catElement?.objectId, null, "mouseClick")}/>,
                    <IconTooltipButton title="İptal Et" icon={<i class="fa-solid fa-x"></i>}
                                       onClick={() => setEditCat(-1)}/>,
                ]
            );

        return (
            [
                <IconTooltipButton title="Yeni Ürün Ekle" icon={<i class="fa-solid fa-plus"></i>} onClick={() => {
                    setCurrIdx(catIdx);
                    setCurrId(catElement.objectId);
                    setIsItemAdding(true)
                }}/>,
                <IconTooltipButton title="Düzenle" onClick={() => {
                    setCategoryName("");
                    setEditCat(catIdx)
                }} icon={<i class="fa-regular fa-pen-to-square"></i>}/>,
                <IconTooltipButton title="Sil" icon={<i class="fa-solid fa-trash-can"></i>}
                                   onClick={() => deleteCategory(catElement.objectId, catIdx)}/>
            ]
        );
    }

    if (loading) {
        return (
            <Loading/>
        );
    }

    return (
        <div>
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
                                <AddNewItemConfirmationBox
                                    open={isItemAdding}
                                    catElement={catElement}
                                    onKeyPress={(event) => addItem(currId, currIdx, event, "enter")}
                                    onSaveClick={(name, price, ingredients) => addItem(currId, currIdx, null, "mouseClick")}
                                    onCancelClick={() => setIsItemAdding(false)}
                                />
                                <Accordion
                                    elevation={0}
                                    disableGutters
                                    expanded={openCat === catIdx}
                                >
                                    <CategoryAccordionSummary
                                        catElement={catElement}
                                        updatedCategory={updatedCategory}
                                        openCat={openCat}
                                        catIdx={catIdx}
                                        onCloseClick={() => {
                                            setOpenCat(-1);
                                            setOpenItemIndex(-1);
                                        }}
                                        onOpenClick={() => setOpenCat(catIdx)}
                                        editCat={editCat}
                                        onKeyPress={(event) => editCategory(catIdx, catElement.objectId, event, "enter")}
                                        onChange={(event) => setCategoryName(event.target.value)}
                                        theme={theme}
                                        buttons={catButtons(catIdx, catElement)}
                                    />
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
                                                                                            boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
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
                                                                                                            icon={<i class="fa-solid fa-floppy-disk"></i>}
                                                                                                            onClick={() => saveMenu(itemElement?.objectId, catIdx, itemIdx )}
                                                                                                            disabled={!currentChangeName || !(!isNaN(currentChangePrice) && parseInt(currentChangePrice) > 0)}
                                                                                                        />,
                                                                                                        <IconTooltipButton
                                                                                                            title="Değişiklikleri İptal Et"
                                                                                                            icon={ <i class="fa-solid fa-x"></i> }
                                                                                                            onClick={() => cancelEdit()}
                                                                                                        />,
                                                                                                    ]
                                                                                                    : [
                                                                                                        <IconTooltipButton
                                                                                                            title="Düzenle"
                                                                                                            icon={<i class="fa-regular fa-pen-to-square"></i>}
                                                                                                            onClick={() => {
                                                                                                                setCurrentChangeIngredients(itemElement.ingredients)
                                                                                                                setCurrentChangePrice(itemElement.price)
                                                                                                                setCurrentChangeName( itemElement.name);
                                                                                                                editMenu(itemElement?.objectId);
                                                                                                            }}
                                                                                                        />,
                                                                                                        <IconTooltipButton
                                                                                                            title="Sil"
                                                                                                            icon={<i class="fa-solid fa-trash-can"></i>}
                                                                                                            onClick={() => deleteItem(itemElement?.objectId, catIdx, itemIdx )}
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

            <EditColorConfirmationBox
                open={openColorBox}
                onCancelClick={() => setOpenColorBox(false)}
                onSaveClick={(primary, secondary, background) => (saveColors(primary, secondary, background))}
            />

            <ProgressConfirmationBox open={isSaving}/>

            {/*TODO edit props and functions */}
            <AddNewCatConfirmationBox open={openCatAdd} onKeyPress={(event) => addCategory(event, "enter")} onSaveClick={(name) => null} onCancelClick={() => null}/>
        </div>
    );
}

export default MenuEditer;