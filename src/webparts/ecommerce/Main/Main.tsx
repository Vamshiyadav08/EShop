import * as React from 'react'
import { HashRouter as Router, Route, Routes, } from 'react-router-dom';
import type { IEcommerceProps } from '../IEcommerceProps';
import Home from '../Pages/HomePage/Home';
import styles from '../components/Main.module.scss'
import Product from '../Pages/ProductPage/Product';
import Cart from '../Pages/Cart/Cart';
import ProductList from '../Pages/ProductList/ProductList';
import CartItemsProvider from '../components/Context/Context';
import BuyNow from '../Pages/BuyNow/BuyNow';
import OrderConfirmed from '../Pages/OrderConfirmed/OrderConfirmed';
import Orders from '../Pages/Orders/Orders';
import NotFound from '../Pages/NotFound/NotFound';
import Login from '../Pages/LoginPage/Login';

const Main: React.FC<IEcommerceProps> = () =>{
  return (
    <div className={styles.Main}>
       <CartItemsProvider>
                <Router>
                <Routes>
                        <Route path="/Cartt" Component={Cart} />
                        <Route path="/" Component={Home} />
                        <Route path="/product/:productItemId" Component={Product} />
                        <Route path="/Mobiles" Component={ProductList} />
                        <Route path="/buyNow/:productItemId" Component={BuyNow}/>
                        <Route path="/orderConfirm" Component={OrderConfirmed}/>
                        <Route path='/orders' Component={Orders}/>
                        <Route path='*' Component={NotFound}/>
                        <Route path='/login' Component={Login}/>
                    </Routes>
                </Router>
            </CartItemsProvider>
    </div>
  )
}

export default Main;