import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
    Typography
} from "@mui/material";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import {useModificarNom} from "../../api/Pyme/useModificarNombre.ts";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {extractErrorMessages} from "../../utils/erroresUseForm.ts";
import ErrorDialog from "../Rehusable/ErrorDialog.tsx";
import ClearIcon from "@mui/icons-material/Clear";
import CancelIcon from "@mui/icons-material/Cancel";
import ControlMultiline from "../Rehusable/Inputs/ControlMultiline.tsx";
import {useModificarDesc} from "../../api/Pyme/useModificarDescripcion.ts";

type descComponentType = {
    descripcion_pyme: string
}

const DescPymeComponent = ({descripcion_pyme}: descComponentType) => {
    const {mutate} = useModificarDesc();

    const [open, setOpen] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const {control, handleSubmit, reset, watch} = useForm<descComponentType>({
        defaultValues: {
            descripcion_pyme: descripcion_pyme
        }
    })

    const onSubmit = (values: descComponentType) => {
        console.log(values)
        mutate(values, {
            onSuccess: (response) => {
                setOpen(false)
            }
        })
    }

    const onError = (error: Error) => {
        const messages = extractErrorMessages<descComponentType>(error);
        setErrorMessages(messages);
        setOpenErrorDialog(true);
    }

    return (
        <>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
            }}>
                <Typography variant={"h6"}>
                    Descripción de la pyme
                    <IconButton
                        size={"small"}
                        onClick={() => setOpen(true)}
                    >
                        <EditSquareIcon color={"warning"} fontSize={"small"}/>
                    </IconButton>
                </Typography>
                <p>
                    {descripcion_pyme}
                </p>
            </Box>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
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
                        Modificar Descripción de la pyme

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
                        <ControlMultiline<descComponentType>
                            name={"descripcion_pyme"}
                            label={"Descripción de la Pyme"}
                            control={control}
                            rows={4}
                            watch={watch}
                            maxLength={1000}
                            rules={{
                                required: "Debe ingresar una descripción",
                                minLength: {
                                    value: 5,
                                    message: "La descripción debe tener un mínimo de 5 caracteres",
                                },
                                maxLength: {
                                    value: 1000,
                                    message: "La descripción debe tener un máximo de 1000 caracteres",
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

export default DescPymeComponent;