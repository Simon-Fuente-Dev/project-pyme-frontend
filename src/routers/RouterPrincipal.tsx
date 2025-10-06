import Layout from '../layout/Layout.tsx'
import MainPage from '../pages/MainPage.tsx'
import ProductService from '../pages/ProductService.tsx'
import Review from '../pages/Review.tsx'
import Statistics from '../pages/Statistics.tsx'
import Login from '../pages/Login.tsx'
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from '../routers/ProtectedRoute.tsx'

const AppRoutes = () => {
    return (
        <Routes>

            {/* Ruta publica */}
            <Route path="/Login" element={<Login />} />


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
                {/* Redirección por defecto */}
                <Route path="*" element={<Navigate to="/" />} />
            </Route>

        </Routes>
    )
}

export default AppRoutes;