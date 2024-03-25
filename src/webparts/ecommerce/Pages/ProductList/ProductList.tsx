import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./productLsit.module.scss";
import Header from "../../components/Header/Header";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Property, brandObj } from "./IsideBarProps";

import FilteredItems from "./filteredItems/FilteredItems";
import { minPrice, maxPrice } from "./data";
import { Box, FormControl, InputLabel } from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem as Menuu } from "@mui/material";
import Footer from "../../components/Footer/Footer";
export default function ProductList(): JSX.Element {
    const [brands, setBrands] = useState<Array<brandObj>>([]);
    const [catagoryProperty, setCatagoryProperty] = useState<Property[]>();
    const [minPriceValue, setMinPriceValue] = useState<string>("");
    const [maxPriceValue, setMaxPriceValue] = useState<string>("");
    const [showAllItems, setShowAllItems] = useState<boolean>(true);
    const [catagoryFilterArr, setCatagoryFilterArr] = useState<string[]>([]);
    const [queryUrl, setQueryUrl] = useState<string>("");

    useEffect(() => {
        call("https://localhost:7258/api/Categories/brands/353b54c1-3ee2-4aee-8923-686927e4db9e", setBrands);
        call("https://localhost:7258/api/Categories/properties/353b54c1-3ee2-4aee-8923-686927e4db9e", setCatagoryProperty);
    }, []);

    const call = async (link: string, setMethod: Dispatch<SetStateAction<any>>) => {
        try {
            const options = {
                method: "GET",
            };
            const response = await fetch(link, options);
            const data = await response.json();
            setMethod(data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleMinPriceChange = (event: SelectChangeEvent) => {
        setMinPriceValue(event.target.value as string);
    };

    const handleMaxPriceChange = (event: SelectChangeEvent) => {
        setMaxPriceValue(event.target.value as string);
    };

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (checked) {
            setCatagoryFilterArr([...catagoryFilterArr, name]);
        } else {
            setCatagoryFilterArr(catagoryFilterArr.filter((eachItem: string) => eachItem !== name));
        }
    };

    const handlefilter = () => {
        createUrl();
        setShowAllItems(false);
        setCatagoryFilterArr([]);
        setMinPriceValue("");
        setMaxPriceValue("");
    };
    const createUrl = () => {
        const catagoryUrl = catagoryFilterArr.join("&");
        const priceQuery = `${minPriceValue.length > 0 ? `&MinPrice=${minPriceValue}` : ""}${maxPriceValue.length > 0 ? `&MaxPrice=${maxPriceValue}` : ""}`;
        const url = `${catagoryUrl.length > 0 ? `&${catagoryUrl}` : ""}${priceQuery.length > 0 ? `${priceQuery}` : ""}`;
        setQueryUrl(url);
    };

    return (
        <section>
            <Header />
            <HeaderNav />
            <div className={styles.productList}>
                <Sidebar className={styles.sidebar}>
                    <Menu className={styles.menu}>
                        <SubMenu label="Brands" style={{ fontWeight: "bold" }} className={styles.submenu}>
                            {brands &&
                                brands.map(eachItem => (
                                    <MenuItem className={styles.menuItem} key={eachItem.brandId}>
                                        <label>
                                            {" "}
                                            <input checked={catagoryFilterArr.includes(`Brands=${eachItem.brandId}`)} className={styles.catagoryCheckbox} onChange={handlechange} type="checkbox" name={`Brands=${eachItem.brandId}`} />
                                            {eachItem.brandName}
                                        </label>
                                    </MenuItem>
                                ))}
                        </SubMenu>
                        <Box display="flex" justifyContent="space-between">
                            <FormControl fullWidth>
                                <InputLabel>Min</InputLabel>
                                <Select label="min" variant="standard" value={minPriceValue} name="MinPrice" onChange={handleMinPriceChange}>
                                    {minPrice.map(i => (
                                        <Menuu key={i} value={i}>
                                            ₹{i}
                                        </Menuu>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Max</InputLabel>
                                <Select label="max" variant="standard" value={maxPriceValue} name="MaxPrice" onChange={handleMaxPriceChange}>
                                    {maxPrice.map(i => (
                                        <Menuu key={i} value={i}>
                                            ₹{i}
                                        </Menuu>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        {catagoryProperty &&
                            catagoryProperty.map((eachItem: Property) => (
                                <SubMenu key={eachItem.propertyId} style={{ fontWeight: "bold" }} className={styles.submenu} label={eachItem.propertyName.replace(/_/g, " ")}>
                                    {eachItem.propertyValues.map(eachValueItem => (
                                        <MenuItem className={styles.menuItem} key={eachValueItem.propertyValueId}>
                                            <label>
                                                {" "}
                                                <input className={styles.catagoryCheckbox} checked={catagoryFilterArr.includes(`${eachItem.propertyName}=${eachValueItem.propertyValue}`)} onChange={handlechange} type="checkbox" name={`${eachItem.propertyName}=${eachValueItem.propertyValue}`} />
                                                {eachValueItem.propertyValue}
                                            </label>
                                        </MenuItem>
                                    ))}
                                </SubMenu>
                            ))}
                    </Menu>
                    <button onClick={handlefilter} className={styles.filterBtn}>
                        Filter
                    </button>
                </Sidebar>
                {showAllItems ? <FilteredItems url={""} /> : <FilteredItems url={queryUrl} />}
            </div>
            <Footer/>
        </section>
    );
}
