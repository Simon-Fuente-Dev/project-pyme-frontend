import {useForm} from "react-hook-form";
import {useState} from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import type {
    TipoItem,
    Producto
} from "../../types/product.ts"
import {Button, Dialog, DialogTitle, DialogContent} from "@mui/material";


type WinProps =
    | {accion: "agregar"; productData?: Partial<Producto>} //todo productdata es opcional ya que estamos agregando
    | {accion: "modificar"; productData: Producto}; // aqui todos los campos de producto son necesarios

const WinAgregarModificar = (props: (WinProps)) => {
    const icon = props.accion === "agregar" ? <AddCircleOutlineIcon /> : <DriveFileRenameOutlineIcon />;
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button
                variant="outlined"
                color="success"
                startIcon={icon}
                onClick={() => {setOpen(true);}}
            >{props.accion}</Button>

            <Dialog open={open} onClose={() => {setOpen(false);}}>
                <DialogTitle>{props.accion}</DialogTitle>
                <DialogContent></DialogContent>
            </Dialog>
        </>
    )
}


export default WinAgregarModificar;

