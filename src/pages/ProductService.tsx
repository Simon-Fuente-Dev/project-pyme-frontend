import {
    Box, Button, Collapse, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import AddIcon from '@mui/icons-material/Add';


import WinAgregarModificar from '../components/ProductService/WinAgregarModificar.tsx'
import {type ChangeEvent, Fragment, useState} from "react";

import type {
    Producto,
    ProductoConHistorial,
    TipoItem
} from "../types/ProductTypes.ts";
import {useGetItemPyme} from "../api/Item/useGetItemPyme.ts";
import {validarCarga} from "../utils/ValidaCarga.ts";
import ConfirmDialog from "../components/Rehusable/ConfirmDialog.tsx";


type Data = ProductoConHistorial;
type ProductoForm = Producto;

// Ejemplos de filas con histórico
// const rows: Data[] = [
//     createData(
//         1,
//         "Completo italiano",
//         "Rico completo palta, mayo, tomate",
//         1,
//         "Producto",
//         2000
//         // sin history → snapshot inicial automático
//     ),
//     createData(
//         2,
//         "Hamburguesa Americana",
//         "Hamburguesa queso, tocino y cebolla caramelizada",
//         1,
//         "Producto",
//         5000,
//         0,
//         0,
//         [
//             // histórico manual: cambios de precio
//             {date: "2024-08-01", itemId: 2, precio: 4800, duracion_min: 0, duracion_max: 0, duracion_aprox: ""},
//             {date: "2024-09-01", itemId: 2, precio: 5000, duracion_min: 0, duracion_max: 0, duracion_aprox: ""},
//             {date: "2024-09-01", itemId: 2, precio: 5000, duracion_min: 0, duracion_max: 0, duracion_aprox: ""},
//
//         ]
//     ),
//     createData(
//         3,
//         "Mantenimiento PC",
//         "Limpieza, pasta térmica y formateo",
//         2,
//         "Servicio",
//         20000,
//         30,
//         60
//         // sin history → snapshot con duración y aprox
//     ),
// ];

function Row(props: {
    row: Producto;
    onEditar: (producto: ProductoForm) => void,
}) {
    const {row, onEditar} = props;
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [content, setContent] = useState("");
    const {
        id_item,
        nombre,
        desc_item,
        precio,
        duracion_min,
        duracion_max,
        id_tipo_item,
        desc_tipo_item,
        id_sub_servicio,
        tipo_sub_servicio
    } = row;
    let duracion_aprox = "";

    if (id_tipo_item == 2) duracion_aprox = `${duracion_min} | ${duracion_max} Minutos`;


    let descCorta = desc_item.trim();
    if (descCorta.length > 30) {
        descCorta = descCorta.slice(0, 30) + "...";
    }

    const handleEliminarProducto = (producto: ProductoForm) => {
        setContent(`Seguro que desea eliminar el ${producto?.desc_tipo_item} ${producto?.nombre}?`)
        setOpenConfirm(true);

    }

    return (
        <>
            <Fragment>
                <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                    {/*<TableCell>*/}
                    {/*    <IconButton*/}
                    {/*        aria-label={"expand row"}*/}
                    {/*        size={"small"}*/}
                    {/*        onClick={() => {*/}
                    {/*            setOpen(!open)*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}*/}
                    {/*    </IconButton>*/}
                    {/*</TableCell>*/}
                    <TableCell>
                        <IconButton onClick={() => onEditar(row)}>
                            <DriveFileRenameOutlineIcon color={"warning"} />
                        </IconButton>
                        <IconButton onClick={() => handleEliminarProducto(row)}>
                            <DeleteIcon color={"error"}/>
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">{nombre}</TableCell>
                    <TableCell width={"10%"}>{descCorta}</TableCell>
                    <TableCell>{precio}</TableCell>
                    <TableCell>{desc_tipo_item}</TableCell>
                    <TableCell>{tipo_sub_servicio}</TableCell>

                    <TableCell>{duracion_aprox}</TableCell>
                </TableRow>
                {/*<TableRow>*/}
                {/*    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>*/}
                {/*        <Collapse in={open} timeout={"auto"} unmountOnExit>*/}
                {/*            <Box sx={{margin: 1}}>*/}

                {/*                <Fragment>*/}

                {/*                    <Typography variant="h6" gutterBottom component="div">*/}
                {/*                        Historico*/}
                {/*                    </Typography>*/}
                {/*                    <Table size={"small"} aria-label={"historico"}>*/}
                {/*                        <TableHead>*/}
                {/*                            <TableRow>*/}
                {/*                                <TableCell>Fecha</TableCell>*/}
                {/*                                <TableCell>Precio</TableCell>*/}
                {/*                                <TableCell>Duracion Aproximada</TableCell>*/}
                {/*                            </TableRow>*/}
                {/*                        </TableHead>*/}
                {/*                        <TableBody>*/}
                {/*                            {row.history.map((historyRow) => (*/}
                {/*                                <TableRow key={historyRow.date}>*/}
                {/*                                    <TableCell>{historyRow.date}</TableCell>*/}
                {/*                                    <TableCell>{historyRow.precio}</TableCell>*/}
                {/*                                    <TableCell>{historyRow.duracion_aprox}</TableCell>*/}
                {/*                                </TableRow>*/}

                {/*                            ))}*/}
                {/*                        </TableBody>*/}
                {/*                    </Table>*/}
                {/*                </Fragment>*/}


                {/*            </Box>*/}
                {/*        </Collapse>*/}
                {/*    </TableCell>*/}
                {/*</TableRow>*/}
            </Fragment>

            <ConfirmDialog
                title={"Eliminar Item"}
                open={openConfirm}
                content={content}
                confirmText={"Eliminar"}
                onClose={() => setOpenConfirm(false)}
                onConfirm={() => console.log("eliminado")}/>
        </>

    )
}

const ProductService = () => {
    const {data, isLoading} = useGetItemPyme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);



    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    //Estado para manejar el producto que se esta agregando o editando
    const [productoActual, setProductoActual] = useState<ProductoForm | null>(null);

    const handleEditarProducto = (producto: ProductoForm) => {

        setProductoActual(producto);
        setOpen(true);
    };


    return (
        <Box sx={{height: "100%", width: "100%"}}>
            <Button
                variant="outlined"
                color="success"
                startIcon={<AddIcon/>}
                onClick={() => {
                    setProductoActual(null)
                    setOpen(true);
                }}
            >Agregar</Button>
            {/*<WinAgregarModificar accion={"modificar"} title="Modificar" />*/}
            <TableContainer component={Paper} sx={{width: "100%", height: "92%"}}>
                <Table stickyHeader aria-label={"Productos y servicios"}>
                    <TableHead>
                        <TableRow>
                            {/*<TableCell>Historico</TableCell>*/}
                            <TableCell>Acciones</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripcion</TableCell>
                            <TableCell>Precio</TableCell>

                            <TableCell>Tipo</TableCell>
                            <TableCell>Sub Servicio</TableCell>
                            <TableCell>Duracion Aproximada (Minutos)</TableCell>
                        </TableRow>
                    </TableHead>
                    {validarCarga(isLoading, data) ? (
                        <>
                            <TableBody>
                                {data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                            return (
                                                <Row key={row.id} row={row} onEditar={handleEditarProducto}/>
                                            )
                                        }

                                    )}
                            </TableBody>
                        </>

                    ) : "sin carga"}

                </Table>
            </TableContainer>
            {validarCarga(isLoading, data) && (
                <TablePagination
                    sx={{width: "100%", height: "10%"}}
                    component="div"
                    count={data.length}
                    onPageChange={handleChangePage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[10, 25, 100]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            )}

            {/*Ventana agregar modificar    */}
            <WinAgregarModificar
                accion={productoActual ? "modificar" : "agregar"}
                title={productoActual ? "Modificar" : "Agregar"}
                open={open}
                setOpen={setOpen}
                productData={productoActual}
            />


        </Box>
    );
}

export default ProductService;