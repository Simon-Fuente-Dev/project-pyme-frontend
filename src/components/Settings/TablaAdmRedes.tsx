import {useGetRedPyme} from "../../api/RedSocial/useGetRedPyme.ts";
import {Table, TableBody, TableHead} from "@mui/material";

const TablaAdmRedes = () => {
    const {data: dataRedes, isLoading: isLoadingPymeRed} = useGetRedPyme();
    console.log(dataRedes)
    return (
        <>
            <Table>
                <TableHead></TableHead>
                <TableBody></TableBody>

            </Table>
        </>
    )
}

export default TablaAdmRedes