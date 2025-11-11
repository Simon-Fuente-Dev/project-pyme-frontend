import Layout from '../layout/Layout.tsx'
import MainPage from '../pages/MainPage.tsx'
import ProductService from '../pages/ProductService.tsx'
import Review from '../pages/Review.tsx'
import Statistics from '../pages/Statistics.tsx'
import Login from '../pages/Login.tsx'
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from '../routers/ProtectedRoute.tsx'
import SettingsPage from "../pages/SettingsPage.tsx";
import Registro from "../pages/Registro.tsx";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Ruta publica */}
            <Route path="/Login" element={<Login />} />
            <Route path="/Registrarse" element={<Registro />}/>

            {/* Ruta Protegida */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }>
                <Route index element={<MainPage />} />
                <Route path="/ProductService" element={<ProductService />} />
                <Route path="/Review" element={<Review />} />
                <Route path="/Statistics" element={<Statistics />} />
                <Route path="/Settings" element={<SettingsPage />}/>
                {/* Redirección por defecto */}
                <Route path="*" element={<Navigate to="/" />} />
            </Route>

        </Routes>
    )
}

export default AppRoutes;