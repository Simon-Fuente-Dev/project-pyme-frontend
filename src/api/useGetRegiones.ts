import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios/axiosInstance"

interface Region {
    id_region: number;
    region: string;
}

const fetchRegiones = async () => {
    const { data } = await axiosInstance.get<Region[]>('obtener-regiones');
    return data;
}

export const useRegiones = () => {
    return useQuery({
    queryKey: ['regiones'],
    queryFn: fetchRegiones,
  })
}