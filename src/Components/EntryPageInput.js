import { TextField } from '@mui/material'
import React from 'react'

const EntryPageInput = (props) => {
    return (
        <TextField
            fullWidth
            margin={'normal'}
            {...props}
        />
    )
}

export default EntryPageInput;