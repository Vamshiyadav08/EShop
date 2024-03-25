import React, { useEffect, useState } from "react";
import styles from "./filteredItems.module.scss";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

interface FilteredItemsProps {
    url: string;
}

export default function FilteredItems({ url }: FilteredItemsProps): JSX.Element {
    const [allItemsData, setAllItemsData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const filterUrl = "https://localhost:7258/api/Filter/353B54C1-3EE2-4AEE-8923-686927E4DB9E";

    useEffect(() => {
        url.length > 0 ? getFilteredProducts() : getAllProducts();
    }, [url]);

    const getFilteredProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${filterUrl}?${url}`);
            const data = await response.json();
            setAllItemsData(data.filteredProductItems);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(filterUrl);
            const data = await response.json();
            setAllItemsData(data.filteredProductItems);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        getAllProducts();
    };

    return (
        <section className={styles.filterContainer}>
            <div className={styles.clearListWrapper}>
                <button onClick={handleClear}>Clear All</button>
            </div>
            {loading ? (
                <div>
                    <p style={{ textAlign: "center" }}> Loading...</p>

                    <Box sx={{ width: "100%" }}>
                        <LinearProgress />
                    </Box>
                </div>
            ) : allItemsData && allItemsData.length > 0 ? (
                allItemsData.map((eachItem: any, index: number) => (
                    <div key={index} className={styles.listWrapper}>
                        <Link style={{ textDecoration: "none", color: "black" }} to={`../product/${eachItem.productItemId}`}>
                            <div className={styles.listItemWrapper}>
                                <div>
                                    <img className={styles.listImg} src={eachItem.productItemImage.split(",")[0]} alt="" />
                                </div>
                                <div className={styles.itemDetails}>
                                    <p>{eachItem.productItemName}</p>
                                    {Array.from({ length: Math.floor(eachItem.rating) }, (_, index) => (
                                        <StarIcon className={styles.starIcon} key={index} />
                                    ))}
                                    <ul>
                                        {Object.entries(eachItem.specifications)
                                            .slice(0, 4)
                                            .map(([key, value]) => (
                                                <li key={key}>
                                                    {value as string} {key}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                                <div className={styles.priceWrapper}>
                                    <p className={styles.price}>&#x20b9; {eachItem.price}</p>
                                    <p>Delivered within 7 days of order</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <div className={styles.noDataWrapper}>
                    <div>
                        <img className={styles.img} src={require("./../../../assets/nodata2.png")} alt="" />
                        <p>Despite our efforts with the filtered keywords, we're not uncovering any matching data</p>
                        <p>Try with different Keywords</p>
                    </div>
                </div>
            )}
        </section>
    );
}
