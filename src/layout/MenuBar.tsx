import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import {AppBar, Toolbar, IconButton, Typography, Avatar} from '@mui/material';

import {useState} from "react";

import {useTheme} from '@mui/material/styles';

interface Props {
    openMenu: boolean;
    setOpenMenu: (open: boolean) => void;
}

const MenuBar = ({openMenu, setOpenMenu}: Props) => {
    const theme = useTheme();
    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: theme.zIndex.appBar ,
            }}
        >
            <Toolbar sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton
                    onClick={() => {
                        setOpenMenu(!openMenu);
                    }}
                >
                    {openMenu ? <MenuOpenIcon /> : <MenuIcon />}

                </IconButton>
                <Avatar>P</Avatar>
                <Typography variant="h6" noWrap component="div">
                    Mi Panel de Control
                </Typography>
            </Toolbar>
        </AppBar>
    )
}


export default MenuBar;