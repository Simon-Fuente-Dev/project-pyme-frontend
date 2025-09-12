
import {Outlet} from 'react-router-dom'
import {useState, ReactNode} from "react";
import {Box, useMediaQuery} from '@mui/material';
import MenuBar from "./MenuBar.tsx";
import SideBar from "./SideBar";
import {styled, useTheme} from '@mui/material/styles';

const Layout = ({children}: {children: ReactNode}) => {
    const [openMenu, setOpenMenu] = useState(false);
    const theme = useTheme();

    return (
        <Box sx={{display: "flex",  height: '100vh'}}>
            <MenuBar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
            <SideBar openMenu={openMenu} />
            <Box component="main" sx={{ flexGrow: 1, mt: '50px', p: 3}}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout;