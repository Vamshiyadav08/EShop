import React, { useState } from "react";
import styles from "./home.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { bannerData, tech } from "./data";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import HeaderCatogory from "../../components/HeaderCatogory/HeaderCatogory";
import { sp  } from "@pnp/sp/presets/all";

export default function Banner(): JSX.Element {
    const [productsData, setProductsData] = React.useState([]);
    const [formData, setFormData] = useState({
        itemName: "",
        itemDetails: "Enter more Information",
        quantity: "",
    });
    React.useEffect(() => {
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
        
        callPrdoucts();
    }, []);

    const callPrdoucts = async () => {
        const response = await fetch("https://localhost:7258/api/Filter/353B54C1-3EE2-4AEE-8923-686927E4DB9E");
        const data = await response.json();

        const updatedArr = data["filteredProductItems"].slice(0, 8);
        console.log(updatedArr);
        setProductsData(updatedArr);
    };

    const NextArrow = (props: any) => {
        const { onClick } = props;
        return <NavigateNextIcon style={{ color: "red", fontSize: "18px", position: "absolute", right: "-17px", top: "50%" }} onClick={onClick} />;
    };

    const PrevArrow = (props: any) => {
        const { onClick } = props;
        return <ArrowBackIosNewIcon style={{ color: "red", fontSize: "14px", position: "absolute", left: "-15px", bottom: "50%" }} onClick={onClick} />;
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    const presentDate: Date = new Date();
    const offerDate: Date = new Date();
    offerDate.setDate(presentDate.getDate() + 2);
    const handleSupplier = (e:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData=>({
            ...prevData,
            [name]:value
        }))
    };

    const handleSubmit=async(e:any)=>{
        e.preventDefault();

        try{
            await sp.web.lists.getByTitle("ecommerceSupplier").items.add({
                Title: formData.itemName,
                itemDetails: formData.itemDetails,
                quantity: formData.quantity, 

            });
           setFormData(
            {
                itemName: "",
                itemDetails: "",
                quantity: "",
            }
           )
        }catch(error){
            console.log(error)
        }
       
    }
    return (
        <section className={styles.banner}>
            <HeaderCatogory />
            <div className={styles.slider}>
                <Slider {...settings}>
                    {bannerData.map((eachImg, index) => (
                        <div key={index}>
                            <img className={styles.bannerImg} src={eachImg.imgSrc} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className={styles.sectionSale}>
                <div className={styles.countDown}>
                    <strong className={styles.dealsStrongText}>Deals and Offers</strong>
                    <span className={styles.dealsLightText}>Hygiene Equipments</span>
                    <div className={styles.groupTime}>
                        <div className={styles.group}>
                            <span>04</span>
                            <span>Days</span>
                        </div>
                        <div className={styles.group}>
                            <span>18</span>
                            <span>Hours</span>
                        </div>
                        <div className={styles.group}>
                            <span>60</span>
                            <span>Mins</span>
                        </div>
                        <div className={styles.group}>
                            <span>40</span>
                            <span>Secs</span>
                        </div>
                    </div>
                </div>
                <div className={styles.catagoryItemSection}>
                    {tech.map((eachItem, index: number) => (
                        <div key={index} className={styles.catagoryItems}>
                            <img className={styles.catagoryItemImg} src={eachItem.imgSrc} alt={eachItem.name} />
                            <div className={styles.Items}>
                                <span>{eachItem.name}</span>
                                <span className={styles.discountBadge}>{eachItem.discount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.electronicGroupItems}>
                <div className={styles.electronicBgCard}>
                    <p>Consumers and electronics and gadgets</p>
                    <button className={styles.button}>Source now</button>
                </div>
                <div className={styles.groupItems}>
                    {productsData.map((eachEle: any, index: number) => (
                        <Link className={styles.groupEachItem} to={`product/${eachEle.productItemId}`} key={index}>
                            <div>
                                <p style={{ fontWeight: "700", fontSize: "1rem" }}>{eachEle.productItemName.match(/(.+?)\s*\(/)[1]}</p>
                                <div className={styles.group}>
                                    <span>From Rupee {eachEle.price}</span>
                                    <img className={styles.groupItemImg} src={eachEle.productItemImage.split(",")[0]} alt={eachEle.productItemName} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.enquiry}>
                <div className={styles.enquiryInfo}>
                    <p>An easy way to send request to all suppliers</p>
                    <span>Easy way to make request to the supplier for the products</span>
                </div>
                <form className={styles.enquiryForm}>
                    <strong>Sent quote to suppliers</strong>
                    <input value={formData.itemName} name="itemName" onChange={handleSupplier} type="text" placeholder="What item you need?" />
                    <textarea value={formData.itemDetails} name="itemDetails" onChange={handleSupplier}>Enter the Item Details </textarea>
                    <input value={formData.quantity} onChange={handleSupplier} name="quantity" type="text" placeholder="quantity" />
                    <button onClick={handleSubmit}>Send Enquiry</button>
                </form>
            </div>
        </section>
    );
}
