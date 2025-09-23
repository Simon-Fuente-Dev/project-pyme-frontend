import Layout from '../layout/Layout.tsx'
import MainPage from '../pages/MainPage.tsx'
import ProductService from '../pages/ProductService.tsx'
import Review from '../pages/Review.tsx'
import Statistics from '../pages/Statistics.tsx'
import Login from '../pages/Login.tsx'
import {Routes, Route, Navigate} from "react-router-dom";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="/ProductService" element={<ProductService />} />
                <Route path="/Review" element={<Review />} />
                <Route path="/Statistics" element={<Statistics />} />
                {/* Redirección por defecto */}
                <Route path="*" element={<Navigate to="/" />} />
            </Route>
            <Route path="/login" element={<Login />} />

        </Routes>
    )
}

export default AppRoutes;