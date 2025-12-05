import {type Dispatch, type SetStateAction, useState} from "react";
import {Box, Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';
import SaveIcon from '@mui/icons-material/Save';
import {useGetTipoRedPyme} from "../../api/RedSocial/useGetTipoRed.ts";
import {useForm} from "react-hook-form";
import ControlSelect from "../Rehusable/Inputs/ControlSelect.tsx";
import {ControlTextField} from "../Rehusable/Inputs/TextField.tsx";
import {extractErrorMessages} from "../../utils/erroresUseForm.ts";
import ErrorDialog from "../Rehusable/ErrorDialog.tsx";
import {type AgregarEditarRed, type RedType} from "../../types/RedType.ts"
import {useAgregarRed} from "../../api/RedSocial/useAgregarRed.ts";
import SuccessDialog from "../Rehusable/SuccessDialog.tsx";
import TablaAdmRedes from "./TablaAdmRedes.tsx";


type WinProps = {
    title: string;
    open: boolean;
    data: RedType[];
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const WinAgregarRed = ({title, open, setOpen, data}: WinProps) => {
    const {mutate} = useAgregarRed();

    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const [successTitle, setSuccessTitle] = useState<string>("");
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    const {control, watch, handleSubmit, reset, setValue} = useForm<AgregarEditarRed>({
        defaultValues: {
            idRed: 0,
            idRedPyme: 0,
            numeroTelefono: 0,
            url: '',
        }
    });

    const onSubmit = (values: AgregarEditarRed) => {
        mutate(values, {
            onSuccess: (response) => {
                setSuccessTitle(response?.message || "")
                setOpenSuccessDialog(true)
            }
        })
    }

    const onCancel = () => {
        setOpen(false)
        reset()
    }

    const onError = (error: Error) => {
        const messages = extractErrorMessages<AgregarEditarRed>(error);
        setErrorMessages(messages);
        setOpenErrorDialog(true);
    }

    const watchRed = watch("idRed");
    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth={true}
            >
                <DialogTitle>
                    <Box sx={{display: "flex", alignItems: "center", gap: "0.3em"}}>
                        <TagIcon/>
                        {title}
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            flexGrow: 1,
                            padding: "0.5rem",
                        }}
                    >
                        {/*    Seccion para agregar/modificar redes */}
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "auto",
                                gap: "1rem",
                            }}
                        >
                            <ControlSelect
                                name={"idRed"}
                                label={"Tipo de red"}
                                control={control}
                                data={data || []}
                                valueField={"id_red"}
                                textField={"nom_red"}
                                rules={{
                                    min: {
                                        value: 1,
                                        message: "Debe seleccionar una red social"
                                    }
                                }}
                            />

                            {watchRed == 1 ? (
                                <ControlTextField
                                    name={"numeroTelefono"}
                                    label={"Número de telefono"}
                                    control={control}
                                    rules={{
                                        pattern: {
                                            value: /^9\d{8}$/,
                                            message: "Debe ingresar un número de telefono valido ej: 912345678"
                                        }
                                    }}
                                    helperText={"Formato: 912345678"}
                                />

                            ) : (
                                <ControlTextField
                                    name={"url"}
                                    label={"Link de la red"}
                                    control={control}
                                    rules={{
                                        required: "Debe ingresar el link de la red social",
                                    }}
                                />
                            )}

                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "1rem",
                                alignItems: "flex-start",
                            }}
                        >
                            <Button
                                variant="contained"
                                startIcon={<SaveIcon/>}
                                onClick={handleSubmit(onSubmit, onError)}
                            >
                                Guardar
                            </Button>

                            <Button
                                variant="contained"
                                color={"error"}
                                onClick={() => onCancel()}
                            >
                                Cancelar
                            </Button>
                        </Box>
                        <TablaAdmRedes control={control} watch={watch} setValue={setValue}/>
                    </Box>
                </DialogContent>
            </Dialog>

            <ErrorDialog
                title="Errores al Registrarse"
                content="Por favor corrija los siguientes errores"
                errors={errorMessages}
                open={openErrorDialog}
                onClose={() => setOpenErrorDialog(false)}
            />

            <SuccessDialog
                title={successTitle}
                content={""}
                open={openSuccessDialog}
                onClose={() => {
                    setOpenSuccessDialog(false)
                    setOpen(false)
                }
            }/>
        </>
    )
}

export default WinAgregarRed;