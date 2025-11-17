import {Navigate} from "react-router-dom";
import {useAppContext} from "../context/AppContext";

interface Props {
    children: JSX.Element
}

const ProtectedRoute = ({children}: Props) => {
    const {token, isSessionLoading} = useAppContext()
    if (isSessionLoading) {
        return <p>Cargando sesión...</p> // o spinner, skeleton, etc.
    }
    if (!token) {
        return <Navigate to="/Login" replace/>
    }

    return children
}

export default ProtectedRoute