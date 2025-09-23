export type TipoItem = "Producto" | "Servicio";

//Interfaz de producto
export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    tipo: TipoItem;
    idTipo: number;
    precio: number;
    duracion_min: number;
    duracion_max: number;
    duracion_aprox: string;
}

export interface HistoryEntry {
    itemId: number;
    date: string;
    precio: number;
    duracion_min: number;
    duracion_max: number;
    duracion_aprox: string;
}



//Esta interfaz es para el grid con el obj del historico
export interface ProductoConHistorial extends Producto {
    history: HistoryEntry[];
}