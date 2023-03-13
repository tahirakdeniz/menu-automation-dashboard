import ConfirmationBox from "../../../Components/ConfirmationBox";
import {Button, TextField} from "@mui/material";
import React, {useState} from "react";

export function AddNewCatConfirmationBox({open, onKeyPress, onSaveClick, onCancelClick}) {
    const [name, setName] = useState("")
    return (
        <ConfirmationBox
            openBox={open}
            title="Yeni kategori ekle"
            context={
                <TextField
                    fullWidth
                    label="Kategori ismi"
                    onKeyPress={onKeyPress}
                    onChange={(event) => setName(event.target.value)}
                    size="small"
                />
            }
        >
            <Button
                size="small"
                variant="contained"
                onClick={() => onSaveClick(name)}
                startIcon={<i class="fa-solid fa-floppy-disk"></i>}
                disabled={!name}
            >
                Kaydet
            </Button>
            <Button
                size="small"
                variant="outlined"
                onClick={onCancelClick}
            >
                Çıkış
            </Button>
        </ConfirmationBox>
    );
}