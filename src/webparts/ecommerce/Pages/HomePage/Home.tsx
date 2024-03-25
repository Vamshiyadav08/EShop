import * as React from 'react'
import Header from '../../components/Header/Header';
import styles from './home.module.scss'
import Banner from './Banner';
import Footer from '../../components/Footer/Footer';
const Home:React.FC<{}>=()=>{
 return(
    <section className={styles.home}>
        <Header/>
        <Banner/>
        <Footer/>
    </section>
 )
}
export default Home;
