import styles from '../styles/Dash.module.css';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import Recipe from '../components/Recipe'

export default function Dash (){

    const [ recipes, setRecipes ] = useState([]);

    useEffect(() => {
        async function fetchRecipes () {
            const response = await fetch('/api/recipes');
            const recipes = await response.json();

            setRecipes(recipes);
        } 

        fetchRecipes();
    }, [])

    const recipeList = recipes.map(recipe => {
        return (
            <Recipe recipe={recipe} />
        )
    })

    return(
        <div>
        <Header />
        <main className={styles.main}>
            <div className={styles.recipes}>
                {recipeList}
            </div>
        </main>
        </div>
    )
}