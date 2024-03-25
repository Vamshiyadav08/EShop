import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./cart.module.scss";
import { Link } from "react-router-dom";
import { CartItem, CartItems, CartItemsContext, CartItemsContextType } from "../../components/Context/Context";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Cart({}: any): JSX.Element {
    const { cartItems, setCartItems }: CartItemsContextType = useContext(CartItemsContext);
    const [totalAmt, setTotalAmt] = useState<number>(0);
    const [subTotal, setSubTotal] = useState<number>(0);
    const navigate = useNavigate();

    const [token, setToken] = useState("");

    useEffect(() => {
        handleTotalAmount(cartItems);
        checkTokenAvailability();
    }, [cartItems]);

    const checkTokenAvailability = () => {
        const jwtToken = Cookies.get("jwtToken");
        if (jwtToken) {
            setToken(jwtToken);
        }
        console.log(token);
    };
    const handleItemsCount = (item: CartItem, operation: string, id: number) => {
        const existingItem = cartItems.findIndex((eachItem: CartItem) => eachItem.productItemId === id);
        console.log("clicked", existingItem);
        if (existingItem >= 0) {
            console.log(existingItem, operation);
            const updatedCartItems = [...cartItems];
            if (operation === "add") {
                updatedCartItems[existingItem] = {
                    ...updatedCartItems[existingItem],
                    count: updatedCartItems[existingItem].count + 1,
                };
                handleTotalAmount(updatedCartItems);
            } else {
                updatedCartItems[existingItem].count - 1 == 0
                    ? updatedCartItems.splice(existingItem, 1)
                    : (updatedCartItems[existingItem] = {
                          ...updatedCartItems[existingItem],
                          count: updatedCartItems[existingItem].count - 1,
                      });
                handleTotalAmount(updatedCartItems);
            }
            setCartItems(updatedCartItems);
        }
    };

    const handleRemove = (item: CartItem, id: number) => {
        const existingItem = cartItems.findIndex((eachItem: CartItem) => eachItem.productItemId === id);
        const updatedCartArr = [...cartItems];
        updatedCartArr.splice(existingItem, 1);

        handleTotalAmount(updatedCartArr);
        setCartItems(updatedCartArr);
    };
    const handleTotalAmount = (updatedCartItems: CartItems) => {
        const initialValue = 0;
        let totalAmount = updatedCartItems.reduce((acc, currentValue) => acc + currentValue.price * currentValue.count, initialValue);
        setSubTotal(totalAmount);

        const discountAmt = totalAmount * 0.05;
        const taxAmt = totalAmount * 0.03;

        const total = totalAmount - (taxAmt + discountAmt);
        setTotalAmt(total);
    };
    const handlenavigateToProduct = () => {
        navigate("/Mobiles");
    };

    return (
        <div style={{ position: "relative",height:"100vh" }}>
            <Header />
            {token.length > 0 ? (
                <div>
                    {cartItems.length <= 0 ? (
                        <div className={styles.addItemstoCartImg}>
                            <div>
                                <img src={require("../../assets/addItemsToTheCart.jpg")} alt="" />
                            </div>
                            <h3>Cart is Empty.. Try To Add Items</h3>
                            <button onClick={handlenavigateToProduct}>click to add Items</button>
                        </div>
                    ) : (
                        <div className={styles.cartContainer}>
                            <div className={styles.cart}>
                                <div className={styles.cartHeader}>AtlasCopco Eshop</div>
                                {cartItems.map((eachItem: CartItem, index: number) => (
                                    <div key={index} className={styles.cartItemsContainer}>
                                        <div className={styles.cartItems}>
                                            <div>
                                                <img src={eachItem.productItemImage.split(",")[0]} alt="" />
                                                <div className={styles.itemDetails}>
                                                    <b>{eachItem.productItemName}</b>
                                                    <p>Delivery by next Friday</p>
                                                    <p>ApparioRetial Pvt Ltd</p>
                                                    <b>&#8377;{eachItem.price}</b>
                                                    <span> % offers</span>
                                                </div>
                                            </div>
                                            <div className={styles.operators}>
                                                <span onClick={() => handleItemsCount(eachItem, "subtract", eachItem.productItemId)} className={styles.iconsOperators}>
                                                    -
                                                </span>
                                                <span className={styles.countOperator}>{eachItem.count}</span>
                                                <span onClick={() => handleItemsCount(eachItem, "add", eachItem.productItemId)} className={styles.iconsOperators}>
                                                    +
                                                </span>
                                                <b onClick={() => handleRemove(eachItem, eachItem.productItemId)}>REMOVE</b>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.priceDetails}>
                                <div className={styles.priceHeader}>
                                    <p>Price Details</p>
                                </div>
                                <div className={styles.price}>
                                    <p>SubTotal</p>
                                    <p>{subTotal}</p>
                                    <p>Discount</p>
                                    <p>5%</p>
                                    <p>Tax</p>
                                    <p>2%</p>
                                </div>
                                <div className={styles.priceTotal}>
                                    <p>Total :</p>
                                    <p>{totalAmt}</p>
                                </div>
                                <div className={styles.priceSaveTag}>
                                    <span>
                                        You will save{" "}
                                        {(subTotal - totalAmt).toLocaleString("en-IN", {
                                            maximumFractionDigits: 2,
                                            style: "currency",
                                            currency: "INR",
                                        })}{" "}
                                        on this order
                                    </span>
                                    <Link className={styles.link} to="/buyNow/cartProducts">
                                        <button>Place Order</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div style={{margin:"3rem",textAlign:"center"}}>
                    <h1>please login to add items to the cart</h1>
                    <button onClick={()=>navigate('/login?path=cartt')}>login</button>
                </div>
            )}
        </div>
    );
}
