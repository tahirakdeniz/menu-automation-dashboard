import { Stack, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/system';

export default function ({ isEditing, value, title, handleChange, TextFieldProps, TypographyProps }) {
    return (
        <Stack justifyContent="center" sx={{overflowWrap: 'anywhere'}}>
            {isEditing ?
                <TextField sx={{ pointerEvents: "auto" }} defaultValue={value} variant='standard' label={title} onChange={(event) => handleChange(event.target.value)} {...TextFieldProps} size='small' />
                :
                <Typography {...TypographyProps}>{value}</Typography>}
        </Stack>
    );
}