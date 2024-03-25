import React from 'react'
import Header from '../../components/Header/Header'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import styles from './notFound.module.scss'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <section className={styles.notFound}>
        <Header/>
        <HeaderNav/>
      <div className={styles.imgWrapper}>
        <img src={require('../../assets/error.gif')} alt="" />
        <p>Exciting upgrades in progress! ...Stay tuned for a thrilling new experience</p>
        <p>Until then explore the features</p>
        <button  className={styles.imgNotFound} onClick={()=>navigate('/')}>Explore Home</button>
      </div>
    </section>
  )
}
