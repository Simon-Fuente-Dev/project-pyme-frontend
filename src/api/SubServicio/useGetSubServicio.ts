import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.ts";
import {type SubServicioType} from "../../types/ServicioTypes.ts";

const fetchSubServicios = async (servicioID: number) => {
    try {
        const {data} = await axiosInstance.get<SubServicioType[]>(`obtener-sub-servicio/${servicioID}`);
        return data;
    }catch(e) {
        console.error("Error al obtener sub servicios: ",e);
    }
}

export const useSubServicios = (servicioID: number) => {
    return useQuery({
        queryKey: ["subServicio", servicioID],
        queryFn: () => fetchSubServicios(servicioID),
        enabled: !!servicioID,
    })
}