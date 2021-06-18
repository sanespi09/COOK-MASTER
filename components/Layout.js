import Header from './Header';
import React from 'react';
import styles from '../styles/Layout.module.scss'

export default function Layout ({ children, activeIng }){
    return (
            <React.Fragment>
                <Header activeIng={activeIng}/>
                <main className={styles.main}>
                    { children }
                </main>
            </React.Fragment>
    )
}