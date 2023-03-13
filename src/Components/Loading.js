import { Box, CircularProgress, Container, Typography } from "@mui/material";

export default function(){
    return(
        <Box>
            <Typography component='h1' variant="h3"> Yükleniyor <CircularProgress/> </Typography>
        </Box>
    );
}