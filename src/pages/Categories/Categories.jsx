import { useState } from "react";
import { useProducts } from "../../context/ProductContext";

import "./Categories.css";

function Categories() {
    const {
        products,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        updateProduct,
    } = useProducts();

    const [newCategory, setNewCategory] = useState("");
    const [error, setError] = useState("");

    // Edit state
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");

    // -----------------------------------------
    // Product Count
    // -----------------------------------------

    const getProductCount = (categoryName) => {
        return products.filter(
            (product) => product.category === categoryName
        ).length;
    };

    // -----------------------------------------
    // Add Category
    // -----------------------------------------

    const handleAddCategory = (event) => {
        event.preventDefault();

        const name = newCategory.trim();

        if (!name) {
            setError("Please enter a category name.");
            return;
        }

        const alreadyExists = categories.some(
            (category) =>
                category.name.toLowerCase() === name.toLowerCase()
        );

        if (alreadyExists) {
            setError("This category already exists.");
            return;
        }

        addCategory({
            name,
            description: "New cosmetic product category.",
        });

        setNewCategory("");
        setError("");
    };

    // -----------------------------------------
    // Start Edit
    // -----------------------------------------

    const handleEditStart = (category) => {
        setEditingId(category.id);
        setEditingName(category.name);
        setError("");
    };

    // -----------------------------------------
    // Cancel Edit
    // -----------------------------------------

    const handleEditCancel = () => {
        setEditingId(null);
        setEditingName("");
        setError("");
    };

    // -----------------------------------------
    // Save Category Edit
    // -----------------------------------------

    const handleEditSave = (id) => {
        const name = editingName.trim();

        if (!name) {
            setError("Category name cannot be empty.");
            return;
        }

        const alreadyExists = categories.some(
            (category) =>
                category.id !== id &&
                category.name.toLowerCase() === name.toLowerCase()
        );

        if (alreadyExists) {
            setError("This category already exists.");
            return;
        }

        const oldCategory = categories.find(
            (category) => category.id === id
        );

        if (!oldCategory) {
            return;
        }

        // Update category
        updateCategory(id, {
            name,
        });

        // Update products that use the old category
        if (oldCategory.name !== name) {
            products.forEach((product) => {
                if (product.category === oldCategory.name) {
                    updateProduct(product.id, {
                        category: name,
                    });
                }
            });
        }

        setEditingId(null);
        setEditingName("");
        setError("");
    };

    // -----------------------------------------
    // Delete Category
    // -----------------------------------------

    const handleDeleteCategory = (id, categoryName) => {
        const productCount = getProductCount(categoryName);

        if (productCount > 0) {
            setError(
                `"${categoryName}" cannot be deleted because it contains ${productCount} product${productCount > 1 ? "s" : ""}.`
            );
            return;
        }

        const confirmed = window.confirm(
            `Delete the "${categoryName}" category?`
        );

        if (!confirmed) {
            return;
        }

        deleteCategory(id);
        setError("");
    };

    return (
        <div className="categories-page">

            {/* HEADER */}

            <div className="categories-header">

                <div>
                    <p className="categories-eyebrow">
                        PRODUCT MANAGEMENT
                    </p>

                    <h1>Categories</h1>

                    <p>
                        Organize your cosmetics products by category.
                    </p>
                </div>

            </div>

            {/* SUMMARY */}

            <div className="category-summary">

                <div className="category-summary-card">
                    <span>Total Categories</span>
                    <strong>{categories.length}</strong>
                </div>

                <div className="category-summary-card">
                    <span>Total Products</span>
                    <strong>{products.length}</strong>
                </div>

            </div>

            {/* ADD CATEGORY */}

            <div className="category-add-card">

                <div>
                    <h2>Add Category</h2>

                    <p>
                        Create a new category for your cosmetics catalog.
                    </p>
                </div>

                <form
                    className="category-add-form"
                    onSubmit={handleAddCategory}
                >

                    <input
                        type="text"
                        placeholder="Enter category name"
                        value={newCategory}
                        onChange={(event) =>
                            setNewCategory(event.target.value)
                        }
                    />

                    <button type="submit">
                        + Add Category
                    </button>

                </form>

            </div>

            {/* ERROR */}

            {error && (
                <div className="category-error">
                    {error}
                </div>
            )}

            {/* CATEGORY CARDS */}

            <div className="categories-grid">

                {categories.map((category) => {

                    const productCount = getProductCount(
                        category.name
                    );

                    const isEditing =
                        editingId === category.id;

                    return (
                        <div
                            className="category-card"
                            key={category.id}
                        >

                            {/* CARD TOP */}

                            <div className="category-card-top">

                                <div className="category-icon">
                                    {category.name.charAt(0).toUpperCase()}
                                </div>

                                <span className="category-count">
                                    {productCount} product
                                    {productCount !== 1 ? "s" : ""}
                                </span>

                            </div>

                            {/* EDIT MODE */}

                            {isEditing ? (

                                <div className="category-edit-form">

                                    <input
                                        type="text"
                                        value={editingName}
                                        onChange={(event) =>
                                            setEditingName(
                                                event.target.value
                                            )
                                        }
                                        autoFocus
                                    />

                                    <div className="category-edit-actions">

                                        <button
                                            type="button"
                                            className="category-save"
                                            onClick={() =>
                                                handleEditSave(
                                                    category.id
                                                )
                                            }
                                        >
                                            Save
                                        </button>

                                        <button
                                            type="button"
                                            className="category-cancel"
                                            onClick={handleEditCancel}
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </div>

                            ) : (

                                /* NORMAL MODE */

                                <>
                                    <h3>
                                        {category.name}
                                    </h3>

                                    <p>
                                        {category.description}
                                    </p>

                                    <div className="category-actions">

                                        <button
                                            type="button"
                                            className="category-edit"
                                            onClick={() =>
                                                handleEditStart(
                                                    category
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="category-delete"
                                            onClick={() =>
                                                handleDeleteCategory(
                                                    category.id,
                                                    category.name
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </>
                            )}

                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default Categories;


// import { useState } from "react";
// import { useProducts } from "../../context/ProductContext";
// import "./Categories.css";

// function Categories() {
//     const {
//         products,
//         categories,
//         addCategory,
//         updateCategory,
//         deleteCategory,
//     } = useProducts();

//     const [newCategory, setNewCategory] = useState("");
//     const [error, setError] = useState("");

//     const [editingId, setEditingId] = useState(null);
//     const [editingName, setEditingName] = useState("");

//     const getProductCount = (categoryName) => {
//         return products.filter(
//             (product) => product.category === categoryName
//         ).length;
//     };

//     // Add Category
//     const handleAddCategory = (event) => {
//         event.preventDefault();

//         const name = newCategory.trim();

//         if (!name) {
//             setError("Please enter a category name.");
//             return;
//         }

//         const alreadyExists = categories.some(
//             (category) =>
//                 category.name.toLowerCase() === name.toLowerCase()
//         );

//         if (alreadyExists) {
//             setError("This category already exists.");
//             return;
//         }

//         addCategory({
//             name,
//             description: "New cosmetic product category.",
//         });

//         setNewCategory("");
//         setError("");
//     };

//     // Start Edit
//     const handleEditStart = (category) => {
//         setEditingId(category.id);
//         setEditingName(category.name);
//         setError("");
//     };

//     // Cancel Edit
//     const handleEditCancel = () => {
//         setEditingId(null);
//         setEditingName("");
//         setError("");
//     };

//     // Save Edit
//     const handleEditSave = (id) => {
//         const name = editingName.trim();

//         if (!name) {
//             setError("Category name cannot be empty.");
//             return;
//         }

//         const alreadyExists = categories.some(
//             (category) =>
//                 category.id !== id &&
//                 category.name.toLowerCase() === name.toLowerCase()
//         );

//         if (alreadyExists) {
//             setError("This category already exists.");
//             return;
//         }

//         updateCategory(id, {
//             name,
//         });

//         setEditingId(null);
//         setEditingName("");
//         setError("");
//     };

//     // Delete Category
//     const handleDeleteCategory = (id, categoryName) => {
//         const confirmed = window.confirm(
//             `Delete the "${categoryName}" category?`
//         );

//         if (!confirmed) {
//             return;
//         }

//         deleteCategory(id);
//         setError("");
//     };

//     return (
//         <div className="categories-page">

//             {/* Header */}

//             <div className="categories-header">
//                 <div>
//                     <p className="categories-eyebrow">
//                         PRODUCT MANAGEMENT
//                     </p>

//                     <h1>Categories</h1>

//                     <p>
//                         Organize your cosmetics products by category.
//                     </p>
//                 </div>
//             </div>

//             {/* Summary */}

//             <div className="category-summary">

//                 <div className="category-summary-card">
//                     <span>Total Categories</span>
//                     <strong>{categories.length}</strong>
//                 </div>

//                 <div className="category-summary-card">
//                     <span>Total Products</span>
//                     <strong>{products.length}</strong>
//                 </div>

//             </div>

//             {/* Add Category */}

//             <div className="category-add-card">

//                 <div>
//                     <h2>Add Category</h2>

//                     <p>
//                         Create a new category for your cosmetics catalog.
//                     </p>
//                 </div>

//                 <form
//                     className="category-add-form"
//                     onSubmit={handleAddCategory}
//                 >
//                     <input
//                         type="text"
//                         placeholder="Enter category name"
//                         value={newCategory}
//                         onChange={(event) =>
//                             setNewCategory(event.target.value)
//                         }
//                     />

//                     <button type="submit">
//                         + Add Category
//                     </button>
//                 </form>

//             </div>

//             {/* Error */}

//             {error && (
//                 <div className="category-error">
//                     {error}
//                 </div>
//             )}

//             {/* Categories */}

//             <div className="categories-grid">

//                 {categories.map((category) => {

//                     const productCount = getProductCount(
//                         category.name
//                     );

//                     const isEditing = editingId === category.id;

//                     return (
//                         <div
//                             className="category-card"
//                             key={category.id}
//                         >

//                             <div className="category-card-top">

//                                 <div className="category-icon">
//                                     {category.name.charAt(0)}
//                                 </div>

//                                 <span className="category-count">
//                                     {productCount} product
//                                     {productCount !== 1 ? "s" : ""}
//                                 </span>

//                             </div>

//                             {isEditing ? (

//                                 <div className="category-edit-form">

//                                     <input
//                                         type="text"
//                                         value={editingName}
//                                         onChange={(event) =>
//                                             setEditingName(
//                                                 event.target.value
//                                             )
//                                         }
//                                         autoFocus
//                                     />

//                                     <div className="category-edit-actions">

//                                         <button
//                                             type="button"
//                                             className="category-save"
//                                             onClick={() =>
//                                                 handleEditSave(
//                                                     category.id
//                                                 )
//                                             }
//                                         >
//                                             Save
//                                         </button>

//                                         <button
//                                             type="button"
//                                             className="category-cancel"
//                                             onClick={handleEditCancel}
//                                         >
//                                             Cancel
//                                         </button>

//                                     </div>

//                                 </div>

//                             ) : (

//                                 <>
//                                     <h3>{category.name}</h3>

//                                     <p>
//                                         {category.description}
//                                     </p>

//                                     <div className="category-actions">

//                                         <button
//                                             type="button"
//                                             className="category-edit"
//                                             onClick={() =>
//                                                 handleEditStart(category)
//                                             }
//                                         >
//                                             Edit
//                                         </button>

//                                         <button
//                                             type="button"
//                                             className="category-delete"
//                                             onClick={() =>
//                                                 handleDeleteCategory(
//                                                     category.id,
//                                                     category.name
//                                                 )
//                                             }
//                                         >
//                                             Delete
//                                         </button>

//                                     </div>
//                                 </>

//                             )}

//                         </div>
//                     );
//                 })}

//             </div>

//         </div>
//     );
// }

// export default Categories;