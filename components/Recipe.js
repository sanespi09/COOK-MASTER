import styles from '../styles/Recipe.module.css'
import Ingredient from '../components/Ingredient'

export default function Recipe ({recipe}){

    const {name, ingredients, description} = recipe;

    return (
        <div className={styles.recipe}>
            <div className={styles.title}>
                <h1>{name}</h1>
            </div>
            <div className={styles.ingredients}>
                {
                    ingredients.map( ing => {
                        return (
                            <Ingredient name={ing} />
                        )
                    })
                }
            </div>
            <div className={styles.description}>
                <p>{description}</p>
            </div>
        </div>
    )
}