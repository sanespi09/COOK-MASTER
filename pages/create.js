import Layout from '../components/Layout'
import IngredientBox from '../components/IngredientBox';
import ButtonSub from '../components/ButtonSub';
import { useReducer, useState } from 'react';
import IngredientDispatch from '../components/context/IngredientDispatch';
import IngredientReducer from '../reducer/IngredientReducer';
import styles from '../styles/Create.module.scss';


export default function Create ( props ){

    const [ state, dispatch ] = useReducer(IngredientReducer, { ingredients: []});
    const [ pasos, setPasos ] = useState(['']);

    const removeIngredient = (name) => {
        dispatch({ type: 'remove' , payload: name });
    }

    const pasosList = pasos.map( (paso, i) => {
        return(
            <div className={styles.paso} key={i}>
                <label>{i+1}</label>
                <textarea rows={5} value={paso} className={styles.input}></textarea>
            </div>
        )
    })

    const addPaso = (e) => {
        e.preventDefault();
        if(pasos.length < 5){
        let newPasos = pasos.slice();
        newPasos.push('');
        
        setPasos(newPasos);
        }

        else return;
    }

    return(
        <IngredientDispatch.Provider value={dispatch}>
            <Layout activeIng={state.ingredients}>
                <section className={styles.container}>
                    <form className={styles.form} name="create-form">
                        <div className={styles.formTitle}>
                            <h2>Crea tu propia receta:</h2>
                        </div>
                        <div className={styles.formSection}>
                            <label>Nombre:</label>
                            <input className={styles.input}></input>
                        </div>
                        <div className={styles.formSection}>
                            <label>Descripción:</label>
                            <textarea rows={10} className={styles.input}></textarea>
                        </div>
                        <div className={styles.formSection}>
                            <IngredientBox ingredients={state.ingredients} onRemove={removeIngredient} />
                        </div>
                        <div className={styles.formSection}>
                            <h3 className={styles.pasosTitle}>Pasos:</h3>
                            {pasosList}
                            <div className={styles.pasosButton}>
                                <ButtonSub onClick={addPaso} content='Añadir Paso' font='1.5em'/>
                            </div>
                        </div>  
                    </form>
                </section>
            </Layout>
        </IngredientDispatch.Provider>
    )
}