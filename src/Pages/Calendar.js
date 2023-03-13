import React, { useState } from 'react'
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
// import ConfirmationBox from '../Components/ConfirmationBox';
// import { Box, Container, ListItemIcon, ListItem, ListItemText, List, ListItemButton, Collapse, Select, MenuItem, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Autocomplete, TextField, TableFooter, IconButton, Button } from '@mui/material';
// import useFetch from './useFetch';
const shiftTime = [
    8.00, 10.00,
    10.00, 12.00,
    13.00, 15.00,
    17.00, 19.00,
    21.00
]

const Calendar = () => {
    return(<div>calendar</div>)
    // const [value, setValue] = useState(null);
    // const [openBox, setOpenBox] = useState(false);
    // const [addedWorker, setAddedWorker] = useState(null);
    // const [selectedIdx, setSelectedIdx] = useState(100);
    // const { data, loading, error } = useFetch("http://localhost:3001/user/deneme");
    // const selectWorking = async (event, idx) => {
    //     setAddedWorker(event.target.value);
    //     setSelectedIdx(idx);
    // }
    // return (
    //     <LocalizationProvider dateAdapter={AdapterDateFns}>
    //         <StaticDatePicker
    //             displayStaticWrapperAs="desktop"
    //             label="Week picker"
    //             value={value}
    //             onChange={(newValue) => {
    //                 setValue(newValue);
    //                 setOpenBox(true);
    //             }}
    //             renderInput={(params) => <TextField {...params} />}
    //             inputFormat="'Week of' MMM d"
    //         />
    //         {openBox &&
    //             <Table>
    //                 <TableHead>
    //                     <TableRow>
    //                         <TableCell>Hour</TableCell>
    //                         <TableCell>Pick Worker</TableCell>
    //                     </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                     {
    //                         shiftTime.map((hour, idx) => (
    //                             <TableRow>
    //                                 <TableCell>{parseFloat(hour).toFixed(2)} : {parseFloat(hour + 2).toFixed(2)}</TableCell>
    //                                 <TableCell>
    //                                     <Select value={idx === selectedIdx ? addedWorker : selectedIdx} onChange={(event) => selectWorking(event, idx)}>
    //                                         {data.map((user) => (
    //                                             <MenuItem value={user.name}>
    //                                                 {user.name} 
    //                                                 {" "}
    //                                                 {user.lastname}
    //                                             </MenuItem>
    //                                         ))}
    //                                     </Select>
    //                                 </TableCell>
    //                                 {idx === selectedIdx &&
    //                                 <TableCell> 
    //                                 <IconButton onClick={()=>{setAddedWorker(null);setSelectedIdx(100);}}>Kaydet</IconButton>
    //                                 <IconButton onClick={()=>{setAddedWorker(null);setSelectedIdx(100);}}>İptal</IconButton>
    //                                 </TableCell>
    //                                 }
    //                             </TableRow>
    //                         ))
    //                     }
    //                 </TableBody>
    //             </Table>
    //         }
    //     </LocalizationProvider>
    // );
}

export default Calendar;