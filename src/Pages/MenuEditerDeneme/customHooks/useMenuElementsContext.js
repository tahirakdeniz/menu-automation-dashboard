import {createContext, useContext} from 'react'

export const CategoriesContext = createContext(null);
export const ItemsContext = createContext(null);
export const ItemsDispatchContext = createContext(null);
export const CategoriesDispatchContext = createContext(null);

export function useItems() {
    return useContext(ItemsContext);
}

export function useCategories() {
    return useContext(CategoriesContext);
}

export function useCategoriesDispatch() {
    return useContext(CategoriesDispatchContext)
}

export function useItemsDispatch() {
    return useContext(ItemsDispatchContext)
}
