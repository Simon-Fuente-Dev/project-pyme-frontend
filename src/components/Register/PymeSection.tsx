import type {Control} from "react-hook-form";
import type {RegisterType} from "../../types/RegisterType.ts";
import ControlMultiline from "../Rehusable/Inputs/ControlMultiline.tsx";
import {Box} from "@mui/material";
import {ControlTextField} from "../Rehusable/Inputs/TextField.tsx";
import StoreIcon from '@mui/icons-material/Store';
import RoomIcon from '@mui/icons-material/Room';
import {useRegiones} from "../../api/Region/useGetRegiones.ts";
import ControlSelect from "../Rehusable/Inputs/ControlSelect.tsx";
import {useComunas} from "../../api/Comuna/useGetComunas.ts";
import {type Region, type Comuna} from "../../types/RegionComunaType.ts";

type Props = {
    control: Control<RegisterType>;
    watch: (name: keyof RegisterType) => any;
};


const PymeSection = ({control, watch}: Props) => {
    const {data, isLoading, error} = useRegiones();


    const watchRegion = watch("region");
    const {data: dataComuna, isLoading: isLoadingComuna} = useComunas(watchRegion)
    console.log(watchRegion);
    console.log(data)
    console.log(dataComuna)

    return (
        <Box>
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

            <ControlTextField<RegisterType>
                name={"direccion"}
                label={"Dirección de la pyme"}
                icon={<RoomIcon/>}
                control={control}
            />

            <ControlSelect<RegisterType, Region>
                name={"region"}
                label={"Region"}
                control={control}
                data={data ?? []}
                valueField={"id_region"}
                textField={"region"}/>

            <ControlSelect<RegisterType, Comuna>
                name={"comuna"}
                label={"Comuna"}
                control={control}
                data={dataComuna ?? []}
                valueField={"id_comuna"}
                textField={"comuna"} />


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
    )
}

export default PymeSection;