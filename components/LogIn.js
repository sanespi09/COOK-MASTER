import styles from '../styles/LogIn.module.scss';
import formStyles from '../styles/Create.module.scss';
import { useState, useContext } from 'react';
import Router from 'next/router';
import useUserFormSubmit from '../hooks/useUserFormSubmit';
import UserContext from './context/UserContext';
import ButtonPurp from './ButtonPurp';
import { firebase } from '../pages/api/firebase';
require ('firebase/auth');

export default function LogIn (){

    const userConfig = useContext(UserContext);

    const onFormSubmit = async (data) => {
        console.log(data);
        if(data.email && data.password){
            try{
                var userCredential = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
                let user = userCredential.user;
                Router.push('/dash');
            } catch (error){
                let errorCode = error.code;
                let errorMessage = error.message;
                setError(errorMessage);
            }
        }
    }


    const [ values, errors, handleChange, handleBlur, handleSubmit] = useUserFormSubmit(onFormSubmit);
    const [ error, setError ] = useState('');

    return (
        <form name="userForm" className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formTitle}><h4>Ingresa:</h4></div>
          <div className={formStyles.formSection}>
            <label>Ingresa tu email:</label>
            <input onChange={handleChange} onBlur={handleBlur} value={values.email} type='email' name='email'></input>
            <div className={formStyles.error}>{errors.email}</div>
          </div>
          <div className={formStyles.formSection}>
            <label>Ingresa tu contraseña:</label>
            <input onChange={handleChange} onBlur={handleBlur} value={values.password} type='password' name='password'></input>
            <div className={formStyles.error}>{errors.password}</div>
          </div>
          <div style={{ marginTop: '5rem' }} className={formStyles.formSection}>
            <ButtonPurp content='Ingresar' width='150px' height='50px' font='1em' />
          </div>
          <div className={formStyles.formSection}>{error}</div>
        </form>
    )
}