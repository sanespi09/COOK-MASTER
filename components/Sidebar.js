import styles from '../styles/Sidebar.module.css';
import Ingredient from './Ingredient';

const ingredientes = ['Zanahoria', 'Tomate', 'Pollo', 'Cerdo', 'Bife', 'Ajo', 'Cebolla', 'Berenjena', 'Brócoli', 'Cilantro', 'Perejil', 'Zapallo', 'Morrón', 'Calabaza', 'Atún']

export default function Sidebar (props) {



    const ingredientMap = ingredientes.map( ing => {
        return (
            <Ingredient name={ing} />
        )
    })

    return (
        <div className={styles.container}>
            <div className={styles.ingredients}>
                <h3>Selecciona tus ingredientes:</h3>
                <div className={styles.ingredientList}>
                    {ingredientMap}
                </div>
            </div>
            {/* <div className={styles.container}>
                <h4>Tiempo de receta</h4>
                <div className={styles.tiempos}>

                </div>
            </div> */}
        </div>
    )
}