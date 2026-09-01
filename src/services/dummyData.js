// src/services/dummyData.js

// Categories

export const initialCategories = [
    {
        id: 1,
        name: "Skincare",
        description: "Face and skin care products",
    },
    {
        id: 2,
        name: "Makeup",
        description: "Makeup and beauty products",
    },
    {
        id: 3,
        name: "Lip Care",
        description: "Lipsticks, balms and lip care products",
    },
    {
        id: 4,
        name: "Haircare",
        description: "Hair care and treatment products",
    },
    {
        id: 5,
        name: "Fragrance",
        description: "Perfumes and fragrances",
    },
    {
        id: 6,
        name: "Body Care",
        description: "Body lotions and body care products",
    },
];

// Products

export const initialProducts = [
    {
        id: 1,
        name: "Rose Glow Face Serum",
        sku: "GC-SER-001",
        description:
            "A lightweight face serum designed to hydrate the skin and provide a natural glow.",
        price: 899,
        quantity: 25,
        category: "Skincare",
        image:
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
        status: "Active",
        createdAt: "2026-08-01",
    },

    {
        id: 2,
        name: "Vitamin C Brightening Cream",
        sku: "GC-CRE-002",
        description:
            "A daily moisturizing cream with a brightening formula for a fresh-looking complexion.",
        price: 749,
        quantity: 18,
        category: "Skincare",
        image:
            "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=80",
        status: "Active",
        createdAt: "2026-08-03",
    },

    {
        id: 3,
        name: "Matte Liquid Foundation",
        sku: "GC-FOU-003",
        description:
            "A smooth liquid foundation offering comfortable coverage with a matte finish.",
        price: 999,
        quantity: 12,
        category: "Makeup",
        image:
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
        status: "Active",
        createdAt: "2026-08-05",
    },

    {
        id: 4,
        name: "Velvet Matte Lipstick",
        sku: "GC-LIP-004",
        description:
            "Highly pigmented matte lipstick with a smooth and comfortable finish.",
        price: 599,
        quantity: 30,
        category: "Lip Care",
        image:
            "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
        status: "Active",
        createdAt: "2026-08-07",
    },

    {
        id: 5,
        name: "Hydrating Lip Balm",
        sku: "GC-LIP-005",
        description:
            "A nourishing lip balm that helps keep lips soft, smooth and hydrated.",
        price: 299,
        quantity: 45,
        category: "Lip Care",
        image:
            "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=600&q=80",
        status: "Active",
        createdAt: "2026-08-09",
    },

    {
        id: 6,
        name: "Argan Repair Hair Serum",
        sku: "GC-HAI-006",
        description:
            "A lightweight hair serum formulated to improve shine and reduce the appearance of frizz.",
        price: 649,
        quantity: 20,
        category: "Haircare",
        image:
            "https://images.unsplash.com/photo-1527799820374-dcf8b8d4a5a9?auto=format&fit=crop&w=600&q=80",
        status: "Active",
        createdAt: "2026-08-11",
    },

    {
        id: 7,
        name: "Silk Bloom Eau de Parfum",
        sku: "GC-FRA-007",
        description:
            "A floral-inspired fragrance with a soft and elegant everyday scent.",
        price: 1299,
        quantity: 8,
        category: "Fragrance",
        image:
            "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
        status: "Active",
        createdAt: "2026-08-13",
    },

    {
        id: 8,
        name: "Cocoa Shea Body Lotion",
        sku: "GC-BOD-008",
        description:
            "A rich body lotion designed to moisturize and leave the skin feeling soft.",
        price: 549,
        quantity: 22,
        category: "Body Care",
        image:
            "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80",
        status: "Active",
        createdAt: "2026-08-15",
    },

    {
        id: 9,
        name: "Aloe Hydration Gel",
        sku: "GC-SKI-009",
        description:
            "A refreshing aloe-based gel for lightweight everyday skin hydration.",
        price: 449,
        quantity: 0,
        category: "Skincare",
        image:
            "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80",
        status: "Out of Stock",
        createdAt: "2026-08-17",
    },

    {
        id: 10,
        name: "Soft Glow Blush",
        sku: "GC-MAK-010",
        description:
            "A buildable powder blush that adds a soft natural-looking flush to the cheeks.",
        price: 699,
        quantity: 15,
        category: "Makeup",
        image:
            "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
        status: "Active",
        createdAt: "2026-08-19",
    },
];