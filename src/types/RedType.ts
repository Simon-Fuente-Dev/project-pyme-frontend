export type RedType = {
    id_red: number;
    nom_red: string;
}

export type AgregarEditarRed = {
    idRed: number;
    url: string;
    numeroTelefono: number;
}

export type RedPymeType = {
    id_tipo_red: number;
    id_red_pyme: number;
    url: string;
    numero_telefono: number;
}