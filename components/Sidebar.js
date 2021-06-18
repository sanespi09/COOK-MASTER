import styles from '../styles/Sidebar.module.css';
import Ingredient from './Ingredient';
import { useContext, useState, useEffect } from 'react';
import IngredientDispatch from './context/IngredientDispatch';


const ingredients = ['Zanahoria', 'Tomate', 'Pollo', 'Cerdo', 'Bife', 'Ajo', 'Cebolla', 'Berenjena', 'Brócoli', 'Cilantro', 'Perejil', 'Zapallo', 'Morrón', 'Calabaza', 'Atún']

export default function Sidebar ({ active, activeIng }) {

    const [ allIngredients, setIngredients ] = useState(ingredients);
    const dispatch = useContext(IngredientDispatch);

    // console.log(activeIng);

    useEffect( () => {
        let ingList = ingredients.slice();

        if(activeIng.length >= 0){
        activeIng.forEach( ing => {
            let index = ingList.indexOf(ing);
            ingList.splice(index, 1);  
        })

        setIngredients(ingList);
        }
    }, [ activeIng ])


    function addIngredient (ingName) {
        dispatch({type:'add', payload: ingName})

    }

    const ingredientMap = allIngredients.map( (ing,i) => {
        return (
            <Ingredient onIngClick={addIngredient} name={ing} key={i}/>
        )
    })

    return (
        <div className={styles.sidebar} style={{transform: active ? 'translateX(0)' : 'translateX(100%)'}}>
            <div className={styles.ingredients}>
                <h3>Selecciona tus ingredientes:</h3>
                <div className={styles.ingredientList}>
                    {ingredientMap}
                </div>
            </div>
        </div>
    )
}
