import type {Control} from "react-hook-form";
import type {RegisterType} from "../../types/RegisterType.ts";
import ControlMultiline from "../Rehusable/Inputs/ControlMultiline.tsx";
import {Box, Button} from "@mui/material";
import {ControlTextField} from "../Rehusable/Inputs/TextField.tsx";
import StoreIcon from '@mui/icons-material/Store';
import RoomIcon from '@mui/icons-material/Room';
import {useRegiones} from "../../api/Region/useGetRegiones.ts";
import ControlSelect from "../Rehusable/Inputs/ControlSelect.tsx";
import {useComunas} from "../../api/Comuna/useGetComunas.ts";
import {type Region, type Comuna} from "../../types/RegionComunaType.ts";
import {useTipoServicio} from "../../api/TipoServ/useGetTipoServ.ts";
import {type TipoServicioType, type SubServicioType} from "../../types/ServicioTypes.ts";
import ControlAutocomplete from "../Rehusable/Inputs/AutocompleteSelect.tsx";
import {useSubServicios} from "../../api/SubServicio/useGetSubServicio.ts";

type Props = {
    control: Control<RegisterType>;
    watch: (name: keyof RegisterType) => any;
    setValue: (name: keyof RegisterType, value: any) => void;
};


const PymeSection = ({control, watch, setValue}: Props) => {
    const {data} = useRegiones();
    const watchRegion = watch("region");
    const {data: dataComuna, isLoading: isLoadingComuna} = useComunas(watchRegion)
    const {data: dataTipoServ} = useTipoServicio();
    const watchServicio = watch("tipoServicio");
    const {data: dataSubServ, isLoading: isLoadingSub} = useSubServicios(watchServicio);

    const llenaForm = () => {
        setValue("nomPyme", "Foca Hogar")
        setValue("descPyme", "Pyme en la que amamos hacer arreglos del hogar")
        setValue("direccion", "Su casa")

    }


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBlock: '1rem',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            }}>
                <ControlTextField<RegisterType>
                    name={"nomPyme"}
                    label={"Nombre de la pyme"}
                    icon={<StoreIcon/>}
                    control={control}
                    rules={{
                        required: "Debe ingresar el nombre de la pyme",
                        maxLength: {
                            value: 100,
                            message: "El nombre de la pyme no puede superar los 100 caracteres",
                        }
                    }}
                />

                <ControlMultiline<RegisterType>
                    name={"descPyme"}
                    label={"Descripción de la Pyme"}
                    control={control}
                    rows={4}
                    watch={watch}
                    maxLength={1000}
                    rules={{
                        minLength: {
                            value: 5,
                            message: "La descripción debe tener un mínimo de 5 caracteres",
                        },
                        maxLength: {
                            value: 1000,
                            message: "La descripción debe tener un máximo de 1000 caracteres",
                        }
                    }}
                />


            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xl: '1fr 1fr',
                        lg: '1fr 1fr',
                        md: '1fr 1fr',
                        sm: '1fr 1fr',
                        xs: 'auto',

                    },
                    gap: '1.5rem',
                }}
            >
                <ControlAutocomplete<RegisterType, TipoServicioType>
                    name={"tipoServicio"}
                    label={"Tipo de Servicio que da la pyme"}
                    control={control}
                    data={dataTipoServ ?? []}
                    valueField={"id_tipo_servicio"}
                    textField={"tipo_servicio"}
                    rules={{
                        required: "Debe seleccionar un tipo de servicio que dara su pyme",
                    }}

                />

                <ControlSelect<RegisterType, SubServicioType>
                    name={"subServicio"}
                    label={"Seleccione Sub Servicios"}
                    control={control}
                    data={dataSubServ ?? []}
                    valueField={"id_sub_servicio"}
                    textField={"tipo_sub_servicio"}
                    multiple={true}
                    rules={{
                        required: "Debe seleccionar por lo menos 1 sub servicio",
                    }}
                />


            </Box>


            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xl: '1fr 1fr 1fr',
                    lg: '1fr 1fr 1fr',
                    md: '1fr 1fr 1fr',
                    sm: '1fr 1fr',
                    xs: 'auto',

                },
                gap: '1.5rem',

            }}>
                <ControlTextField<RegisterType>
                    name={"direccion"}
                    label={"Dirección de la pyme"}
                    icon={<RoomIcon/>}
                    control={control}
                    rules={{
                        required: "Debe ingresar la direccion de la pyme"
                    }}
                />
                <ControlAutocomplete<RegisterType, Region>
                    name={"region"}
                    label={"Region"}
                    control={control}
                    data={data ?? []}
                    valueField={"id_region"}
                    textField={"region"}
                    rules={{
                        min: {
                            value: 1,
                            message: "Debe seleccionar una region"
                        }

                    }}
                />

                <ControlAutocomplete<RegisterType, Comuna>
                    name={"comuna"}
                    label={"Comuna"}
                    control={control}
                    data={dataComuna ?? []}
                    valueField={"id_comuna"}
                    textField={"comuna"}
                    rules={{
                        min: {
                            value: 1,
                            message: "Debe seleccionar una comuna"
                        }
                    }}
                />


            </Box>

            <Button
                onClick={llenaForm}
            >Llena form</Button>

        </Box>
    )
}

export default PymeSection;