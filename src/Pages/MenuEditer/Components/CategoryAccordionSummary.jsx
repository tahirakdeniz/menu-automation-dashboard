import {AccordionSummary, Box, Grid, TextField, Typography, useTheme} from "@mui/material";
import {IconTooltipButton} from "../../../Components/IconTooltipButton";
import {ResponsiveIconButton_GridItems} from "./ResponsiveIconButtonGridItems";
import React from "react";
// import * as PropTypes from "prop-types";
//
// CategoryAccordionSummary.propTypes = {
//     catElement: PropTypes.any,
//     updatedCategory: PropTypes.string,
//     openCat: PropTypes.number,
//     catIdx: PropTypes.any,
//     onClick: PropTypes.func,
//     onClick1: PropTypes.func,
//     editCat: PropTypes.number,
//     onKeyPress: PropTypes.func,
//     onChange: PropTypes.func,
//     theme: PropTypes.any,
//     buttons: PropTypes.any
// };


export function CategoryAccordionSummary(props) {
    const theme = useTheme()
    return (
        <AccordionSummary
            sx={{
                borderRadius: "15px",
                minHeight: "unset",
                padding: "0 0",
                ".MuiAccordionSummary-content": {margin: "0 0"},
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    borderRadius: "15px",
                    backgroundImage: props.catElement.image
                        ? props.catElement.objectId === props.updatedCategory
                            ? "url(" + props.catElement.image?._url + ")"
                            : "url(" + props.catElement.image?.url + ")"
                        : "url('https://www.colorhexa.com/2a4365.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Grid
                    container
                    wrap="nowrap"
                    sx={{
                        borderRadius: "15px",
                        backdropFilter: "blur(3px)",
                        padding: 2,
                    }}
                >
                    <Grid item xs="auto">
                        {props.openCat === props.catIdx ? (
                            <IconTooltipButton
                                title="Kapat"
                                color="secondary"
                                onClick={props.onCloseClick}
                                icon={<i class="fa-solid fa-circle-minus"></i>}
                            />
                        ) : (
                            <IconTooltipButton
                                title="Aç"
                                color="secondary"
                                onClick={props.onOpenClick}
                                icon={<i class="fa-solid fa-circle-plus"></i>}
                            />
                        )}
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        {props.editCat === props.catIdx ? (
                            <Box
                                sx={{
                                    backgroundColor: "rgba(255,255,255, 0.8);",
                                    borderRadius: "15px",
                                    width: "fit-content",
                                    p: 1,
                                }}
                            >
                                <TextField
                                    defaultValue={props.catElement.name}
                                    label="Kategori İsmi"
                                    variant="standard"
                                    onKeyPress={props.onKeyPress}
                                    onChange={props.onChange
                                    }
                                    size="small"
                                />
                            </Box>
                        ) : (
                            <Typography
                                variant="h5"
                                sx={{color: theme.palette.secondary.main}}
                            >
                                {props.catElement.name}
                            </Typography>
                        )}
                    </Grid>
                    <ResponsiveIconButton_GridItems
                        color={theme.palette.secondary.main}
                        buttons={props.buttons}
                    />
                </Grid>
            </Box>
        </AccordionSummary>);
}