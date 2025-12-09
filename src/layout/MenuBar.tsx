import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import {AppBar, Toolbar, IconButton, Typography, Avatar} from '@mui/material';

import {useEffect, useState} from "react";

import {useTheme} from '@mui/material/styles';
import {useGetDataPyme} from "../api/Pyme/useGetDataPyme.ts";

interface Props {
    openMenu: boolean;
    setOpenMenu: (open: boolean) => void;
}

const MenuBar = ({openMenu, setOpenMenu}: Props) => {
    const { data: dataPyme, isLoading: isLoadingPyme } = useGetDataPyme() || {};
    const [nomCortado, setNomCortado] = useState<string>("")

    useEffect(()=> {
        if(!isLoadingPyme) {
            const corte = dataPyme?.nombre_pyme.slice(0, 2).toUpperCase() || "";
            setNomCortado(corte);
        }

    }, [isLoadingPyme, dataPyme])
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