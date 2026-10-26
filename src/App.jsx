import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import ProductRedirect from "./pages/ProductRedirect";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileInfoPage from "./pages/ProfileInfoPage";
import ProfileOrdersPage from "./pages/ProfileOrdersPage";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/AdminPage";
import AdminProducts from "./components/admin/AdminProducts";
import AdminCategories from "./components/admin/AdminCategories";
import AdminUsers from "./components/admin/AdminUsers";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<Navigate to="/" replace />} />
        <Route path="category/:categoryId" element={<CategoryPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:productId" element={<ProductPage />} />
        <Route path="product/:productId" element={<ProductRedirect />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="profile" element={<ProfilePage />}>
          <Route index element={<ProfileInfoPage />} />
          <Route path="orders" element={<ProfileOrdersPage />} />
          <Route path="orders/:orderId" element={<OrderPage />} />
        </Route>
        <Route path="admin" element={<AdminPage />}>
          <Route index element={<Navigate to="products" replace />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
