import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.ts";
import type {RedType} from "../../types/RedType.ts";

//Trae las redes faltantes para agregar de la pyme

const fetchTipoRedPyme = async () => {
    try {
        const {data} = await axiosInstance.get<RedType[]>("get-tipo-red");
        return data;
    }catch (e) {
        console.error("Error al obtener tipos de red ", e)
    }
}


export const useGetTipoRedPyme = () => {
    return useQuery({
        queryKey: ["tipoRed"],
        queryFn: fetchTipoRedPyme,
    })
}