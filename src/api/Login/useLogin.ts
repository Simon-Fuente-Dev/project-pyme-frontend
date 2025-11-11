import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.ts";
import type { ApiResponse } from "../../types/ApiType.ts";
import type { LoginUser, AuthData } from "../../types/UserTypes.ts";


const authUsuario = async(request: LoginUser) : Promise<ApiResponse<AuthData>> => {
    const { data } = await axiosInstance.post<ApiResponse<AuthData>>('/auth-usuario', request);
    return data;
};

export const useAuthUsuario = () => {
    return useMutation({
        mutationFn: authUsuario
    })
}