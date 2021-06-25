import styles from '../styles/Recipe.module.scss'
import Ingredient from './Ingredient'
import IngredientDispatch from './context/IngredientDispatch';
import { useContext } from 'react';

export default function Recipe ({recipe}){
    const dispatch = useContext(IngredientDispatch);
    const {name, ingredients, description, steps} = recipe;


    function handleIngClick(ing){
        dispatch({type: 'add', payload: ing});
    }

    return (
        <div className={styles.recipe}>
            <div className={styles.title}>
                <h1>{name}</h1>
            </div>
            <div className={styles.ingredients}>
                {
                    ingredients.map( (ing, i) => {
                        return (
                            <Ingredient onIngClick={handleIngClick} name={ing} key={i}/>
                        )
                    })
                }
            </div>
            <div className={styles.description}>
                <p>{description}</p>
            </div>
            <div className={styles.additional}>
                {steps ? <div className={styles.steps}>{steps.length} {steps.length > 1 ? 'pasos' : 'paso'} </div> : ''}
            </div>
        </div>
    )
}