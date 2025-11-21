export const validarCarga= (loading, data) =>  {
    if(!loading && data?.length > 0) {
        return true;
    }
    return false;
}