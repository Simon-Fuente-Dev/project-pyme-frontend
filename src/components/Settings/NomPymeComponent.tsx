import {
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    Box,
    Tooltip,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ControlTextField } from "../Rehusable/Inputs/TextField";

import EditSquareIcon from '@mui/icons-material/EditSquare';
import CancelIcon from '@mui/icons-material/Cancel';
import ClearIcon from '@mui/icons-material/Clear';

import ErrorDialog from "../Rehusable/ErrorDialog.tsx";
import {extractErrorMessages} from "../../utils/erroresUseForm.ts";
import { useModificarNom } from "../../api/Pyme/useModificarNombre.ts";



type componentType = {
    nombre_pyme: string;
}

const NomPymeComponent = ({ nombre_pyme }: componentType) => {
    const {mutate} = useModificarNom();
    const [open, setOpen] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const { control, handleSubmit, reset } = useForm<componentType>({
        defaultValues: {
            nombre_pyme: nombre_pyme
        }
    })

    const onSubmit = (values: componentType) => {

        mutate(values, {
            onSuccess: (response) => {
                setOpen(false)
            }
        })
    }

    const onError = (error: Error) => {
        const messages = extractErrorMessages<componentType>(error);
        setErrorMessages(messages);
        setOpenErrorDialog(true);
    }
    return (
        <>
            <Typography variant={"h4"}>
                {nombre_pyme}
                <Tooltip title={"Editar nombre de la pyme"}>
                    <IconButton
                        size={"medium"}
                        onClick={() => setOpen(true)}
                    >
                        <EditSquareIcon color={"warning"} />
                    </IconButton>
                </Tooltip>

            </Typography>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: "5rem",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: "0.3em" }}>
                        <EditSquareIcon color={"warning"} />
                        Modificar Nombre de la pyme

                    </Box>
                    <Tooltip title={"Cerrar"}>
                        <IconButton
                            onClick={() => setOpen(false)}
                        >
                            <CancelIcon />
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ flexGrow: 1, padding: "0.5em" }}>
                        <ControlTextField
                            name="nombre_pyme"
                            label="Nombre de la pyme"
                            control={control}
                            rules={{
                                required: "La pyme debe tener un nombre",
                                minLength: {
                                    value: 2,
                                    message: "El nombre de la pyme debe tener como minimo 2 caracteres"
                                },
                                maxLength: {
                                    value: 100,
                                    message: "El nombre de la pyme no puede superar los 100 caracteres",
                                }
                            }}

                        />
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<ClearIcon />}
                        onClick={() => setOpen(false)}
                    >Cancelar</Button>
                    <Button
                        variant="outlined"
                        color={"warning"}
                        startIcon={<EditSquareIcon />}
                        onClick={handleSubmit(onSubmit, onError)}
                    >Modificar</Button>

                </DialogActions>
            </Dialog>

            <ErrorDialog
                title="Errores al Modificar nombre de la pyme"
                content="Por favor corrija los siguientes errores"
                errors={errorMessages}
                open={openErrorDialog}
                onClose={() => setOpenErrorDialog(false)}
            />

        </>
    )
}

export default NomPymeComponent;