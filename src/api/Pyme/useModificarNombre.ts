import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance";
import type {ApiResponse} from "../../types/ApiType.ts";

type modificarNomType = {
    nombre_pyme: string;
}

const modificarNom = async (request: modificarNomType) : Promise<ApiResponse<any>> => {
    const {data} = await axiosInstance.post<ApiResponse<any>>("modificar-nombre-pyme", request);
    return data;
};

export const useModificarNom = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: modificarNom,
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ["dataPyme"]})
        },
    })
}