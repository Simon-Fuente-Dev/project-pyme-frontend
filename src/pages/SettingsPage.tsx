import {
    Box,
    Avatar,
    Paper,
    Grid,
    Typography,
    IconButton
} from "@mui/material";

import EditSquareIcon from '@mui/icons-material/EditSquare';

import { Services } from "../components/Settings/Services.tsx";
import { useAppContext } from "../context/AppContext.tsx";
import SocialMedia from "../components/Settings/SocialMedia.tsx";
import { useGetDataPyme } from "../api/Pyme/useGetDataPyme.ts";
import { validarCarga } from "../utils/ValidaCarga.ts";
import { useEffect, useState } from "react";
import NomPymeComponent from "../components/Settings/NomPymeComponent.tsx";


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

    
    const { data: dataPyme, isLoading: isLoadingPyme } = useGetDataPyme() || {};
    const [nomCortado, setNomCortado] = useState<string>("")

    useEffect(()=> {
        if(!isLoadingPyme) {
            const corte = dataPyme?.nombre_pyme.slice(0, 2).toUpperCase() || "";
            setNomCortado(corte);
        }

    }, [isLoadingPyme])

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
                        gap: '2rem'
                    }}>
                        <Box>
                            {!isLoadingPyme ? (
                                <NomPymeComponent 
                                    nombre_pyme={dataPyme?.nombre_pyme }
                                />
                            ): ""}
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

        </Box>
    );
}


export default SettingsPage;