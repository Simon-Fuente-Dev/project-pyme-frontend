import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance";
import type {ApiResponse} from "../../types/ApiType.ts";

type modificarDescType = {
    descripcion_pyme: string;
}

const modificarDesc = async (request: modificarDescType) : Promise<ApiResponse<any>> => {
    const {data} = await axiosInstance.post<ApiResponse<any>>("modificar-desc-pyme", request);
    return data;
};

export const useModificarDesc = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: modificarDesc,
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ["dataPyme"]})
        },
    })
}