import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useProducts } from "../../context/ProductContext";

import "./Products.css";

function Products() {
    const { products, categories, setProducts } = useProducts();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    // -----------------------------------------
    // Delete Product
    // -----------------------------------------

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        setProducts((previousProducts) =>
            previousProducts.filter((product) => product.id !== id)
        );
    };

    // -----------------------------------------
    // Filter Products
    // -----------------------------------------

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                product.sku
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory;

            const productStatus =
                product.quantity === 0
                    ? "Out of Stock"
                    : "Active";

            const matchesStatus =
                selectedStatus === "All" ||
                productStatus === selectedStatus;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            );
        });
    }, [
        products,
        searchTerm,
        selectedCategory,
        selectedStatus,
    ]);

    // -----------------------------------------
    // Reset Pagination When Filters Change
    // -----------------------------------------

    useEffect(() => {
        setCurrentPage(1);
    }, [
        searchTerm,
        selectedCategory,
        selectedStatus,
    ]);

    // -----------------------------------------
    // Pagination
    // -----------------------------------------

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );

    const startIndex =
        (currentPage - 1) * productsPerPage;

    const currentProducts = filteredProducts.slice(
        startIndex,
        startIndex + productsPerPage
    );

    // -----------------------------------------
    // Format Price
    // -----------------------------------------

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="products-page">

            {/* ---------------------------------- */}
            {/* Page Header */}
            {/* ---------------------------------- */}

            <div className="products-header">

                <div>
                    <p className="products-eyebrow">
                        INVENTORY
                    </p>

                    <h1>Products</h1>

                    <p className="products-description">
                        Manage your cosmetics products and
                        inventory.
                    </p>
                </div>

                <Link
                    to="/products/add"
                    className="products-add-button"
                >
                    <span>+</span>
                    Add Product
                </Link>

            </div>

            {/* ---------------------------------- */}
            {/* Filters */}
            {/* ---------------------------------- */}

            <div className="products-toolbar">

                {/* Search */}

                <div className="search-box">

                    <span className="search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search by product name or SKU..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                    />

                    {searchTerm && (
                        <button
                            type="button"
                            className="clear-search"
                            onClick={() => setSearchTerm("")}
                        >
                            ×
                        </button>
                    )}

                </div>

                {/* Category Filter */}

                <div className="filter-group">

                    <label htmlFor="category-filter">
                        Category
                    </label>

                    <select
                        id="category-filter"
                        value={selectedCategory}
                        onChange={(event) =>
                            setSelectedCategory(event.target.value)
                        }
                    >
                        <option value="All">
                            All Categories
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.name}
                            >
                                {category.name}
                            </option>
                        ))}

                    </select>

                </div>

                {/* Status Filter */}

                <div className="filter-group">

                    <label htmlFor="status-filter">
                        Status
                    </label>

                    <select
                        id="status-filter"
                        value={selectedStatus}
                        onChange={(event) =>
                            setSelectedStatus(event.target.value)
                        }
                    >
                        <option value="All">
                            All Status
                        </option>

                        <option value="Active">
                            Active
                        </option>

                        <option value="Out of Stock">
                            Out of Stock
                        </option>

                    </select>

                </div>

            </div>

            {/* ---------------------------------- */}
            {/* Results Information */}
            {/* ---------------------------------- */}

            <div className="products-results">

                <div>
                    Showing{" "}
                    <strong>
                        {filteredProducts.length}
                    </strong>{" "}
                    of{" "}
                    <strong>
                        {products.length}
                    </strong>{" "}
                    products
                </div>

                {(searchTerm ||
                    selectedCategory !== "All" ||
                    selectedStatus !== "All") && (

                    <button
                        type="button"
                        className="clear-filters"
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory("All");
                            setSelectedStatus("All");
                        }}
                    >
                        Clear filters
                    </button>

                )}

            </div>

            {/* ---------------------------------- */}
            {/* Product Table */}
            {/* ---------------------------------- */}

            <div className="products-table-card">

                {filteredProducts.length === 0 ? (

                    <div className="products-empty">

                        <div className="products-empty-icon">
                            ⌕
                        </div>

                        <h3>
                            No products found
                        </h3>

                        <p>
                            Try changing your search or filter
                            options.
                        </p>

                    </div>

                ) : (

                    <div className="products-table-wrapper">

                        <table className="products-table">

                            <thead>
                                <tr>
                                    <th>PRODUCT</th>
                                    <th>SKU</th>
                                    <th>CATEGORY</th>
                                    <th>PRICE</th>
                                    <th>QUANTITY</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>

                                {currentProducts.map((product) => {

                                    const isOutOfStock =
                                        product.quantity === 0;

                                    return (
                                        <tr key={product.id}>

                                            {/* Product */}

                                            <td>

                                                <div className="product-table-info">

                                                    <div className="product-table-image">

                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                        />

                                                    </div>

                                                    <div>

                                                        <span className="product-table-name">
                                                            {product.name}
                                                        </span>

                                                        <span className="product-table-description">
                                                            {product.description}
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* SKU */}

                                            <td>

                                                <span className="product-sku">
                                                    {product.sku}
                                                </span>

                                            </td>

                                            {/* Category */}

                                            <td>

                                                <span className="product-category">
                                                    {product.category}
                                                </span>

                                            </td>

                                            {/* Price */}

                                            <td>

                                                <span className="product-table-price">
                                                    {formatPrice(product.price)}
                                                </span>

                                            </td>

                                            {/* Quantity */}

                                            <td>

                                                <span
                                                    className={
                                                        isOutOfStock
                                                            ? "product-quantity out"
                                                            : "product-quantity"
                                                    }
                                                >
                                                    {product.quantity}
                                                </span>

                                            </td>

                                            {/* Status */}

                                            <td>

                                                <span
                                                    className={
                                                        isOutOfStock
                                                            ? "product-status out"
                                                            : "product-status active"
                                                    }
                                                >

                                                    <span className="status-dot"></span>

                                                    {isOutOfStock
                                                        ? "Out of Stock"
                                                        : "Active"}

                                                </span>

                                            </td>

                                            {/* Actions */}

                                            <td>

                                                <div className="product-actions">

                                                    <Link
                                                        to={`/products/edit/${product.id}`}
                                                        className="action-button edit"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        className="action-button delete"
                                                        onClick={() =>
                                                            handleDelete(
                                                                product.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    );
                                })}

                            </tbody>

                        </table>

                    </div>

                )}

                {/* ---------------------------------- */}
                {/* Pagination */}
                {/* ---------------------------------- */}

                {filteredProducts.length > 0 && (
                    <div className="pagination">

                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage(
                                    (page) => page - 1
                                )
                            }
                        >
                            Previous
                        </button>

                        <span>
                            Page {currentPage} of{" "}
                            {totalPages}
                        </span>

                        <button
                            type="button"
                            disabled={
                                currentPage === totalPages
                            }
                            onClick={() =>
                                setCurrentPage(
                                    (page) => page + 1
                                )
                            }
                        >
                            Next
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
}

export default Products;