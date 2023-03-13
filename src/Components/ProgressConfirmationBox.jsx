import React from 'react'

const ProgressConfirmationBox = ({open, text}) => {
    return (
        <ConfirmationBox
            openBox={open}
            title={
            <Typography variant="h6">
                {text && "Kaydediyor"}
            </Typography>
            }
        >
            <Container sx={{ display: "flex", justifyContent: "center", py: 1 }}>
                <CircularProgress color="primary" size={32} />
            </Container>
        </ConfirmationBox>
    )
}

export default ProgressConfirmationBox