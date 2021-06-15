import styles from '../styles/Ingredient.module.css'

export default function Ingredient ({ name }){
    return(
        <div className={styles.container}>
            <h4>{name}</h4>
        </div>
    )
}