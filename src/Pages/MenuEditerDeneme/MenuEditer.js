import React, { useEffect, useLayoutEffect, useState } from 'react'
import { getMenu } from '../../utils/utils';
import Parse from 'parse/dist/parse.min.js';
import { CategoriesContext, CategoriesDispatchContext, ItemsDispatchContext, ItemsContext} from './customHooks/useMenuElementsContext';
import { useMenuReducer } from './customHooks/useMenuReducer';
import ButtonStack from './Components/ButtonStack';
import { CircularProgress } from '@mui/material';
import   MenuElements   from './Components/MenuElements'

const  MenuEditer = () => {
  console.log("MENU EDITER RENDERED")
  const { categoryDispatch, itemDispatch, menuItems, menuCategories, loading} = useMenuReducer();
  console.log(loading)

  if (loading)
    return (
    <>
      <CircularProgress/>
    </> )

  return (
    <>
    AA
      <CategoriesContext.Provider value={menuCategories}>
        <ItemsContext.Provider value={menuItems}>
          <CategoriesDispatchContext.Provider value={categoryDispatch}>
            <ItemsDispatchContext.Provider value={itemDispatch} >
              <ButtonStack/>
              <MenuElements/>
              <div></div>
                <div>
                  {loading ? <div>loasdf</div> : null}
                  
                </div>
            </ItemsDispatchContext.Provider>
          </ CategoriesDispatchContext.Provider>
        </ ItemsContext.Provider>
      </CategoriesContext.Provider>
    </>
  )
}

export default MenuEditer;