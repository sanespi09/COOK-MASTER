import Ingredient from '../components/Ingredient';
import styles from '../styles/IngredientBox.module.scss'

export default function IngredientBox ( { onRemove, ingredients } ){

    const ingredientList = ingredients.map( (ing, i) => {
        return(
            <Ingredient onIngClick={onRemove} name={ing} key={i} />
        )
    })

    return (
        <div className={styles.ingredients}>
            <div>
                <h2>Ingredientes Seleccionados:</h2>
            </div>
            <div className={styles.selectedIngredients}>
                {ingredientList}
            </div>
        </div>
    )

}