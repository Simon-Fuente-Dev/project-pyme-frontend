import {useState} from "react";
import {Box, IconButton, Tooltip, Typography} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TagIcon from '@mui/icons-material/Tag';
import AddIcon from "@mui/icons-material/Add";
import WinAgregarRed from "./WinAgregarRed.tsx";
import {useGetRedPyme} from "../../api/RedSocial/useGetRedPyme.ts";
import {validarCarga} from "../../utils/ValidaCarga.ts";
import type {RedPymeType} from "../../types/RedType.ts";
import {useGetTipoRedPyme} from "../../api/RedSocial/useGetTipoRed.ts";

const SocialMedia = () => {
    const [open, setOpen] = useState(false);
    const {data: dataRedes, isLoading: isLoadingPymeRed} = useGetRedPyme();
    const {data: dataRed, isLoading: isLoadingDataRed} = useGetTipoRedPyme();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: '0.4rem'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',

                }}
            >
                <Typography variant={"h6"}>
                    Redes Sociales

                </Typography>
                <Tooltip title={"Administrar Redes Sociales"}>
                    <IconButton
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <TagIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={{display: 'flex', gap: '0.5rem'}}>

                {validarCarga(isLoadingPymeRed, dataRedes) ? (
                    dataRedes.map((red: RedPymeType) => {
                        let icon = '';
                        switch (red.id_tipo_red) {
                            case 1:
                                icon = <WhatsAppIcon sx={{width: "100%", height: "100%"}}/>;
                                break;
                            case 2:
                                icon = <FacebookIcon sx={{width: "100%", height: "100%"}}/>;
                                break
                            case 3:
                                icon = <InstagramIcon sx={{width: "100%", height: "100%"}}/>;
                                break;
                        }
                        return (
                            <Box
                                key={red.id_red_pyme}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    position: "relative",
                                    width: 50,
                                }}
                            >
                                {icon}
                            </Box>
                        )
                    })
                ) : (
                    <></>
                )}

            </Box>
            <WinAgregarRed
                title={"Administrar Redes"}
                open={open}
                data={dataRed || []}
                setOpen={setOpen}/>
        </Box>
    )
}

export default SocialMedia