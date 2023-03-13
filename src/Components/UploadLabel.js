import { Avatar, Box, Button, IconButton, Input } from "@mui/material";
import React, { useState } from 'react'

/**
 * 
 * @param {} props.children a component that opens upload pop up when clicked. It must have componenet='span'
 * @param props.getFileOnChange a function that takes file object as a parameter.
 * @returns label
 */
const UploadLabel = (props) => {
    return (
        <div>
            <label htmlFor="contained-button-file" onChange={(event) => {
                const file = event.target.files[0];
                props.getFileOnChange(file)
            }}>
                <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    sx={{display: 'none'}}
                />
                {props.children}
            </label>
        </div>
    )
}

// const UploadAvatar = (props) => {
//     const [image, setImage] = useState('');
//     return (
//         <div>
//             <Box sx={{ position: 'relative' }}>
//                 <Avatar src={image} sx={{
//                     position: 'absolute',
//                     top: '0px',
//                     left: '0px'
//                 }} />
//                 {props.isEditing &&
//                     <Avatar sx={{
//                         opacity: 0.5,
//                         position: 'absolute',
//                         top: '0px',
//                         left: '0px'
//                     }}>
//                         <UploadLabel
//                             getFileOnChange={(file) => {
//                                 const url = URL.createObjectURL(file);
//                                 setImage(url);
//                             }}>
//                             <IconButton component="span"> AAA </IconButton>
//                         </UploadLabel>
//                     </Avatar>
//                 }
//             </Box>
//         </div>
//     );
// }

// const [file] = event.target.files;
// files.push(file);
// const url = URL.createObjectURL(file)
// setImage(url);
//
//

// const url = URL.createObjectURL(file);
// setImage(url);
//
// alert('2');

export default UploadLabel;