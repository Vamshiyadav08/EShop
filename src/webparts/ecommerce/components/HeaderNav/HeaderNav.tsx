import * as React from 'react'
import styles from './headerNav.module.scss';
import { Link } from 'react-router-dom';

export default function HeaderNav():JSX.Element {
  return (
    <nav className={styles.headerNav}>
        <ul>
           <li >
            <Link  className={styles.headerNavItems} to="/Elctronic">Electronics</Link>
           </li>
           <li >
            <Link   className={styles.headerNavItems} to="Mobiles">Mobiles</Link>
           </li>
           <li >
            <Link  className={styles.headerNavItems} to="/Fashion">Fashion</Link>
           </li>
           <li >
            <Link  className={styles.headerNavItems} to="/Tashion">Travel</Link>
           </li>
        </ul>
    </nav>
  )
}
