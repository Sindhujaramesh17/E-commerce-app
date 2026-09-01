import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import "./ProductForm.css";

function ProductForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { products, setProducts } = useContext(ProductContext);

    const isEditMode = Boolean(id);

    const existingProduct = products.find(
        (product) => product.id === Number(id)
    );

    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        category: "",
        price: "",
        quantity: "",
        image: "",
        description: "",
        status: "Active",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (isEditMode && existingProduct) {
            setFormData({
                name: existingProduct.name || "",
                sku: existingProduct.sku || "",
                category: existingProduct.category || "",
                price: existingProduct.price || "",
                quantity: existingProduct.quantity ?? "",
                image: existingProduct.image || "",
                description: existingProduct.description || "",
                status: existingProduct.status || "Active",
            });
        }
    }, [isEditMode, existingProduct]);

    useEffect(() => {
        if (isEditMode && !existingProduct) {
            setError("Product not found.");
        }
    }, [isEditMode, existingProduct]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setError("");

        if (
            !formData.name ||
            !formData.sku ||
            !formData.category ||
            formData.price === "" ||
            formData.quantity === ""
        ) {
            setError("Please fill in all required fields.");
            return;
        }

        if (Number(formData.price) < 0) {
            setError("Price cannot be negative.");
            return;
        }

        if (Number(formData.quantity) < 0) {
            setError("Quantity cannot be negative.");
            return;
        }

        if (isEditMode) {
            setProducts((previousProducts) =>
                previousProducts.map((product) =>
                    product.id === Number(id)
                        ? {
                            ...product,
                            name: formData.name,
                            sku: formData.sku,
                            category: formData.category,
                            price: Number(formData.price),
                            quantity: Number(formData.quantity),
                            image: formData.image,
                            description: formData.description,
                            status: formData.status,
                        }
                        : product
                )
            );
        } else {
            const newProduct = {
                id: products.length
                    ? Math.max(
                        ...products.map((product) => product.id)
                    ) + 1
                    : 1,
                name: formData.name,
                sku: formData.sku,
                category: formData.category,
                price: Number(formData.price),
                quantity: Number(formData.quantity),
                image: formData.image,
                description: formData.description,
                status: formData.status,
            };

            setProducts((previousProducts) => [
                ...previousProducts,
                newProduct,
            ]);
        }

        navigate("/products");
    };

    if (isEditMode && !existingProduct) {
        return (
            <div className="product-form-page">
                <div className="product-form-card">
                    <div className="products-empty">
                        <div className="products-empty-icon">
                            !
                        </div>

                        <h3>Product not found</h3>

                        <p>
                            The product you are trying to edit
                            does not exist.
                        </p>

                        <button
                            type="button"
                            className="save-button"
                            onClick={() => navigate("/products")}
                        >
                            Back to Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-form-page">

            {/* Header */}

            <div className="product-form-header">

                <div>
                    <p className="product-form-eyebrow">
                        PRODUCT MANAGEMENT
                    </p>

                    <h1>
                        {isEditMode
                            ? "Edit Product"
                            : "Add Product"}
                    </h1>

                    <p>
                        {isEditMode
                            ? "Update the product information and inventory details."
                            : "Add a new cosmetic product to your inventory."}
                    </p>
                </div>

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate("/products")}
                >
                    ← Back to Products
                </button>

            </div>

            {/* Form */}

            <form
                className="product-form-card"
                onSubmit={handleSubmit}
            >

                {/* Product Information */}

                <div className="form-section">

                    <h2>Product Information</h2>

                    <p>
                        Enter the basic details of the cosmetic product.
                    </p>

                    <div className="form-grid">

                        {/* Product Name */}

                        <div className="form-group">

                            <label htmlFor="name">
                                Product Name <span>*</span>
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="e.g. Rose Glow Face Serum"
                                value={formData.name}
                                onChange={handleChange}
                            />

                        </div>

                        {/* SKU */}

                        <div className="form-group">

                            <label htmlFor="sku">
                                SKU <span>*</span>
                            </label>

                            <input
                                id="sku"
                                name="sku"
                                type="text"
                                placeholder="e.g. GC-SER-011"
                                value={formData.sku}
                                onChange={handleChange}
                            />

                        </div>

                        {/* Category */}

                        <div className="form-group">

                            <label htmlFor="category">
                                Category <span>*</span>
                            </label>

                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select category
                                </option>

                                <option value="Skincare">
                                    Skincare
                                </option>

                                <option value="Makeup">
                                    Makeup
                                </option>

                                <option value="Lip Care">
                                    Lip Care
                                </option>

                                <option value="Haircare">
                                    Haircare
                                </option>

                                <option value="Fragrance">
                                    Fragrance
                                </option>
                            </select>

                        </div>

                        {/* Status */}

                        <div className="form-group">

                            <label htmlFor="status">
                                Status
                            </label>

                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Active">
                                    Active
                                </option>

                                <option value="Inactive">
                                    Inactive
                                </option>
                            </select>

                        </div>

                        {/* Price */}

                        <div className="form-group">

                            <label htmlFor="price">
                                Price (₹) <span>*</span>
                            </label>

                            <input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                placeholder="899"
                                value={formData.price}
                                onChange={handleChange}
                            />

                        </div>

                        {/* Quantity */}

                        <div className="form-group">

                            <label htmlFor="quantity">
                                Quantity <span>*</span>
                            </label>

                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                min="0"
                                placeholder="25"
                                value={formData.quantity}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>

                {/* Image */}

                <div className="form-section">

                    <h2>Product Image</h2>

                    <p>
                        Add an image URL for the product.
                    </p>

                    <div className="form-group">

                        <label htmlFor="image">
                            Image URL
                        </label>

                        <input
                            id="image"
                            name="image"
                            type="url"
                            placeholder="https://example.com/product-image.jpg"
                            value={formData.image}
                            onChange={handleChange}
                        />

                    </div>

                    {formData.image && (
                        <div className="image-preview">

                            <img
                                src={formData.image}
                                alt="Product preview"
                            />

                        </div>
                    )}

                </div>

                {/* Description */}

                <div className="form-section">

                    <h2>Description</h2>

                    <p>
                        Add a short description for the product.
                    </p>

                    <div className="form-group">

                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            rows="5"
                            placeholder="Describe the product..."
                            value={formData.description}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                {/* Error */}

                {error && (
                    <div className="form-error">
                        {error}
                    </div>
                )}

                {/* Actions */}

                <div className="form-actions">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate("/products")}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="save-button"
                    >
                        {isEditMode
                            ? "Save Changes"
                            : "Add Product"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default ProductForm;