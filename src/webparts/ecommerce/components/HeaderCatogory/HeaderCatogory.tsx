import * as React from 'react'
import styles from './header.module.scss';
import {categories} from './data'
import { Link } from "react-router-dom";
export default function HeaderCatogory():JSX.Element {
  return (
    <nav className={styles.navCatagories}>
      {categories.map((category, index) => (
         <Link style={{textDecoration:"none"}}  key={index} to="/Mobiles" >
        <div className={styles.catagoryItems} key={index}>
                <img className={styles.catagoryImg} src={category.imageSrc} alt={category.altText} />
                <span className={styles.catagoryText}>{category.categoryName}</span>
              </div>
         </Link>
        
      ))}
        
      </nav>
  )
}
