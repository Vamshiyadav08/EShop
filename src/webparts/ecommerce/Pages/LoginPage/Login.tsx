import React,{useState} from "react";
import styles from "./login.module.scss";
import Header from "../../components/Header/Header";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import { has } from "@microsoft/sp-lodash-subset";

const Login: React.FC = () => {
 
  const [loginData,setLoginData] = useState({
    email:"",
    password:""
  })
  const { pathname, search, hash, state} =useLocation();
  console.log(pathname,"pathname",search,"search",hash,"serach",state,"state")
  // const [loginError,setLoiginError] = useState()
  const navigate = useNavigate();
 const handleChange=(e:any)=>{
  const {name,value} = e.target
 setLoginData({
  ...loginData,
  [name]:value
 })
 }
 const handleSubmit=async()=>{
  const options = {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  };
    const response = await fetch('https://localhost:7258/api/Auth/login', options);
    const responseJson = await response.json();
    console.log(responseJson,"responsejson")
    if (response.ok) {
      const { jwtToken, customerId, customerEmail } = responseJson;
      localStorage.setItem('customerId', customerId);
      localStorage.setItem('customerEmail', customerEmail);
      Cookies.set('jwtToken', jwtToken, { expires: 90 });
      navigate('/')
    } else {
      // setError(true);
      // actions.setSubmitting(false);
    }
 }

  return (
    <section className={styles.login}>
      <Header/> 
      <>
        <div className={styles.loginContainer}>
          <div className={styles.leftWrapper}>
            <p style={{fontWeight:"700",fontSize:"1rem"}}>Login</p>
            <p>Get access to your Orders, whishlist and Recommendations</p>
            <img className={styles.flipkartImg} src={require('../../assets/img66.png')} alt="img" />
          </div>
          <div className={styles.rightWrapper}>
            <input onChange={handleChange} name="email" type="email" placeholder="Enter Email" />
            <input onChange={handleChange} name="password" type="password" placeholder="Enter Password" />
            <div className={styles.btnContainer}>
              <button onClick={handleSubmit}>Login</button>
              <button >New to Flipkart?Sign up</button>
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default Login;
