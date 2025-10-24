import {useQuery} from "@tanstack/react-query";
import axiosInstance from "./axios/axiosInstance.ts";

interface Item {
    idTipoItem: number;
    descripcion: string;
}

const fetchItem = async () => {
    try {
        const {data} = await axiosInstance.get<Item[]>('/obtener-tipo-item');
        return data;
    } catch (e) {
        console.error("Error al obtener los tipos de item: ",e);
    }
}

export const useGetTipoItem = () => {
    return useQuery({
        queryKey: ['tipoItem'],
        queryFn: fetchItem,
    })
}
