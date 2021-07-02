import styles from "../styles/Dash.module.scss";
import { useState, useEffect, useReducer, useContext } from "react";
import useRecipes from "../hooks/useRecipes";
import Link from "next/link";
import Layout from "../components/Layout";
import Recipe from "../components/Recipe";
import IngredientBox from "../components/IngredientBox";
import IngredientDispatch from "../components/context/IngredientDispatch";
import IngredientReducer from "../reducer/IngredientReducer";
import { db } from "./api/firebase";

// export async function getServerSideProps(context){
//         let recetas = [];

//         const response = await db.collection('recipes').get();
//         // const recetas = await response.data();
//         response.forEach( doc => {
//             recetas.push(doc.data())
//         })

//         recetas = recetas.reverse();

//         return {props: { recetas }}
// }

export default function Dash({ UserContext }) {
  const [recipes, setRecipes] = useState(null);
  const currentUser = useContext(UserContext);
  const [state, dispatch] = useReducer(IngredientReducer, { ingredients: [] });
  const [getRecipes] = useRecipes();

  // console.log(currentUser);

  const removeIngredient = (name) => {
    dispatch({ type: "remove", payload: name });
  };

  useEffect(() => {
    async function fetchRecipes() {
      let userRecipes = await getRecipes(currentUser);
      console.log(userRecipes);
      setRecipes(userRecipes);
    }

    if (currentUser) {
      fetchRecipes();
      console.log(currentUser);
    }
  }, [currentUser]);

  // console.log(recipes);

  const recipeRender = () => {
    let selectedRecipes;

    if (state.ingredients.length > 0) {
      selectedRecipes = recipes.filter((r) => {
        let result = state.ingredients.reduce((acc, ing) => {
          if (acc === false) return acc;
          if (r.ingredients.indexOf(ing) > -1) {
            return true;
          }
        }, true);
        return result;
      });
    } else {
      selectedRecipes = recipes;
    }

    return selectedRecipes.length > 0 ? (
      selectedRecipes.map((recipe) => {
        return (
          <Link href={`/recipe/${recipe.id}`}>
            <div key={recipe.id}>
              <Recipe recipe={recipe} />
            </div>
          </Link>
        );
      })
    ) : (
      <div className={styles.emptyMssg}>
        No se ha encontrado ninguna receta...
      </div>
    );
  };

  return (
    <IngredientDispatch.Provider value={dispatch}>
      <Layout activeIng={state.ingredients}>
        <section className={styles.section}>
          <div className={styles.ingredients}>
            <IngredientBox
              onRemove={removeIngredient}
              ingredients={state.ingredients}
            />
          </div>
          <div className={styles.recipes}>
            {recipes ? recipeRender() : <div className={styles.spinner}></div>}
          </div>
        </section>
      </Layout>
    </IngredientDispatch.Provider>
  );
}
