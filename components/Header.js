import styles from '../styles/Header.module.scss';
import ButtonPurp from './ButtonPurp';
import ButtonSub from './ButtonSub';
import Sidebar from './Sidebar';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header ({activeIng}) {

    const [ sideActive, setSideActive ] = useState(false);
    const [ theme, setTheme ] = useState();
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    useEffect( () => {
        document.body.dataset.theme = theme;
    }, [ theme ]);

    useEffect( () => {
        let newTheme = window.localStorage.getItem('theme');
        setTheme( newTheme)
    }, []);

    const changeTheme = (e) => {
        setTheme(nextTheme);
        window.localStorage.setItem('theme', nextTheme);
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <h2>CookMaster</h2>
            </div>
            <div className={styles.nav}>
                <ul className={styles.navList}>
                    <Link href="/dash">
                    <li className={styles.misRecetas}>
                        <ButtonSub content='Mis Recetas' width='100px' height='50px' />
                    </li>
                    </Link>
                    <Link href="/create">
                        <li className={styles.crear}>
                            <ButtonPurp content='Crear Receta' width='110px' height='45px' />
                        </li>
                    </Link>
                    <div className={ theme === 'light' ? styles.themeButton : styles.themeButtonDark } onClick={changeTheme}>
                        <span>🌚</span>
                        <span>🌞</span>
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