import React from 'react';
import Button from '@mui/material/Button';


const Buttona = ({name, func}) => {
  return (
    <Button
    onClick={func}
    variant="contained"
    
    >
    {name}
    </Button>
  )
}

export default Buttona;