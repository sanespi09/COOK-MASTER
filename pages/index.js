import Head from 'next/head'
import Image from 'next/image'
import ButtonPurp from '../components/ButtonPurp';
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cook Master</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.logo}>CookMaster</h1>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className={styles.welcome}>
            <h2>Hace click aquí para ingresar a tu espacio culinario personal</h2>
          </div>
          <Link href="/dash">
            <div className={styles.button}>
                <ButtonPurp content='Ingresar' height='50px' width='150px'/>
            </div>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
