import styles from '../styles/Dash.module.css';
import { useState, useEffect, useReducer } from 'react';
import Layout from '../components/Layout'
import Recipe from '../components/Recipe';
import IngredientBox from '../components/IngredientBox';
import IngredientDispatch from '../components/context/IngredientDispatch';
import IngredientReducer from '../reducer/IngredientReducer';
import { db } from './api/firebase';


export async function getServerSideProps(context){
        let recetas = [];

        const response = await db.collection('recipes').get();
        // const recetas = await response.data(); 
        response.forEach( doc => {
            recetas.push(doc.data())
        })

        return {props: { recetas }}
}


export default function Dash ({ recetas }){

    const [ recipes, setRecipes ] = useState(recetas);
    const [ state, dispatch ] = useReducer(IngredientReducer, { ingredients: []});

    const removeIngredient = (name) => {
        dispatch({ type: 'remove' , payload: name });
    }

    console.log(recipes);

    const recipeList = () => {
        let selectedRecipes;

        if(state.ingredients.length > 0){
          selectedRecipes = recipes.filter( r => {
            let result = state.ingredients.reduce( (acc,ing) => {
              if (acc === false)
                    return acc; 
              if(r.ingredients.indexOf(ing) > -1){
                  return true;
              };
            }, true)
            return result;
          })
        } else {
            selectedRecipes = recipes; 
        }

        return selectedRecipes
        .map(recipe => {
            return (
                    <Recipe recipe={recipe} key={recipe.id} />
            )
        })
    }

    return(
        <IngredientDispatch.Provider value={dispatch}>
            <Layout activeIng={state.ingredients}>
                <section className={styles.main}>
                    <div className={styles.ingredients}>
                        <IngredientBox onRemove={removeIngredient} ingredients={state.ingredients} />
                    </div>
                    <div className={styles.recipesContainer}>
                        <div className={styles.recipes}>
                            {recipeList()}
                        </div>
                    </div>
                </section>
            </Layout>
        </IngredientDispatch.Provider>
    )
}