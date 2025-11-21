import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.ts";
import type {RedPymeType} from "../../types/RedType.ts";

const fetchRedPyme = async () => {
    try {
        const {data} = await axiosInstance.get<RedPymeType[]>("get-redes-pyme")
        return data;
    }catch (e) {
        console.error("Error al obtener las redes de la pyme: ",e);
    }
}


export const useGetRedPyme = () => {
    return useQuery({
        queryKey: ["redPyme"],
        queryFn: fetchRedPyme
    })
}