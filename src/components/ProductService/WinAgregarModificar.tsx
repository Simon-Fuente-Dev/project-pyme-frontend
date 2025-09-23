import {useForm, Controller} from "react-hook-form";
import {type Dispatch, type SetStateAction, useState, useEffect} from "react";
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
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FilledInput,
    InputAdornment,
    DialogActions
} from "@mui/material";

import ErrorDialog from "../Rehusable/ErrorDialog.tsx";

import {ControlTextField} from "../Rehusable/TextField.tsx";

type WinProps = {
    title: string;
    accion: string;
    productData?: Partial<Producto>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>; //Asi se pasa un setter con valor boole
}


const tipos = [
    {id: 1, text: "Producto"},
    {id: 2, text: "Servicio"}
]

const WinAgregarModificar = ({title, accion, productData, open, setOpen}: WinProps) => {
    const colorIcon = accion === "agregar" ? "success" :"warning";
    const icon = accion === "agregar" ? <AddIcon color={colorIcon}/> : <DriveFileRenameOutlineIcon color={colorIcon}/>;
    // const [tipoItem, setTipoItem] = useState();
    const {control, register, handleSubmit, watch, formState: {errors}, reset} = useForm<Producto>({
        defaultValues: {
            id: productData?.id ?? 0,
            nombre: productData?.nombre ?? "",
            descripcion: productData?.descripcion ?? "",
            tipo: productData?.idTipo,
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
                    tipo: productData?.idTipo,
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
                    tipo: productData?.idTipo,
                    precio: 0,
                    duracion_min: 0,
                    duracion_max: 0
                })
                break;
        }

    }, [productData, accion, reset])

    const tipoItem = watch("tipo");


    const onSubmit = (data: Producto) => {
        console.log(errors);
        console.log("Datos enviados", data);
    }

    const onError = (error: any) => {
        console.log("❌ Errores encontrados:", error);
    }

    const onCloseWin = () => {
        reset();
        setOpen(false);
    }

    /*
        register se usa en inputs básicos.

        Controller se usa para componentes de librerías externas como MUI Select.

        reset sirve para limpiar o reestablecer valores cuando cambie productData.

    */


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
                                    rules = {{
                                        required: "El nombre es obligatorio"
                                    }}
                                />
                            </Grid>
                            <Grid size={8}>
                                <ControlTextField<Producto>
                                    name={"descripcion"}
                                    label={"Descripción del item"}
                                    control={control}
                                    rules = {{
                                        required: "La descripción es obligatoria"
                                    }}
                                />
                            </Grid>
                            <Grid size={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel id="label-select-tipo">Tipo Item</InputLabel>
                                    <Controller
                                        name="tipo"
                                        control={control}
                                        rules={{required: "El tipo es obligatorio"}}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                labelId="label-select-tipo"
                                                label="Tipo Item"
                                                // value={tipoItem}
                                                fullWidth
                                                // onChange={(e) => setTipoItem(e.target.value)}
                                            >
                                                {tipos.map((tipo) => (
                                                    <MenuItem key={tipo.id} value={tipo.id}>
                                                        {tipo.text}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />

                                </FormControl>
                            </Grid>
                            <Grid size={3}>

                                <ControlTextField<Producto>
                                    name={"precio"}
                                    label={"Precio"}
                                    control={control}
                                    icon={<AttachMoneyIcon/>}
                                    iconPosition={"start"}
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
                                                    min: {value: 1, message: "La duración mínima debe ser mayor a 1"}
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
                                                    min: {value: 1, message: "La duración máxima debe ser mayor a 1"}
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
        </>
    )
}


export default WinAgregarModificar;

