import {useQuery} from "@tanstack/react-query"
import axiosInstance from "./axios/axiosInstance.ts";

const useGetDataPyme = async () => {
    const {data} = await axiosInstance.get('')
}