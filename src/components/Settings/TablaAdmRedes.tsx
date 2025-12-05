import { useGetRedPyme } from "../../api/RedSocial/useGetRedPyme.ts";
import { Table, TableBody, TableHead, TableRow, TableCell, IconButton, Box } from "@mui/material";
import { validarCarga } from "../../utils/ValidaCarga.ts";
import type { RedPymeType } from "../../types/RedType.ts";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RemoveIcon from '@mui/icons-material/Remove';

import {useState} from "react";
import type { Control, UseFormWatch, UseFormSetValue } from "react-hook-form";
import type { AgregarEditarRed } from "../../types/RedType.ts";
import ConfirmDialog from "../Rehusable/ConfirmDialog.tsx";
import {useEliminarRed} from "../../api/RedSocial/useEliminarRed.ts";

type Props = {
  control: Control<AgregarEditarRed>;
  watch: UseFormWatch<AgregarEditarRed>;
  setValue: UseFormSetValue<AgregarEditarRed>;
};


const TablaAdmRedes = ({control, watch, setValue}: Props) => {
    const {mutate} = useEliminarRed();

    const { data: dataRedes, isLoading: isLoadingPymeRed } = useGetRedPyme();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selected, setSelected] = useState<RedPymeType>();

    const onEditar = (data: RedPymeType) => {
        setValue("idRed", data.id_tipo_red)
        setValue("idRedPyme", data.id_red_pyme)
        setValue("numeroTelefono", data.numero_telefono)
        setValue("url", data.url)
    }

    const eliminarRed = (data: RedPymeType) =>{
        setSelected(data)
        setOpenConfirm(true);
    }


    const confirmEliminarRed = () =>{
        mutate(selected?.id_red_pyme, {
            onSuccess: (response) => {
                setOpenConfirm(false)
            }
        })
    }
    
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Acciones</TableCell>
                        <TableCell>Tipo de red</TableCell>
                        <TableCell>Link</TableCell>
                        <TableCell>Número de telefono</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {validarCarga(isLoadingPymeRed, dataRedes) && (
                        dataRedes?.map((red: RedPymeType) => (
                            <TableRow key={red.id_red_pyme}>
                                <TableCell>
                                    <Box sx={{
                                        display: "flex"
                                    }}>
                                        <IconButton
                                            onClick={() => onEditar(red)}>
                                            <DriveFileRenameOutlineIcon color={"warning"} />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => eliminarRed(red)}
                                        >
                                            <RemoveIcon color={"error"} />
                                        </IconButton>
                                    </Box>

                                </TableCell>
                                <TableCell>{red.nom_red}</TableCell>
                                <TableCell>{red.url}</TableCell>
                                <TableCell>{red.numero_telefono}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>

            </Table>
            <ConfirmDialog
                title={"Eliminar Red Social"}
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                content={`Seguro que desea eliminar la red de ${selected?.nom_red}?`}
                confirmText={"Eliminar"}
                onConfirm={confirmEliminarRed}/>
        </>
    )
}

export default TablaAdmRedes