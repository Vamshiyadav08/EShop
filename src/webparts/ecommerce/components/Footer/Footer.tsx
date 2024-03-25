import * as React from 'react';
import styles from './footer.module.scss'; 
import { AboutData ,Information} from './data';

export default function Footer():JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>
        <p>Best information about the company gives here</p>
        <img src={require('../../assets/footerIcons.png')} alt="footericon" />
      </div>
      <div className={styles.footerItem}>
        <p>About</p>
        <ul>
            {
                AboutData.map((eachEle:any,index:number)=>(
                    <li key={index}>{eachEle}</li>
                ))
            }
        </ul>
      </div>
      <div className={styles.footerItem}>
        <p>Information</p>
      <ul>
            {
                Information.map((eachEle:any,index:number)=>(
                    <li key={index}>{eachEle}</li>
                ))
            }
        </ul>
      </div>
      <div className={styles.footerItem}>
        <p>Get App</p>
        <img src={require('../../assets/footerapp1.png')} alt="footericon" />
      </div>
    </footer>
  )
}
