import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.ts";
import {type SubServicioType} from "../../types/ServicioTypes.ts";

const fetchSubServPyme = async () => {
    try {
        const response = await axiosInstance.get<SubServicioType[]>("get-sub-serv-pyme");
        return response.data;
    }catch (e) {
        console.error("Error al obtener los sub servicios de la pyme",e);
    }
}

export const useGetSubServPyme = () => {
    return useQuery({
        queryKey: ["subServPyme"],
        queryFn: fetchSubServPyme,
    })
}