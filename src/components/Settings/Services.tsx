import {Box, Typography, Chip, IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import {WinAgregarServicio} from "./WinAgregarServicio.tsx";

export const Services = () => {
    const [openService, setOpenService] = useState<boolean>(false);
    return (
        <>
            <Box sx={{display: 'flex', gap: '0.5rem', flexDirection: 'column'}}>
                <Box>

                    <Typography variant={"h6"}>Servicios </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: '0.5rem',
                        }}
                    >
                        <Chip label={"Comida Rapida"}/>
                        <Chip label={"Papas Fritas"}/>
                        <IconButton
                            onClick={() => setOpenService(true)}
                        >
                            <AddIcon fontSize={"medium"}/>
                        </IconButton>

                    </Box>

                </Box>
                <Box>
                    <Typography variant={"h6"}>Sub Servicios </Typography>
                    <IconButton
                    >
                        <AddIcon fontSize={"medium"}/>
                    </IconButton>
                </Box>
            </Box>
            <WinAgregarServicio open={openService} setOpen={setOpenService} />
        </>
    )
}