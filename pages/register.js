import { useState, useEffect } from "react";
import Router from 'next/router';
import formStyles from '../styles/Create.module.scss';
import styles from '../styles/Register.module.scss';
import useUserFormSubmit from '../hooks/useUserFormSubmit';
import ButtonPurp from "../components/ButtonPurp";

export default function Register () {

    const onFormSubmit = async (val) => {
        try{
            let response = await fetch('api/user',{
                method: 'POST',
                body: JSON.stringify(val)
            })

            if(response.ok){
                let user = await response.json();    
                console.log(user);
            }else{
                let responseText = await response.text();
                console.log(responseText);
            }
                // Router.push('/dash');
        } catch (err){
            throw err;
        }
        
      }

    const [values, errors, handleChange, handleBlur, handleSubmit] = useUserFormSubmit(onFormSubmit);
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
                        <input onChange={handleChange} onBlur={handleBlur} value={values.password}type='password' name='password'></input>
                        <div className={formStyles.error}>{errors.password}</div>
                    </div> 
                    <div style={{ marginTop: '5rem'}} className={formStyles.formSection}>
                        <ButtonPurp content='Registrate' width='150px' height='50px' font='1em' />
                    </div>
                </form>
        </main>
    )
}