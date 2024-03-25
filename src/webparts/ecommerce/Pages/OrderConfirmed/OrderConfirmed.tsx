import React from "react";
import styles from "./orderConfirmed.module.scss";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function OrderConfirmed(): JSX.Element {
    return (
        <div className={styles.OrderConfirmed}>
            <Header />
            <div>
                <img src={require('../../assets/orderConfirm.gif')} alt="" />
                <div>
                    <Link to="/orders">
                        <button className={styles.orderpageBtn}>Go to Order Page</button>
                    </Link>
                    <Link to="/Mobiles">
                        <button className={styles.searchBtn}>Search Products</button>
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
}
