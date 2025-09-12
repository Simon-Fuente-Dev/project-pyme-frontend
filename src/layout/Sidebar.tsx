//Componentes de mui
import {
    Box,
    CssBaseline,
    Drawer,
    List,
    ListItemIcon,
    ListItemText,
    Toolbar,
    ListItemButton
} from "@mui/material";
//Iconos de mui
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import StarIcon from '@mui/icons-material/Star';

import {styled, useTheme} from '@mui/material/styles';
import {useLocation, useNavigate} from 'react-router-dom'

//Media query
import { useMediaQuery } from '@mui/material';
import useResponsive from "../hooks/useResponsive.ts";

interface Props {
    openMenu: boolean;
}

const drawerWidthOpen = 250;
const drawerWidthClosed = 75;


const items = [
    {label: 'Pagina Principal', icon: <HomeIcon/>, path: '/'},
    {label: 'Productos y servicios', icon: <BusinessCenterIcon/>, path: '/ProductService'},
    {label: 'Estadísticas', icon: <BarChartIcon/>, path: '/Statistics'},
    {label: 'Reseñas', icon: <StarIcon/>, path: '/Review'},
];


const Sidebar = ({openMenu}: Props) => {
    const {pathname} = useLocation()
    const theme = useTheme();
    const navigate = useNavigate();

    const {isMobile} = useResponsive();

    // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>

            {/* Sidebar permanente */}
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={openMenu}
                sx={{
                    width: openMenu ? drawerWidthOpen : drawerWidthClosed,
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                    boxSizing: "border-box",
                    transition: theme.transitions.create("width", {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.standard,
                    }),
                    [`& .MuiDrawer-paper`]: {
                        width: openMenu ? drawerWidthOpen : drawerWidthClosed,
                        boxSizing: 'border-box',
                        backgroundColor: '#1e1e1e',
                        color: '#fff',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.standard,
                        }),
                    },
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {items.map((item) => {
                            const selected = pathname === item.path;
                            return (
                                <ListItemButton
                                    key={item.path}
                                    selected={selected}

                                    onClick={() => {

                                        navigate(item.path)
                                    }}
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                        },
                                        openMenu
                                            ? {
                                                justifyContent: 'initial',
                                            }
                                            : {
                                                justifyContent: 'center',
                                            },
                                    ]}

                                >
                                        <ListItemIcon
                                            sx={[
                                                {
                                                    minWidth: 0,
                                                    justifyContent: 'center',
                                                },
                                                openMenu
                                                    ? {
                                                        mr: 3,
                                                    }
                                                    : {
                                                        mr: 'auto',
                                                    },
                                            ]}>
                                            {item.icon}
                                        </ListItemIcon>
                                    <ListItemText
                                        primary={item.label}
                                        sx={{
                                            opacity: openMenu ? 1 : 0,
                                            whiteSpace: 'nowrap',
                                            overflow: "hidden"
                                        }}
                                    />


                                </ListItemButton>
                            )
                        })}

                    </List>
                </Box>
            </Drawer>
        </Box>

    )
}


export default Sidebar