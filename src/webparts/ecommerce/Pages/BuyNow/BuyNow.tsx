import React, { useEffect, useState, useContext } from "react";
import styles from "./buyNow.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link, useParams } from "react-router-dom";
import { CartItemsContext,CartItemsContextType } from "../../components/Context/Context";
import { sp  } from "@pnp/sp/presets/all";

export default function BuyNow(): JSX.Element {
    const { productItemId } = useParams();
    const [productsData, setProductsData] = useState<any>([]);
    const { cartItems }: CartItemsContextType = useContext(CartItemsContext);
    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        sp.setup({
            sp: {
              baseUrl:
                "https://onevirtualoffice.sharepoint.com/sites/GECIASharePointTest",
              headers: {
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
              },
            },
          });

        productItemId == "cartProducts" ? setProductsData(cartItems) : callProduct();
        calculateCount()
    }, [productItemId,productsData]);

    const callProduct = async () => {
        try {
            const options = {
                method: "GET",
            };
            const response: any = await fetch(`https://localhost:7258/api/Product/${productItemId}`, options);
            const data = await response.json();
            setProductsData([
                {
                    count: 1,
                    productItemId: data.productItemDetails.productItemId,
                    productId: data.productItemDetails.productId,
                    productItemImage: data.productItemDetails.productItemImage,
                    productItemName: data.productItemDetails.productItemName,
                    qtyInStock: data.productItemDetails.qtyInStock,
                    rating: data.productItemDetails.rating,
                    price: data.productItemDetails.price,
                },
            ]);
           
        } catch (error) {
            console.log(error);
        }
    };

    const calculateCount=()=>{
        const total = productsData.reduce((acc: number, curr: any) => acc + (curr.count*curr.price), 0);
        setTotalCount(total);
    };

    const handleSubmit = async () => {
        try {
            for (const item of productsData) {
                const result = await sp.web.lists.getByTitle("EcommerceStore").items.add({
                    Title: item.productItemName,
                    productItemIdd: item.productItemId,
                    price: item.price,
                    count2:item.count,
                    img: item.productItemImage.split(",")[0],

                });
    
                console.log("Item added successfully:", result);
            }
            console.log("All items added successfully");
        } catch (error) {
            console.error("Error adding items to list:", error);
        }
    };
    console.log(productsData, cartItems);
    return (
        <>
            <Header />
            <section className={styles.buyNow}>
                <div className={styles.loginInfo}>
                    <h3>Login Detials :</h3>
                </div>
                <div className={styles.delivaryInfo}>
                    <h3>Adress Details :</h3>
                    <div>
                        <p>warangal </p>
                    </div>
                </div>
                {productsData &&
                    productsData.map((eachItem: any) => (
                        <div key={eachItem.productItemId} className={styles.selectedItems}>
                            <h3>summary :</h3>
                            <div className={styles.selectedItemsDetails}>
                                <div>
                                    <img className={styles.img} src={eachItem.productItemImage.split(",")[0]} alt={eachItem.productItemName} />
                                </div>
                                <div className={styles.details}>
                                    <b>{eachItem.productItemName}</b>
                                    <p>Delivery by next Friday</p>
                                    <p>ApparioRetial Pvt Ltd</p>
                                    <b>&#8377;{eachItem.price}</b>
                                    <span> % offers</span>
                                </div>
                            </div>
                        </div>
                    ))}
                <div className={styles.checkout}>
                    <span>Ordred will be placed with {}</span>
                    <b>Total Price = {totalCount}</b>
                    <Link to="/orderConfirm">
                        <button onClick={handleSubmit}>checkout</button>
                    </Link>
                </div>
            </section>
            <Footer />
        </>
    );
}
