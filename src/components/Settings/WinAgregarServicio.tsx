import {Dispatch, SetStateAction} from "react";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import {useForm} from "react-hook-form";
import {ControlTextField} from "../Rehusable/Inputs/TextField.tsx";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
type WinProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

type Servicio = {
    nombre: string;
}
export const WinAgregarServicio = ({open, setOpen} : WinProps) => {

    const {control, handleSubmit, formState: {errors}, reset} = useForm<Servicio>({
        defaultValues: {
            nombre: ''
        }
    });

    const onSubmit = (values: Servicio) => {
        console.log(values);
    }

    const onError = (error: any) => {
        console.log("❌ Errores encontrados:", error);
    }

    const onCloseWin = () => {
        reset();
        setOpen(false);
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogContent>
                    <ControlTextField<Servicio>
                        name={'nombre'}
                        label={"Nombre del servicio"}
                        control={control}
                        rules={{
                            required: "El nombre es obligatorio",
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<ClearIcon/>}
                        onClick={onCloseWin}
                    >Cancelar</Button>
                    <Button
                        variant="outlined"
                        color="success"
                        startIcon={<AddIcon />}
                        onClick={handleSubmit(onSubmit, onError)}
                    >Agregar</Button>

                </DialogActions>
            </Dialog>
        </>
    )
}