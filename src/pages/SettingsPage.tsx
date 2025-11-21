import {
    Box,
    Avatar,
    Paper,
    Grid,
    Typography,
    Chip, Button, IconButton
} from "@mui/material";

import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';

import EditSquareIcon from '@mui/icons-material/EditSquare';

import { Services } from "../components/Settings/Services.tsx";
import { useAppContext } from "../context/AppContext.tsx";
import SocialMedia from "../components/Settings/SocialMedia.tsx";


type PaperTypes = {
    children?: React.ReactNode;
}

const PaperComponent = ({ children }: PaperTypes) => {
    return (
        <Paper
            variant={"outlined"}
            elevation={3}
            sx={{
                borderColor: "white",
                padding: '1rem',
                margin: 0,
            }}
        >
            {children}
        </Paper>
    )
}


const SettingsPage = () => {

    const { nomPyme} = useAppContext()
    const nomCortado = (nomPyme.slice(0,2)).toUpperCase();

    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/*<Avatar sx={{height: '100%', width: '100%'}}>H</Avatar>*/}
            <PaperComponent>
                {/*Box de img, nombre, descripcion y redes sociales*/}
                <Grid container spacing={2}>
                    <Grid
                        size={{ xs: 12, md: 1, xl: 1 }}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Avatar
                            sx={{ height: '100px', width: '100px' }}
                        >
                            {nomCortado}
                        </Avatar>
                    </Grid>
                    <Grid sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: '1rem'
                    }}>
                        <Box>
                            <Typography variant={"h4"}>
                                {nomPyme}
                                <IconButton size={"medium"}>
                                    <EditSquareIcon color={"warning"} />
                                </IconButton>
                            </Typography>

                        </Box>

                        <Box>
                            <Typography variant={"h6"}>
                                Descripción de la pyme
                                <IconButton size={"small"}>
                                    <EditSquareIcon color={"warning"} fontSize={"small"} />
                                </IconButton>
                            </Typography>
                        </Box>
                        {/*Box con los servicios de la pyme */}
                        <Services />

                        <SocialMedia />
                    </Grid>
                </Grid>

            </PaperComponent>
            <PaperComponent>
                <h1>Historia de la pyme</h1>
            </PaperComponent>
        </Box>
    );
}


export default SettingsPage;