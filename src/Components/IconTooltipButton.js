import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

export const IconTooltipButton = (props) => {
    const {title, icon, ...leftProps} = props;
    return (
        <Tooltip title={title}>
            <IconButton {...leftProps}> {icon} </IconButton>
        </Tooltip>
    )
}
