import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    // const [loading, setLoading] = useState(true);

    useEffect(()=> {
        fetch(`https://fathomless-ocean-19937.herokuapp.com/product/${productKey}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    },[productKey]);
    
    document.title = 'Product detail';
    
    return (
        <div>
            <h1>Your Product Details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;