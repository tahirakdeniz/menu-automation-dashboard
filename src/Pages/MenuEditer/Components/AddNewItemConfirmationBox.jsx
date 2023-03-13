import ConfirmationBox from "../../../Components/ConfirmationBox";
import {Button, TextField} from "@mui/material";
import React, {useState} from "react";

// PROPS
// {
//     openBox,
//     catElement,
//     onKeyPress,
//     onChange,
//     onChange1,
//     onChange2 ,
//     onClick,
//     currentChangeName,
//     number,
//     onClick1,
// };

export function AddNewItemConfirmationBox(props) {
    const [name, setName] = useState("")
    const [price, setPrice] = useState(" ")
    const [ingredients, setIngredients] = useState("")

    return (
        <ConfirmationBox
            openBox={props.open}
            title={`Yeni ürün ekle: ${props.catElement.name}`}
            context={
                <>
                    <TextField
                        fullWidth
                        label="İsim"
                        onKeyPress={props.onKeyPress}
                        onChange={event => setName(event.target.value)}
                        size="small"
                    />
                    <TextField
                        fullWidth
                        label="Fiyat"
                        onKeyPress={props.onKeyPress}
                        onChange={event => setPrice(event.target.value)}
                        size="small"
                    />
                    <TextField
                        fullWidth
                        label="İçindekiler"
                        onKeyPress={props.onKeyPress}
                        onChange={event => setIngredients(event.target.value)}
                        size="small"
                    />
                </>
            }
        >
            <Button
                size="small"
                variant="contained"
                onClick={() => props.onSaveClick(name, price, ingredients)}
                disabled={!name || !(!isNaN(price) && parseInt(price) > 0)}
                startIcon={<i class="fa-solid fa-plus"></i>}
            >
                Yeni Ürün Ekle
            </Button>
            <Button
                size="small"
                variant="outlined"
                onClick={props.onCancelClick}
            >
                Çıkış
            </Button>
        </ConfirmationBox>
    )
}