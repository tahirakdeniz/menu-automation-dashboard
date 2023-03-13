import React from 'react'
import Box from '@mui/material/Box'; 
import Logo from './logo-new2.png';
import { Container } from '@mui/system';

const EntryHeader = () => {
  return (
    <div>
        <Box component="img" src={Logo} maxWidth='100%'/> 
    </div>
  )
}

export default EntryHeader