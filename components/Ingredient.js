import styles from '../styles/Ingredient.module.css'

export default function Ingredient (props){

    const handleClick = (e) => {
        props.onIngClick(props.name);
    }
    
    return(
        <div onClick={handleClick} className={styles.container}>
            <h4>{props.name}</h4>
        </div>
    )
}