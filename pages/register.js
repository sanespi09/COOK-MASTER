import { useState, useEffect, useContext } from "react";
import Router from 'next/router';
import {db, firebase} from './api/firebase';
import formStyles from '../styles/Create.module.scss';
import styles from '../styles/Register.module.scss';
import useUserFormSubmit from '../hooks/useUserFormSubmit';
import UserContext from "../components/context/UserContext";
import ButtonPurp from "../components/ButtonPurp";

export default function Register () {

    const userConfig = useContext(UserContext);
    const [ error, setError ] = useState('');

    const onFormSubmit = async (data) => {
        if (data.email && data.password) {
            try {
                var userCredential = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
                let user = userCredential.user;
                await db.collection('users').doc(user.uid).set({user: user.email});
                Router.push('/dash');
            } catch (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                setError(errorMessage);
            }
      }
    }

    const [ values, errors, handleChange, handleBlur, handleSubmit ] = useUserFormSubmit(onFormSubmit);
    const [ response, setResponse ] = useState();
    return (
        <main className={styles.main}>
            <form name="userForm" className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formTitle}><h2>Registrate:</h2></div>
                <div className={formStyles.formSection}>
                    <label>Ingresa un email:</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.email} type='email' name='email'></input>
                    <div className={formStyles.error}>{errors.email}</div>
                </div>
                <div className={formStyles.formSection}>
                    <label>Ingresa una contraseña:</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.password} type='password' name='password'></input>
                    <div className={formStyles.error}>{errors.password}</div>
                </div>
                <div style={{ marginTop: '5rem' }} className={formStyles.formSection}>
                    <ButtonPurp content='Registrate' width='150px' height='50px' font='1em' />
                </div>
                <div className={formStyles.formSection}>{error}</div>
            </form>
        </main>
    )
}