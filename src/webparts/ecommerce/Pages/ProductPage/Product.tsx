import React, { useContext, useState, useEffect } from "react";
import styles from "./Product.module.scss";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import DiscountIcon from "@mui/icons-material/Discount";
import { color, ram, storage } from "./data";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import Header from "../../components/Header/Header";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { useNavigate } from "react-router-dom";
import { CartItemsContext, CartItemsContextType, CartItem } from "../../components/Context/Context";
import Cookies from "js-cookie";
export default function Product(): JSX.Element {
    const { productItemId } = useParams();
    const [productsData, setProductsData] = useState<any>({});
    const [imageData, setImageData] = useState<string[]>([]);
    const [mainImg, setMainImg] = useState<string>("");
    const [cartBtn, setCartBtn] = useState<boolean>(false);
    const { cartItems, setCartItems }: CartItemsContextType = useContext(CartItemsContext);

    const jwtToken = Cookies.get('jwtToken');

    const navigate = useNavigate();
    useEffect(() => {
        const callProduct = async () => {
            try {
                const options = {
                    method: "GET",
                };
                const response: any = await fetch(`https://localhost:7258/api/Product/${productItemId}`, options);
                const data = await response.json();
                console.log(data, "data");
                setProductsData(data.productItemDetails);
                const imgData = data.productItemDetails.productItemImage.split(",");
                setImageData(imgData);
            } catch (error) {
                console.log(error);
            }
        };
        callProduct();
    }, [productItemId]);

    const handleAddToCart = () => {
        setCartBtn(true);
        addItemsToCart();
    };
    const addItemsToCart = () => {
        console.log(cartItems, productsData);
        const existingItem = cartItems.findIndex((eachItem: CartItem) => eachItem.productItemId === productsData.productItemId);
        console.group(existingItem, "existing item");
        if (existingItem !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItem] = {
                ...updatedCartItems[existingItem],
                count: updatedCartItems[existingItem].count + 1,
            };
            setCartItems(updatedCartItems);
        } else {
            setCartItems([
                ...cartItems,
                {
                    count: 1,
                    productItemId: productsData.productItemId,
                    productId: productsData.productId,
                    productItemImage: productsData.productItemImage,
                    productItemName: productsData.productItemName,
                    qtyInStock: productsData.qtyInStock,
                    rating: productsData.rating,
                    price: productsData.price,
                },
            ]);
        }
    };
    const handleGoToCart = () => {
        if(jwtToken){
            navigate("/Cartt");
        }else{
            navigate(`/login?path="/productItem/${productItemId}`)
        }
        
    };
    const handleGoToBuyNow = (id: any) => {
        if(jwtToken){
            navigate(`/buyNow/${id}`);
        }
        else{
            navigate(`/login?path="/productItem/${productItemId}`)
        }
    };
    const RatingStars = Array.from({ length: 5 }, (_, index) => <StarIcon className={styles.starIcon} key={index} />);

    return (
        <section className={styles.productPage}>
            <Header />
            <HeaderNav />
            {Object.keys(productsData).length > 0 && (
                <div className={styles.productContainer}>
                    <div className={styles.products}>
                        <div>
                            <div className={styles.imageContainer}>
                                <div className={styles.imageSideBar}>
                                    {imageData.map((eachItem: string, index: number) => (
                                        <img onClick={e => setMainImg(e.currentTarget.src)} className={styles.eachImg} key={index} src={eachItem} alt="index" />
                                    ))}
                                </div>
                                <div className={styles.imageSection}>{mainImg.length > 0 ? <img className={styles.mainImg} src={mainImg} /> : <img className={styles.mainImg} src={imageData[0]} />}</div>
                            </div>
                            <div className={styles.buttonsContainer}>
                                {cartBtn ? (
                                    <button onClick={handleGoToCart} className={styles.cartBtn}>
                                        <ShoppingCartIcon />
                                        Go to Cart
                                    </button>
                                ) : (
                                    <button className={styles.cartBtn} onClick={handleAddToCart}>
                                        <ShoppingCartIcon />
                                        Add to Cart
                                    </button>
                                )}
                                <button onClick={() => handleGoToBuyNow(productItemId)} className={styles.buyBtn}>
                                    <FlashOnIcon />
                                    Buy Now
                                </button>
                            </div>
                        </div>
                        <div className={styles.ProductDetails}>
                            <h3>{productsData.productItemName}</h3>
                            <div className={styles.ratingContainer}>
                                {RatingStars}
                                <span>{productsData.numberOfRatings} Rating</span>
                                <span>{productsData.numberOfReviews} Reviews</span>
                            </div>
                            <div className={styles.staticDetails}>
                                <p className={styles.price}>&#8377; {productsData.price}</p>
                                <p>Delivery within 3 days of order</p>
                                <p>
                                    <DiscountIcon style={{ color: "#008c00", fontSize: "13px" }} /> Bank Offer ₹3000 Off On HDFC Bank Credit Non EMI, Credit and Debit Card EMI Transactions T&C
                                </p>
                                <p>
                                    <DiscountIcon style={{ fontSize: "13px", color: "#008c00" }} /> Bank Offer ₹3000 Off On HDFC Bank Credit Non EMI, Credit and Debit Card EMI Transactions T&C
                                </p>
                            </div>
                            <div className={styles.highlights}>
                                <span>Color</span>
                                <div>
                                    {color.map(eachEle => (
                                        <span key={eachEle} className={styles.itemBox}>
                                            {eachEle}
                                        </span>
                                    ))}
                                </div>
                                <span>RAM</span>
                                <div>
                                    {ram.map(eachEle => (
                                        <span key={eachEle} className={styles.itemBox}>
                                            {eachEle}
                                        </span>
                                    ))}
                                </div>
                                <span>Storage</span>
                                <div>
                                    {storage.map(eachEle => (
                                        <span key={eachEle} className={styles.itemBox}>
                                            {eachEle}
                                        </span>
                                    ))}
                                </div>
                                <p>Highlights</p>
                                <ul className={styles.highlightsList}>
                                    <li>
                                        {productsData.specifications["RAM"]} RAM | {productsData.specifications["Storage"]} ROM
                                    </li>
                                    <li>
                                        {productsData.specifications.Screen_Size} {productsData.specifications.Resolution} Amoled Display
                                    </li>
                                    <li>
                                        {productsData.specifications.Primary_Camera}(OIS)Primary Camera | {productsData.specifications.Secondary_Camera} Font Camera
                                    </li>
                                    <li>{productsData.specifications.Battery} Lithium Polymer Battery</li>
                                    <li>{productsData.specifications.Processor} </li>
                                </ul>
                            </div>
                            <div className={styles.description}>
                                {productsData.productItemDescription.split("_").map((eachEle: any, index: number) => {
                                    return index % 2 == 0 ? (
                                        <p key={index} className={styles.descriptionLabel}>
                                            {eachEle}
                                        </p>
                                    ) : (
                                        <p key={index} className={styles.descriptionItem}>
                                            {eachEle}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
