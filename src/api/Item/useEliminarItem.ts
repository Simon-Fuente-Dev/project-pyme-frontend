import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.ts";
import type {ApiResponse} from "../../types/ApiType.ts";

type TypeEliminar = {
    id_item: number;
}

const deleteItem = async (requestEliminar: TypeEliminar): Promise<ApiResponse<any>> => {
    const {data} = await axiosInstance.post<ApiResponse<any>>(`delete-item-pyme`, requestEliminar);
    return data;
}

export const useDeleteItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['itemPyme']});
        }
    })
}