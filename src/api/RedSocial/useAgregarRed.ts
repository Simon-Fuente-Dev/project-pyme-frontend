import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.ts";
import type {ApiResponse} from "../../types/ApiType.ts";
import type {AgregarEditarRed} from "../../types/RedType.ts"

const agregarRed = async (request: AgregarEditarRed) : Promise<ApiResponse<any>> => {
    const {data} = await axiosInstance.post<ApiResponse<any>>("agregar-red-pyme", request);
    return data;
}

export const useAgregarRed = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: agregarRed,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tipoRed"]});
        }
    })
}