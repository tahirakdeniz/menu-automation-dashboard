import {Grid, Menu, MenuItem, useMediaQuery} from "@mui/material";
import React, {useState} from "react";
import {IconTooltipButton} from "../../../Components/IconTooltipButton";

export const ResponsiveIconButton_GridItems = ({buttons, color}) => {
    const smallerSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const gridItemStyle = {
        '& 	.MuiIconButton-root': {
            color: {color}
        }
    }

    const PositionedMenu = () => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

        return (
            <div>
                <IconTooltipButton
                    title="Seçenekler"
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    icon={<i class="fa-solid fa-ellipsis-vertical"></i>}
                />
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    {buttons?.map((button) => (
                        <MenuItem onClick={handleClose}>{button}</MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }

    if (smallerSM)
        return (
            <Grid item xs='auto' sx={gridItemStyle}>
                <PositionedMenu/>
            </Grid>
        );

    return (
        <>
            {buttons?.map((button) => (
                <Grid item xs='auto' sx={gridItemStyle}>
                    {button}
                </Grid>
            ))}
        </>
    );
}