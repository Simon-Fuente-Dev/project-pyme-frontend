import {useForm, Controller} from "react-hook-form";
import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ClearIcon from '@mui/icons-material/Clear';

import type {
    Producto
} from "../../types/ProductTypes.ts"

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Box,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    DialogActions
} from "@mui/material";

import {ControlTextField} from "../Rehusable/Inputs/TextField.tsx";
import {useGetTipoItem} from "../../api/Item/useGetTipoItem.ts";
import {useGetSubServPyme} from "../../api/SubServicio/useGetSubServPyme.ts";
import ControlSelect from "../Rehusable/Inputs/ControlSelect.tsx";
import ErrorDialog from "../Rehusable/ErrorDialog.tsx";
import {extractErrorMessages} from "../../utils/erroresUseForm.ts";
import type {AgregarEditarRed} from "../../types/RedType.ts";
import {useAddEditItem} from "../../api/Item/useAddEditItem.ts";

type WinProps = {
    title: string;
    accion: string;
    productData?: Partial<Producto>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>; //Asi se pasa un setter con valor boole
}


const WinAgregarModificar = ({title, accion, productData, open, setOpen}: WinProps) => {
    const colorIcon = accion === "agregar" ? "success" : "warning";
    const {mutate} = useAddEditItem();
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    //Llamadas
    const {data: dataSubServPyme, isLoading: isLoadingSubServ} = useGetSubServPyme()
    const {data: dataTipoItem, isLoading: isLoadingItem} = useGetTipoItem();



    const icon = accion === "agregar" ? <AddIcon color={colorIcon}/> : <DriveFileRenameOutlineIcon color={colorIcon}/>;
    // const [tipoItem, setTipoItem] = useState();
    const {control, handleSubmit, watch, formState: {errors}, reset} = useForm<Producto>({
        defaultValues: {
            id: productData?.id ?? 0,
            nombre: productData?.nombre ?? "",
            descripcion: productData?.descripcion ?? "",
            tipoItem: productData?.idTipo,
            tipoServicio: 0,
            precio: productData?.precio ?? 0,
            duracion_min: productData?.duracion_min ?? 0,
            duracion_max: productData?.duracion_max ?? 0
        }
    });


    useEffect(() => {
        switch (accion) {
            case "modificar" :
                reset({
                    id: productData?.id ?? 0,
                    nombre: productData?.nombre ?? "",
                    descripcion: productData?.descripcion ?? "",
                    tipoItem: productData?.idTipo,
                    tipoServicio: 0,
                    precio: productData?.precio ?? 0,
                    duracion_min: productData?.duracion_min ?? 0,
                    duracion_max: productData?.duracion_max ?? 0
                })
                break;
            case "agregar" :
                reset({
                    id: 0,
                    nombre: "",
                    descripcion: "",
                    tipoItem: productData?.idTipo,
                    tipoServicio: 0,
                    precio: 0,
                    duracion_min: 0,
                    duracion_max: 0
                })
                break;
        }

    }, [productData, accion, reset])

    const tipoItem = watch("tipoItem");


    const onSubmit = (data: Producto) => {
        console.log(errors);
        console.log("Datos enviados", data);
        mutate(data, {
            onSuccess: (response) => {
                console.log(response);
            }
        })

    }

    const onError = (error: any) => {
        const messages = extractErrorMessages<AgregarEditarRed>(error);
        setErrorMessages(messages);
        setOpenErrorDialog(true);
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
                onClose={() => {
                    setOpen(false);
                }}
                maxWidth="xl"
                fullWidth={true}
            >
                <DialogTitle>
                    <Box sx={{display: "flex", alignItems: "center", gap: "0.3em"}}>
                        {icon}
                        {title}
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{flexGrow: 1, padding: "0.5em"}}>
                        <Grid container spacing={2}>
                            <Grid size={4}>
                                <ControlTextField<Producto>
                                    name={"nombre"}
                                    label={"Nombre del item"}
                                    control={control}
                                    rules={{
                                        required: "El nombre es obligatorio"
                                    }}
                                />
                            </Grid>
                            <Grid size={8}>
                                <ControlTextField<Producto>
                                    name={"descripcion"}
                                    label={"Descripción del item"}
                                    control={control}
                                    rules={{
                                        required: "La descripción es obligatoria"
                                    }}
                                />
                            </Grid>
                            <Grid size={3}>
                                <ControlSelect<Producto>
                                    name={"tipoItem"}
                                    label={"Tipo Item"}
                                    control={control}
                                    data={dataTipoItem || []}
                                    valueField={"idTipoItem"}
                                    textField={"descripcion"}
                                    rules={{
                                        required: "Debe seleccionar un tipo de item"
                                    }}
                                />
                            </Grid>
                            <Grid size={4}>
                                <ControlSelect<Producto>
                                    name={"tipoServicio"}
                                    label={"Tipo de Servicio"}
                                    control={control}
                                    data={dataSubServPyme || []}
                                    valueField={"id_sub_servicio"}
                                    textField={"tipo_sub_servicio"}
                                    rules={{
                                        required: "Debe seleccionar un tipo de servicio",
                                        min: {
                                            value: 1,
                                            message: "Debe seleccionar un tipo de servicio"
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid size={3}>

                                <ControlTextField<Producto>
                                    name={"precio"}
                                    label={"Precio"}
                                    control={control}
                                    icon={<AttachMoneyIcon/>}
                                    iconPosition={"start"}
                                    rules={{
                                        required: "Debe ingresar un precio",
                                        min: {
                                            value: 1,
                                            message: "Debe ingresar un precio"
                                        },
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Solo se permiten números"
                                        }
                                    }}
                                />

                            </Grid>
                            {tipoItem == 2 &&
                                (
                                    <>
                                        <Grid size={3}>

                                            <ControlTextField<Producto>
                                                name={"duracion_min"}
                                                label={"Duración Mínima (Minutos)"}
                                                control={control}
                                                icon={<QueryBuilderIcon/>}
                                                iconPosition={"start"}
                                                rules={{
                                                    required: "Debe ingresar una duración mínima",
                                                    min: {value: 1, message: "La duración mínima debe ser mayor a 1"},
                                                    pattern: {
                                                        value: /^[0-9]+$/,
                                                        message: "Solo se permiten números"
                                                    }
                                                }}
                                            />

                                        </Grid>
                                        <Grid size={3}>

                                            <ControlTextField<Producto>
                                                name={"duracion_max"}
                                                label={"Duración Máxima (Minutos"}
                                                control={control}
                                                icon={<QueryBuilderIcon/>}
                                                iconPosition={"start"}
                                                rules={{
                                                    required: "Debe ingresar una duración máxima",
                                                    min: {value: 1, message: "La duración máxima debe ser mayor a 1"},
                                                    pattern: {
                                                        value: /^[0-9]+$/,
                                                        message: "Solo se permiten números"
                                                    }
                                                }}
                                            />

                                        </Grid>

                                    </>
                                )

                            }
                        </Grid>
                    </Box>
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
                        color={colorIcon}
                        startIcon={icon}
                        onClick={handleSubmit(onSubmit, onError)}
                    >Guardar</Button>
                </DialogActions>
            </Dialog>
            <ErrorDialog
                title="Errores al Agregar producto"
                content="Por favor corrija los siguientes errores"
                errors={errorMessages}
                open={openErrorDialog}
                onClose={() => setOpenErrorDialog(false)}
            />
        </>
    )
}


export default WinAgregarModificar;

