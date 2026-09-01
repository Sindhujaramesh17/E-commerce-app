import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import ProductForm from "./pages/ProductForm/ProductForm";
import Layout from "./components/Layout/Layout";
import Categories from "./pages/Categories/Categories";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <Routes>

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      {/* Products */}
      <Route
        path="/products"
        element={
          <Layout>
            <Products />
          </Layout>
        }
      />

      {/* Add Product */}
      <Route
        path="/products/add"
        element={
          <Layout>
            <ProductForm />
          </Layout>
        }
      />

      {/* Edit Product */}
      <Route
        path="/products/edit/:id"
        element={
          <Layout>
            <ProductForm />
          </Layout>
        }
      />

      {/* Categories */}
      <Route
        path="/categories"
        element={
          <Layout>
            <Categories />
          </Layout>
        }
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={
          <Layout>
            <Settings />
          </Layout>
        }
      />

      {/* Default */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;