import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance";
import { type TipoServicioType } from "../../types/ServicioTypes";

const fetchServPyme = async () => {
    try {
        const {data} = await axiosInstance.get("get-serv-pyme");
        return data;
    } catch (error) {
        console.error("Error al obtener los servicios de la pyme", error)
    }
}

export const useGetServPyme = () => {
    return useQuery({
        queryKey: ['servPyme'],
        queryFn: fetchServPyme
    })
};