import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import {AppBar, Toolbar, IconButton, Typography, Avatar} from '@mui/material';

import {useState} from "react";

import {useTheme} from '@mui/material/styles';
import { useAppContext } from '../context/AppContext';

interface Props {
    openMenu: boolean;
    setOpenMenu: (open: boolean) => void;
}

const MenuBar = ({openMenu, setOpenMenu}: Props) => {
    const theme = useTheme();
    const {nomPyme} = useAppContext();
    const nomCortado = (nomPyme.slice(0,2)).toUpperCase() 
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
                <Avatar>
                    <Typography variant="h6">{nomCortado}</Typography>
                </Avatar>
                <Typography variant="h6" noWrap component="div">
                    Mi Panel de Control
                </Typography>
            </Toolbar>
        </AppBar>
    )
}


export default MenuBar;