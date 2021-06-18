import { useEffect, useState } from "react";
import styles from '../styles/Header.module.scss';

export default function ThemeSwitch() {

    const [ theme, setTheme ] = useState('light');
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
        <div className={theme === 'light' ? styles.themeButton : styles.themeButtonDark} onClick={changeTheme}>
            <span>🌚</span>
            <span>🌞</span>
        </div>
    )

}
