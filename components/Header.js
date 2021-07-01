import styles from '../styles/Header.module.scss';
import ButtonPurp from './ButtonPurp';
import ButtonSub from './ButtonSub';
import Sidebar from './Sidebar';
import Link from 'next/link';
import Router from 'next/router';
import { useState, useEffect, useContext } from 'react';
import UserContext from './context/UserContext';
import dynamic from 'next/Dynamic';
import ThemeSwitch from './ThemeSwitch';
import { firebase } from '../pages/api/firebase';
import 'firebase/auth';

// const ThemeSwitch = dynamic( () => import("../components/ThemeSwitch"),{
//     ssr: false,
// });

export default function Header ({activeIng}) {

    const [ sideActive, setSideActive ] = useState(false);
    const currentUser = useContext(UserContext);

    const logOut = () => {
        try{
            firebase.auth().signOut();
            Router.push('/');
        }
        catch (err) {
            throw new Error(err);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <h2>CookMaster</h2>
            </div>
            <div className={styles.userSpace}>
                <div className={styles.user}>
                    {currentUser ? currentUser.email : ''}
                </div>
                <div>
                    <ButtonPurp color='#21ffd9' onClick={logOut} content='Salir' width='70px' height='45px' />
                </div>
            </div>
            <div className={styles.nav}>
                <ul className={styles.navList}>
                    <Link href="/dash">
                    <li className={styles.misRecetas}>
                        <ButtonSub content='Mis Recetas' />
                    </li>
                    </Link>
                    <Link href="/create">
                        <li className={styles.crear}>
                            <ButtonPurp content='Crear Receta' width='110px' height='45px' />
                        </li>
                    </Link>
                    <div className={styles.themeSwitch}>
                        <ThemeSwitch />
                    </div>
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
            <Sidebar active={sideActive} activeIng={activeIng} />
        </div>
    )
}