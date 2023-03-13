import React, {useEffect, useState} from 'react';
import { getColor } from '../menuEditerUtils';
import ConfirmationBox from "../../../Components/ConfirmationBox";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import {SketchPicker} from "react-color";

function EditColorConfirmationBox({ open, onCancelClick, onSaveClick }) {
    const [primary, setPrimary] = useState({})
    const [secondary, setSecondary] = useState({})
    const [background, setBackground] = useState({})

    const initializeColors = async () => {
        const colorData = await getColor();
        setPrimary(colorData.primary)
        setSecondary(colorData.secondary)
        setBackground(colorData.background)
    }

    useEffect(() => {
        if (open) {
            initializeColors();
        }
    }, [open])

    return (
        <ConfirmationBox
            openBox={open}
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
                                color={primary}
                                onChange={(color) => {
                                    setPrimary(color.rgb);
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
                                color={secondary}
                                onChange={(color) => {
                                    setSecondary(color.rgb);
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
                                color={background}
                                onChange={(color) => {
                                    setBackground(color.rgb);
                                }}
                            />
                        </CardContent>
                    </Card>
                </>
            }
        >
            <Button onClick={() => onSaveClick(primary, secondary, background)}>Kaydet</Button>
            <Button onClick={() => onCancelClick()}>İptal</Button>
        </ConfirmationBox>
    );
}

export default EditColorConfirmationBox;