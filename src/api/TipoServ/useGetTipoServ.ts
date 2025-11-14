import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.ts";
import {type TipoServicioType} from "../../types/ServicioTypes.ts";

const fetchTipoServicios = async () => {
    try {
        const {data} = await axiosInstance.get("obtener-tipo-serv");
        return data;
    }catch(e) {
        console.error("Error al obtener los tipos de servicio",e)
    }
}

export const useTipoServicio = () => {
    return useQuery({
        queryKey: ['tipoServicio'],
        queryFn:fetchTipoServicios
    })
}