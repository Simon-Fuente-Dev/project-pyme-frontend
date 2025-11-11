import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.ts"
import {type Region} from "../../types/RegionComunaType.ts";

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