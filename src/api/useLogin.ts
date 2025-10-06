import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axios/axiosInstance";
import type { ApiResponse } from "../types/ApiType";
import type { LoginUser, AuthData } from "../types/UserTypes";


const authUsuario = async(request: LoginUser) : Promise<ApiResponse<AuthData>> => {
    const { data } = await axiosInstance.post<ApiResponse<AuthData>>('/auth-usuario', request);
    return data;
};

export const useAuthUsuario = () => {
    return useMutation({
        mutationFn: authUsuario
    })
}