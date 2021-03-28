/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    document.title = 'Shop More';

    useEffect(()=>{
        fetch('https://fathomless-ocean-19937.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://fathomless-ocean-19937.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data));
    },[]);

    const handleAddProduct = (product) => { 
         const toBeaddedKey = product.key;
         const sameProduct = cart.find(pd => pd.key === toBeaddedKey);

         let count = 1;
         let newCart;

         if(sameProduct){
             count = sameProduct.quantity + 1;
             sameProduct.quantity = count;
             const others = cart.filter(pd => pd.key !== toBeaddedKey);
             newCart = [...others, sameProduct];
         }
         else{
             product.quantity = 1;
             newCart = [...cart, product];
         }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className='twin-container'>
            <div className="product-container">
                {/* {
                    products.length === 0 && <CircularProgress />
                } */}
                 {
                   products.map(pd => <Product 
                    key={pd.key}
                    showAddToCart={true}
                    handleAddProduct={handleAddProduct}
                    product={pd}>
                    </Product>)
                 }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review">
                    <button className="main-button">Review Order</button>
                </Link>
                </Cart>
            </div>
         </div>
    );
};

export default Shop;