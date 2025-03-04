import React, { useState, useEffect } from 'react';
import GetInfiniteProducts from './getInfiniteProducts';

const ProductFetcher = ({ fetchMethod, fetchParams }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMoreProducts, setHasMoreProducts] = useState(true); // Track if there are more products

    // Fetch function inside ProductFetcher
    const fetchProducts = async () => {
        if (loading || !hasMoreProducts) return; // Prevent multiple calls while loading or if no more products
        setLoading(true);

        try {
            const updatedParams = { ...fetchParams, PageNumber: page };

            const data = await fetchMethod(updatedParams);

            // If no products were returned, set hasMoreProducts to false
            if (data.length === 0) {
                setHasMoreProducts(false);
            }

            setProducts((prevProducts) => [...prevProducts, ...data]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <GetInfiniteProducts 
            products={products} 
            loading={loading} 
            loadMore={fetchProducts} 
            hasMoreProducts={hasMoreProducts} // Pass hasMoreProducts to GetInfiniteProducts
        />
    );
};

export default ProductFetcher;
