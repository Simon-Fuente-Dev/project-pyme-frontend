import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance";
import type { PymeType } from "../../types/PymeType";

const fetchPyme = async () => {
    try {
        const {data} = await axiosInstance.get<PymeType>("/get-data-pyme")
        return data;
    } catch (e) {
        console.error("Error al obtener los datos de la pyme")
        
    }
}

export const useGetDataPyme = () => {
    return useQuery({
        queryKey: ['dataPyme'],
        queryFn: fetchPyme
    })
}