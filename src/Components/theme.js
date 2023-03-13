import { createTheme } from "@mui/material/styles";

const theme = createTheme(
    {
        palette: {
            primary: {
                main: '#033D8C'
            },

            secondary: {
                main: '#FFFFFF'
            }
        },
        typography: {
            fontFamily: 'Encode Sans Expanded, sans-serif'
        },
        components: {
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: ({ ownerState }) => ({
                        ...(ownerState.variant === 'contained' &&
                        {
                            ':hover': {
                                backgroundColor: theme.palette.secondary.main,
                                color: theme.palette.primary.main,
                            },
                            transition: '0.3s'
                        }),

                        ...(ownerState.startIcon &&
                        {
                            // textIndent: {xs: '-9999px', md: 'unset'},
                            // color: 'red'
                        })
                    }),
                }
            }
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 500,
                md: 768,
                lg: 1000,
                xl: 1536,
            }
        }
    }
)

export default theme;