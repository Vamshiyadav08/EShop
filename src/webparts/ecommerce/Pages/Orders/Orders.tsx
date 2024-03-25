import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { sp } from "@pnp/sp/presets/all";
import CircleIcon from "@mui/icons-material/Circle";
import styles from "./orders.module.scss";

// import styles from './orders.module.scss';
export default function Orders() {
    const [productsData, setProductsData] = useState<any>([]);
  
    useEffect(() => {
        sp.setup({
            sp: {
                baseUrl: "https://onevirtualoffice.sharepoint.com/sites/GECIASharePointTest",
                headers: {
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                },
            },
        });
        getListItems();
    }, []);
    const getListItems = async () => {
        try {
            const list = await sp.web.lists.getByTitle("EcommerceStore").items.get();
            setProductsData(list);
            console.log("List items:", list);
        } catch (error) {
            console.error("Error retrieving list items:", error);
        }
    };
    console.log(productsData, "list");
    return (
        <section>
            <Header />
            <HeaderNav />
            {productsData &&
                productsData.map((eachItem: any, index: number) => (
                    <div className={styles.orders}>
                        <img className={styles.img} src={eachItem.img} alt="" />

                        <div>
                            <p style={{fontWeight:"700"}}>{eachItem.Title}</p>
                            <p><b>No of items : </b>{eachItem.count2}</p>
                            <p>Sony private limited </p>
                        </div>
                        <div className={styles.status}>
                            <p>
                                <CircleIcon className={styles.icon} />
                                Order Confirmed
                            </p>
                            <p>Delivery started Packing from ware house</p>
                        </div>
                    </div>
                ))}
            <Footer />
        </section>
    );
}
