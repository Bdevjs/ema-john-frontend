import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import useProducts from '../../hooks/useProducts';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    //const [products, setProducts] = useProducts(); 
    //this section useFor product hooks
    // get product from another file
    const [cart, setCart] = useState([]);
    const [pages, setPages] = useState(0);
    const [selectpage, setSelectPage] = useState(0);
    const [size, setSize] = useState(10);
    const [products,setProducts] = useState([]);

    useEffect( () =>{
        const storedCart = getStoredCart();
        const savedCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product => product._id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products])

    useEffect( () =>{
        fetch(`http://localhost:5000/product?page=${selectpage}&size=${size} `)
        .then(res => res.json())
        .then(data => setProducts(data));

    }, [selectpage,size]);



    //This useEffect use for pagination
    useEffect(()=>{
        fetch('http://localhost:5000/productCount')
        .then (res => res.json())
        .then (data => {
            const count = data.count;
            const pag = Math.ceil(count/10);
            setPages(pag);
        })
    },[])

    const handleAddToCart = (selectedProduct) =>{
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        
        setCart(newCart);
        addToDb(selectedProduct._id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product 
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
                    {/*Important Dynamic CSS Impimatation in react  */}
                <div className='pagination'>{
                    [...Array(pages).keys()].map(number => 
                    <button onClick={()=>setSelectPage(number)} className={selectpage === number ? 'selected': ''}> 
                        {number}
                    </button>)
                }
                <select name ="" onChange={e=> setSize(e.target.value)}>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='20'>20</option>
                </select>
                </div>

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/orders">
                        <button>Review Order </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;