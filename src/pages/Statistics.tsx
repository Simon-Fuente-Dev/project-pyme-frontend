import { useEffect } from "react";
import { useRegiones } from "../api/useGetRegiones";

const Statistics = () => {
    const {data, isLoading, error} = useRegiones();

    useEffect(() => {
        console.log(data)
    }, [data])

    console.log(data)
    return (
        <h1>Statistics</h1>
    )
}

export default Statistics;