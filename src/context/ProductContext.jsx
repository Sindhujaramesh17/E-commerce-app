import { createContext, useContext } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

import {
    initialProducts,
    initialCategories,
} from "../services/dummyData";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
    // -----------------------------------------
    // Products
    // -----------------------------------------

    const [products, setProducts] = useLocalStorage(
        "glowe-products",
        initialProducts
    );

    // -----------------------------------------
    // Categories
    // -----------------------------------------

    const [categories, setCategories] = useLocalStorage(
        "glowe-categories",
        initialCategories
    );

    // -----------------------------------------
    // Add Product
    // -----------------------------------------

    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: Date.now(),
        };

        setProducts((currentProducts) => [
            ...currentProducts,
            newProduct,
        ]);
    };

    // -----------------------------------------
    // Update Product
    // -----------------------------------------

    const updateProduct = (id, updatedProduct) => {
        setProducts((currentProducts) =>
            currentProducts.map((product) =>
                product.id === id
                    ? {
                        ...product,
                        ...updatedProduct,
                        id: product.id,
                    }
                    : product
            )
        );
    };

    // -----------------------------------------
    // Delete Product
    // -----------------------------------------

    const deleteProduct = (id) => {
        setProducts((currentProducts) =>
            currentProducts.filter((product) => product.id !== id)
        );
    };

    // -----------------------------------------
    // Add Category
    // -----------------------------------------

    const addCategory = (category) => {
        const newCategory = {
            ...category,
            id: Date.now(),
        };

        setCategories((currentCategories) => [
            ...currentCategories,
            newCategory,
        ]);
    };

    // -----------------------------------------
    // Update Category
    // -----------------------------------------

    const updateCategory = (id, updatedCategory) => {
        setCategories((currentCategories) =>
            currentCategories.map((category) =>
                category.id === id
                    ? {
                        ...category,
                        ...updatedCategory,
                        id: category.id,
                    }
                    : category
            )
        );
    };

    // -----------------------------------------
    // Delete Category
    // -----------------------------------------

    const deleteCategory = (id) => {
        setCategories((currentCategories) =>
            currentCategories.filter((category) => category.id !== id)
        );
    };

    // -----------------------------------------
    // Context Value
    // -----------------------------------------

    const value = {
        products,
        categories,

        setProducts,
        setCategories,

        addProduct,
        updateProduct,
        deleteProduct,

        addCategory,
        updateCategory,
        deleteCategory,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}

// -----------------------------------------
// Custom Context Hook
// -----------------------------------------

export function useProducts() {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error(
            "useProducts must be used inside ProductProvider"
        );
    }

    return context;
}