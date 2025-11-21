import type {RedPymeType} from "../../types/RedType.ts";
import {Dialog} from "@mui/material";
import type {Dispatch, SetStateAction} from "react";

interface WinProps extends RedPymeTypes {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const WinEditarEliminarRed = ({
                                  id_tipo_red,
                                  id_red_pyme,
                                  url,
                                  numero_telefono,
                                  open,
                                  setOpen
                              }: WinProps) => {
    return (
        <Dialog open={open}>

        </Dialog>
    )
}

export default WinEditarEliminarRed;