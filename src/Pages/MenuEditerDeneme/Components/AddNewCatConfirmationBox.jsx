import ConfirmationBox from "../../../Components/ConfirmationBox";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Parse from 'parse/dist/parse.min.js';
import { useCategories, useCategoriesDispatch, useItemsDispatch } from "../customHooks/useMenuElementsContext";
import { CATEGORY_ACTIONS, ITEM_ACTIONS } from "../customHooks/useMenuReducer";

export function AddNewCatConfirmationBox({ open, closeBox }) {
    const [name, setName] = useState("")
    const [isSaving, setSaving] = useState(false)
    const categoriesDispatch = useCategoriesDispatch()
    const itemsDispatch = useItemsDispatch()
    const menuCategories = useCategories()
    
    const addCategory = async () => {
        setSaving(true)
        try {        
            const currentUser = await Parse.User.current();
            const categoriesLength = menuCategories.length;
            console.log(categoriesLength);
            let companyQuery = currentUser.get('company').query()
            let companyList = await companyQuery.find()
            let company = companyList[0];
            let menuQuery = company.get("menu").query();
            let menuList = await menuQuery.find()
            let menu = menuList[0];
            let categoryRelation = menu.relation("categories");
            let Category = Parse.Object.extend('Category');
            let category = new Category();
            category.set("name", name);
            category.set("priority", categoriesLength);
            await category.save();
            await categoryRelation.add(category);
            await menu.save();
            categoriesDispatch({type: CATEGORY_ACTIONS.ADD_CATEGORY, params: {category: { objectId: category._getId(), name: name, class: "category", priority:  categoriesLength}}});
            itemsDispatch({type: ITEM_ACTIONS.ADD_EMPTY_LIST});
            // await data[0].push({ objectId: category._getId(), name: catName, class: "category", priority: priority })
            // await data[1].push([]);
        } catch (error) {
            alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
        }
        setSaving(false)
    }


    return (
        <ConfirmationBox
            openBox={open}
            title="Yeni kategori ekle"
            context={
                <TextField
                    fullWidth
                    label="Kategori ismi"
                    name = "categoryName"
                    onKeyPress={event => (event.charCode == 13) ? addCategory() : null}
                    onChange={(event) => setName(event.target.value)}
                    size="small"
                />
            }
        >
            <Button
                // component="input"
                // type="submit"
                size="small"
                variant="contained"
                onClick={() => {
                    addCategory();
                    closeBox();
                }}
                startIcon={<i class="fa-solid fa-floppy-disk"></i>}
                disabled={!name || isSaving}
            >
                Kaydet
            </Button>
            <Button
                size="small"
                variant="outlined"
                onClick={() => closeBox()}
            >
                Çıkış
            </Button>
        </ConfirmationBox>
    );
}