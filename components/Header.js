import styles from '../styles/Header.module.css';
import ButtonPurp from './ButtonPurp';
import ButtonSub from './ButtonSub';
import Sidebar from './Sidebar';
import Image from 'next/image';
import { useState } from 'react';

export default function Header (props) {

    const [ sideActive, setSideActive ] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <h2>CookMaster</h2>
            </div>
            <div className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.misRecetas}>
                        <ButtonSub content='Mis Recetas' width='100px' height='50px' />
                    </li>
                    <li className={styles.crear}>
                        <ButtonPurp content='Crear Receta' width='110px' height='45px' />
                    </li>
                </ul>
                <div className={styles.sideButton} onClick={() => setSideActive(!sideActive) }>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1"
                        viewBox="0 0 245.5 139"
                    >
                        <path
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            strokeWidth="15"
                            d="M7.5 7.5L237.5 7.5"
                        ></path>
                        <path
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            strokeWidth="15"
                            d="M55 70L238 70"
                        ></path>
                        <path
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            strokeWidth="15"
                            d="M7.5 131.5L237.5 131.5"
                        ></path>
                    </svg>
                </div>
            </div>
            <div style={sideActive ? {transform:'translateX(calc(100vw - 100%)'} : {transform: 'translateX(calc(100vw + 100%))'}}className={styles.sidebar}>
                <Sidebar />
            </div>
        </div>
    )
}