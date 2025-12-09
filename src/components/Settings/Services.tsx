import {Box, Typography, Chip} from "@mui/material";
import {useGetServPyme} from "../../api/TipoServ/useGetServPyme.ts";
import {useGetSubServPyme} from "../../api/SubServicio/useGetSubServPyme.ts";
import {type TipoServicioType, type SubServicioType} from "../../types/ServicioTypes";

export const Services = () => {
    const {data: dataServPyme} = useGetServPyme()
    const {data: dataSubServPyme} = useGetSubServPyme()
    return (
        <>
            <Box sx={{display: 'flex', gap: '1rem', flexDirection: 'column'}}>
                <Box
                    sx={{display: 'flex', gap: '0.4rem', flexDirection: 'column'}}
                >

                    <Typography variant={"h6"}>Tipo de Servicio de la pyme </Typography>

                    {dataServPyme != null && dataServPyme.length > 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: '0.5rem',
                            }}
                        >
                            {dataServPyme.map((serv: TipoServicioType) => {
                                return (
                                    <Chip key={serv.tipo_servicio} label={serv.tipo_servicio}/>

                                )
                            })}
                        </Box>

                    )}

                </Box>
                <Box
                    sx={{display: 'flex', gap: '0.4rem', flexDirection: 'column'}}
                >
                    <Typography variant={"h6"}>Sub Servicios </Typography>
                    {dataSubServPyme != null && dataSubServPyme.length > 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: '0.5rem',
                            }}
                        >
                            {dataSubServPyme.map((subServ: SubServicioType) => {
                                return (
                                    <Chip key={subServ.tipo_sub_servicio} label={subServ.tipo_sub_servicio}/>
                                )
                            })}
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}