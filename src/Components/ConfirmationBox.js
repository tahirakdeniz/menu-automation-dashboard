import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/material';
const ConfirmationBox = (props) => {
    const { openBox, title, context, children, breakpoint, ...left } = props
    const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <Dialog fullScreen={fullScreen} open={openBox} aria-labelledby="responsive-dialog-title" {...left}>
            {title &&
                <DialogTitle id="responsive-dialog-title">
                    {title}
                </DialogTitle>}
            {context &&
                <DialogContent>
                    <DialogContentText>
                        <Box py={1}>
                            {context}
                            {fullScreen && <DialogActions sx={{px: 0}}>
                {children}
            </DialogActions>}
                        </Box>
                    </DialogContentText>
                </DialogContent>}
            <DialogActions>
                {!fullScreen && children}
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationBox;