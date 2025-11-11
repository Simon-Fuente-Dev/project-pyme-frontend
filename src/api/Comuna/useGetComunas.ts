import {useQuery} from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.ts";
import {type Comuna} from "../../types/RegionComunaType.ts";

const fetchComunas = async (regionID : number) => {
    const {data} = await axiosInstance.get<Comuna[]>(`obtener-comunas/${regionID}`);
    return data;
}

export const useComunas = (regionID : number) => {
    return useQuery({
        queryKey: ['comuna', regionID],
        queryFn: () => fetchComunas(regionID),
        enabled: !!regionID,
    })
}