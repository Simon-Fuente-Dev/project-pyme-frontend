//Define un tema global de material ui

import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {main: '#1976d2'},
        secondary: {main: '#9c27b0'}
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderBottom: '1px solid #eee'
                }
            }
        }
    },
    transitions: {
        duration: {
            shortest: 250,
            shorter: 300,
            short: 400,
            standard: 500,
            complex: 700,
            enteringScreen: 500,
            leavingScreen: 500,
        }
    },
    zIndex: {
        appBar: 1200,
        drawer: 1100,
        modal: 1300,
        tooltip: 1500,
    }
});

export default theme;