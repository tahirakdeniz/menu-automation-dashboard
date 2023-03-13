import React, { useState } from 'react'
import Parse from 'parse/dist/parse.min.js';
import {Stack} from '@mui/material'
import ResponsiveButton from '../../../Components/ResposiveButton'
import { AddNewCatConfirmationBox } from './AddNewCatConfirmationBox'
import { useCategories, useItems} from '../customHooks/useMenuElementsContext'
import EditColorConfirmationBox from './EditColorConfirmationBox'
import {useItemsDispatch} from '../customHooks/useMenuElementsContext'
import { ITEM_ACTIONS } from '../customHooks/useMenuReducer';

const ButtonStack = () => {
  const itemDispatch = useItemsDispatch()
  const categories = useCategories();
  const items = useItems();
  const [openAddCatBox, setOpenAddCatBox] = useState(false)
  const [openEditColorBox, setOpenEditColorBox] = useState(false)
  const saveUpdatedList = async () => {
    let Item = Parse.Object.extend('Item');
    let itemQuery = new Parse.Query(Item);

    for (let catI = 0; catI < categories.length; catI++) {
      const queryPromises =  items[catI].map( async (itemAtCatI, idx)=>{
        let id = itemAtCatI.objectId;
        let item = await itemQuery.get(id);
        item.set("priority", idx);
        await item.save();
      })
      //for (let itemI = 0; itemI < items[catI].length; itemI++) {
      //  let id = items[catI][itemI].objectId;
      //  let item = await itemQuery.get(id);
      //  item.set("priority", itemI);
      //  await item.save();
      //}
      await Promise.all(queryPromises)
    }
    itemDispatch({type : ITEM_ACTIONS.INITIALIZE, list: items});
  }

  return (
    <>
      <Stack direction="row" spacing={1} padding={1}>
        <ResponsiveButton
          title="Yeni Kategori Ekle"
          size="small"
          variant="contained"
          onClick={() => setOpenAddCatBox(true)}
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
          onClick={() => window.location.reload()}
          startIcon={<i class="fa-solid fa-x"></i>}
        />
        <ResponsiveButton
          title="Renkleri Düzenle"
          size="small"
          variant="contained"
          onClick={() => setOpenEditColorBox(true)}
          startIcon={<i class="fa-solid fa-palette"></i>}
        />
      </Stack>
      <AddNewCatConfirmationBox 
        open={openAddCatBox}
        closeBox = {() => setOpenAddCatBox(false)}
      />
      <EditColorConfirmationBox
        open={openEditColorBox}
        closeBox={() => setOpenEditColorBox(false)}
      />
    </>
  )
}

export default ButtonStack