import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../axios/axiosInstance.ts";

const eliminarRed = async (redID: number) => {
    try {
        const {data} = await axiosInstance.get(`eliminar-red-pyme/${redID}`);
        return data;
    }catch (e) {
        console.error("Error al eliminar la red social",e);
    }
}

export const useEliminarRed = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: eliminarRed,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tipoRed"]});
            queryClient.invalidateQueries({queryKey: ["redPyme"]});
        }
    })
}