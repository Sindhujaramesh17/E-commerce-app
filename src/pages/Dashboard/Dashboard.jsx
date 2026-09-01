import { useMemo } from "react";
import { Link } from "react-router-dom";

import { useProducts } from "../../context/ProductContext";

import "./Dashboard.css";

function Dashboard() {
    const { products, categories } = useProducts();

    // Dashboard Statistics

    const totalProducts = products.length;

    const totalCategories = categories.length;

    const outOfStockProducts = products.filter(
        (product) => product.quantity === 0
    ).length;

    // Recent Products


    const recentProducts = useMemo(() => {
        return [...products]
            .sort(
                (a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
            )
            .slice(0, 5);
    }, [products]);

    // Format Price

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="dashboard-page">

            {/**/}
            {/* Page Header */}
            {/**/}

            <div className="dashboard-header">

                <div>
                    <p className="dashboard-eyebrow">
                        OVERVIEW
                    </p>

                    <h1>Dashboard</h1>

                    <p className="dashboard-description">
                        Welcome back! Here's what's happening
                        with your cosmetics store.
                    </p>
                </div>

                <Link
                    to="/products/add"
                    className="dashboard-add-button"
                >
                    <span>+</span>
                    Add Product
                </Link>

            </div>

            {/**/}
            {/* Statistics Cards */}
            {/**/}

            <div className="dashboard-stats">

                {/* Total Products */}

                <div className="stat-card">
                    <div className="stat-card-top">
                        <div className="stat-icon products-icon">
                            ✦
                        </div>

                        <span className="stat-label">
                            PRODUCTS
                        </span>
                    </div>

                    <div className="stat-number">
                        {totalProducts}
                    </div>

                    <p className="stat-description">
                        Total products in inventory
                    </p>
                </div>

                {/* Total Categories */}

                <div className="stat-card">
                    <div className="stat-card-top">
                        <div className="stat-icon categories-icon">
                            ◈
                        </div>

                        <span className="stat-label">
                            CATEGORIES
                        </span>
                    </div>

                    <div className="stat-number">
                        {totalCategories}
                    </div>

                    <p className="stat-description">
                        Available product categories
                    </p>
                </div>

                {/* Out of Stock */}

                <div className="stat-card">
                    <div className="stat-card-top">
                        <div className="stat-icon stock-icon">
                            !
                        </div>

                        <span className="stat-label">
                            OUT OF STOCK
                        </span>
                    </div>

                    <div className="stat-number">
                        {outOfStockProducts}
                    </div>

                    <p className="stat-description">
                        Products needing restock
                    </p>
                </div>

            </div>

            {/**/}
            {/* Recent Products */}
            {/**/}

            <div className="recent-products-section">

                <div className="section-header">

                    <div>
                        <p className="section-eyebrow">
                            INVENTORY
                        </p>

                        <h2>Recent Products</h2>

                        <p>
                            Recently added cosmetics to your store.
                        </p>
                    </div>

                    <Link
                        to="/products"
                        className="view-all-link"
                    >
                        View all →
                    </Link>

                </div>

                {/* Product Table */}

                <div className="dashboard-table-wrapper">

                    {recentProducts.length === 0 ? (
                        <div className="empty-dashboard">
                            <div className="empty-icon">
                                ✦
                            </div>

                            <h3>No products yet</h3>

                            <p>
                                Add your first cosmetic product
                                to get started.
                            </p>

                            <Link
                                to="/products/add"
                                className="empty-add-button"
                            >
                                Add Product
                            </Link>
                        </div>
                    ) : (
                        <table className="dashboard-table">

                            <thead>
                                <tr>
                                    <th>PRODUCT</th>
                                    <th>SKU</th>
                                    <th>CATEGORY</th>
                                    <th>PRICE</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentProducts.map((product) => (

                                    <tr key={product.id}>

                                        {/* Product */}

                                        <td>
                                            <div className="dashboard-product">

                                                <div className="dashboard-product-image">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                    />
                                                </div>

                                                <div>
                                                    <span className="product-name">
                                                        {product.name}
                                                    </span>

                                                    <span className="product-description">
                                                        {product.description}
                                                    </span>
                                                </div>

                                            </div>
                                        </td>

                                        {/* SKU */}

                                        <td>
                                            <span className="sku">
                                                {product.sku}
                                            </span>
                                        </td>

                                        {/* Category */}

                                        <td>
                                            <span className="category-badge">
                                                {product.category}
                                            </span>
                                        </td>

                                        {/* Price */}

                                        <td>
                                            <span className="product-price">
                                                {formatPrice(product.price)}
                                            </span>
                                        </td>

                                        {/* Status */}

                                        <td>
                                            {product.quantity === 0 ? (
                                                <span className="status-badge out-of-stock">
                                                    <span className="status-dot"></span>
                                                    Out of Stock
                                                </span>
                                            ) : (
                                                <span className="status-badge active">
                                                    <span className="status-dot"></span>
                                                    Active
                                                </span>
                                            )}
                                        </td>

                                    </tr>

                                ))}
                            </tbody>

                        </table>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;