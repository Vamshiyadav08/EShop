import React, { useContext, useState, useEffect } from "react";
import styles from "./header.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate, Link } from "react-router-dom";
import { CartItemsContext, CartItemsContextType } from "../../components/Context/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
// import { Link ,useNavigate} from "react-router-dom";

const Header: React.FC = () => {
    // const navigate = useNavigate();
    const { cartItems }: CartItemsContextType = useContext(CartItemsContext);
    const [count, setCount] = useState(0);
    console.log(cartItems);

    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {      
        if (cartItems.length > 0) {
            let totalCount = 0;
            for (const item of cartItems) {
                totalCount += Number(item.count);
            }
            setCount(totalCount);
        } else {
            setCount(0);
        }
    }, [cartItems]);
    
    const handlenavigate = () => {
        navigate("/orders");
    };
    const handleLogOut = () => {
        localStorage.clear();
        Cookies.remove("jwtToken");
        navigate("/");
    };
    const navigate = useNavigate();

    const navigateSearch = (e: any) => {
        const { type, key } = e;
        if (inputValue !== "" && (type === "click" || (type === "keydown" && key === "Enter"))) {
            navigate(`/search?value=${inputValue}`);
        }
    };

    const handleSearch = (e: any) => {
        const { value } = e.target;
        setInputValue(value);
        if (value === "") {
            setSuggestions([]);
        } else {
            const getSuggestion = setTimeout(async () => {
                const options = {
                    method: "GET",
                };
                try {
                    const response = await fetch(`https://localhost:7258/api/Search?search=${value}`, options);
                    if (response.ok) {
                        const responseJson = await response.json();
                        const { searchResults } = responseJson;
                        searchResults ? setSuggestions(searchResults) : setSuggestions([]);
                    } else {
                        setSuggestions([]);
                    }
                } catch (error) {
                    console.log("Error fetching data:", error);
                }
            }, 500);
            return () => clearTimeout(getSuggestion);
        }
    };

    return (
        <header className={styles.header}>
            <nav className={styles.navHeader}>
                <div className={styles.navLogo} onClick={() => navigate("/")}>
                    <img style={{ width: "150px" }} src={require("../../assets/flipkartlogo.png")} alt="AtlasLogo" />
                </div>
                <div className={styles.search} style={{position:"relative",width:"40%"}}>
                    <div className={styles.searchbar}>
                        <input value={inputValue} name="search" onKeyDown={navigateSearch} onChange={handleSearch} className={styles.input} type="text" />
                        <SearchIcon />
                    </div>
                    {suggestions.length > 0 && (
                        <div className={styles.searchResults}   style={{width:"100%" ,position:"absolute",top:"",backgroundColor:"#fff",color:"#333"}}>
                            {suggestions.map((suggestion: any) => (
                                <Link style={{color:"#333",textDecoration:"none"}} to={`/product/${suggestion.productItemId}`} className="search-link" key={suggestion.productItemId}>
                                    <p style={{paddingLeft:"2rem"}}>{suggestion.productItemName}</p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.navActions}>
                    <div className={styles.navActionItems}>
                        <span id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                            My Profile
                        </span>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleClose(), handlenavigate();
                                }}
                            >
                                Orders
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose(), navigate('/login?path="/');
                                }}
                            >
                                Login
                            </MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose(), handleLogOut();
                                }}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                    <div className={styles.navActionItems}>
                        <span>WhishList</span>
                    </div>
                    <div onClick={() => navigate("/Cartt")} className={styles.navActionItems}>
                        <span className={styles.count}>{count}</span>
                        <ShoppingCartIcon />
                        <span>Cart</span>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
