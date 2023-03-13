import React, {useEffect, useState} from 'react';
import Parse from 'parse/dist/parse.min.js';
import ConfirmationBox from "../../../Components/ConfirmationBox";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import {SketchPicker} from "react-color";

function EditColorConfirmationBox({ open, closeBox}) {
    // TODO try onChangeComplete instead of onChange in react-color components.
    
    const [rgbColors, setRgbColors] = useState({})
    const [isSaving, setSaving] = useState(false)
    

    const getColor = async () => {
        let user = Parse.User.current();
        let companyQuery = user.get('company').query()
        let companyList = await companyQuery.find()
        let company = companyList[0];
        let menuQuery = company.get("menu").query();
        let menuList = await menuQuery.find()
        let menu = menuList[0]; 
        
        let primaryColor = menu.get("primaryColor")
        let secondaryColor = menu.get("secondaryColor")
        let backgroundColor = menu.get("backgroundColor")
        
        return {
            primary: primaryColor,
            secondary: secondaryColor,
            background: backgroundColor,
        }
      }

    const initializeColors = async () => {
        const colorData = await getColor();
        setRgbColors({primary : colorData.primary, secondary: colorData.secondary, background : colorData.background })
    }

    useEffect(() => {
        if (open) {
            initializeColors();
        }
    }, [open])

    const saveColors = async () => {
        setSaving(true)
        try {
            let user = Parse.User.current();
            let companyQuery = user.get('company').query()
            let companyList = await companyQuery.find()
            let company = companyList[0];
            let menuQuery = company.get("menu").query();
            let menuList = await menuQuery.find()
            let menu = menuList[0]; 
            menu.set("primaryColor", rgbColors.primary);
            menu.set("secondaryColor", rgbColors.secondary);
            menu.set("backgroundColor", rgbColors.background);
            await menu.save();
        } catch (error) {
          alert(`Bir hata ile karşılaştınız. Infosort ile iletişime geçebilirsiniz.`);
        }
        setSaving(false)
    }

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
                                color={rgbColors.primary}
                                onChange={(color) => {
                                    let updatedColor = {primary : color.rgb};
                                    setRgbColors(rgbColors => ({
                                        ...rgbColors,
                                        ...updatedColor
                                    }));
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
                                color={rgbColors.secondary}
                                onChange={(color) => {
                                    let updatedColor = {secondary : color.rgb};
                                    setRgbColors(rgbColors => ({
                                        ...rgbColors,
                                        ...updatedColor
                                    }));
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
                                color={rgbColors.background}
                                onChange={(color) => {
                                    let updatedColor = {background : color.rgb};
                                    setRgbColors(rgbColors => ({
                                        ...rgbColors,
                                        ...updatedColor
                                    }));
                                }}
                            />
                        </CardContent>
                    </Card>
                </>
            }
        >
            <Button onClick={() => {saveColors(); closeBox()}} disabled={isSaving}> {isSaving ? "Kaydediyor" : "Kaydet"} </Button>
            <Button onClick={() => closeBox()}>İptal</Button>
        </ConfirmationBox>
    );
}

export default EditColorConfirmationBox;