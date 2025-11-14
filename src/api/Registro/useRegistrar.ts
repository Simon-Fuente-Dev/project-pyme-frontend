import {useMutation} from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.ts";
import type {ApiResponse} from "../../types/ApiType.ts";
import type {RegisterType} from "../../types/RegisterType.ts";

const registrarUsuario = async (request: RegisterType) : Promise<ApiResponse<any>> => {
    const {data} = await axiosInstance.post<ApiResponse<any>>("registar-pyme", request);
    return data;
}

export const useRegistrarUsuario = () => {
    return useMutation({
        mutationFn: registrarUsuario
    })
}