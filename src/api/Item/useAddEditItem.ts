import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.ts";
import type {ApiResponse} from "../../types/ApiType.ts";
import type {Producto} from "../../types/ProductTypes.ts";


const addEditItem = async (request: Producto): Promise<ApiResponse<any>> => {
    const {data} = await axiosInstance.post<ApiResponse<any>>("add-edit-item", request);
    return data;
}

export const useAddEditItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addEditItem,
    })
}