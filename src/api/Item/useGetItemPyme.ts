import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.ts";
import type {Producto} from "../../types/ProductTypes.ts";

const fetchItemPyme = async () => {
    try {
        const {data} = await axiosInstance.get<Producto[]>('/get-item-pyme');
        return data;
    }catch (e) {
        console.error("Error al obtener los items de la pyme", e);
    }
}

export const useGetItemPyme = () => {
    return useQuery({
        queryKey: ["itemPyme"],
        queryFn: fetchItemPyme
    })
}