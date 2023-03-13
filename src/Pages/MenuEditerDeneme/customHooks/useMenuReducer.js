import React, {createContext, useContext, useLayoutEffect, useReducer, useState, useEffect} from 'react'
import {getMenu} from "../../../utils/utils";
import Parse from 'parse/dist/parse.min.js';
import { initialize } from 'parse';

export const CATEGORY_ACTIONS = {
    INITIALIZE: "initialize",
    ADD_CATEGORY: "add-cat",
    UPDATE_CATEGORY: "update-cat",
    DELETE_CATEGORY: "delete-cat",
}
export const ITEM_ACTIONS = {
    INITIALIZE: "initialize",
    ADD_ITEM: "add-item",
    UPDATE_ITEM: "update-item",
    DELETE_ITEM: "delete-item",
    RESORT: "resort",
    ADD_EMPTY_LIST: 'add-e-l'
}

export function useMenuReducer() {
    
    console.log("USE MENU REDUCER")

    const [menuCategories, categoryDispatch] = useReducer(
        menuCategoriesReducer,
        []    
    );

    const [menuItems, itemDispatch] = useReducer(
        menuItemsReducer,
        []
    );

    const [loading, setLoading] = useState(true)

    const getData = async () => {
        let menu = await getMenu(Parse.User.current()._getId());
        console.log(menu)
        
        categoryDispatch({type : CATEGORY_ACTIONS.INITIALIZE, list: menu[0]}) 
        itemDispatch({type : ITEM_ACTIONS.INITIALIZE, list: menu[1]})
        setLoading(false)
    }

    useEffect(() => {
        getData()
        
    }, [])

    return ({
        categoryDispatch: categoryDispatch,
        itemDispatch: itemDispatch,
        menuItems : menuItems,
        menuCategories : menuCategories,
        loading: loading
    })
}

function menuCategoriesReducer(menuCategories, action) {
    switch (action.type) {
        case CATEGORY_ACTIONS.INITIALIZE: {
            return action.list;
        }
        case CATEGORY_ACTIONS.ADD_CATEGORY: {
            console.log("cat added")
            console.log(menuCategories)
            return [...menuCategories, action.params.category];
        }
        case CATEGORY_ACTIONS.DELETE_CATEGORY: {
            return menuCategories.filter(category => category.id !== action.id);
        }
        case CATEGORY_ACTIONS.UPDATE_CATEGORY: {
            return menuCategories.map(category => {
                if (category.objectId === action.params.category.objectId) {
                    return action.params.category;
                } else {
                    return category;
                }
            });
        }
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

function menuItemsReducer(menuItems, action) {
    switch (action.type) {
        case ITEM_ACTIONS.INITIALIZE:
            return action.list;
        case ITEM_ACTIONS.ADD_ITEM:
            const {categoryIndex, item} = action
            // TODO 
            return [...menuItems, action.item];
        case ITEM_ACTIONS.DELETE_ITEM:
            return menuItems.filter(item => item.id !== action.id);
        case ITEM_ACTIONS.UPDATE_ITEM:
            return menuItems.map(item => {
                if (item.id === action.category.id) {
                    return {...item, ...action.changes}
                } else {
                    return item;
                }
            });
        case ITEM_ACTIONS.ADD_EMPTY_LIST :
            return [...menuItems, []];
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

export default useMenuReducer;