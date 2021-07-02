import Layout from "../../components/Layout";
import styles from "../../styles/RecipePage.module.scss";
import { useContext, useEffect, useState } from "react";
import { db, firebase } from "../api/firebase";
import "firebase/auth";
import { useRouter } from "next/router";
import { v1 as uuid } from "uuid";

export default function RecipePage({ UserContext }) {
  const currentUser = useContext(UserContext);
  const router = useRouter();
  const id = router.query["id"];
  const [recipe, setRecipe] = useState();

  console.log(id);

  useEffect(() => {
    async function getRecipe() {
      try {
        let query = await db
          .collection("users")
          .doc(currentUser.uid)
          .collection("recipes")
          .where("id", "==", id)
          .get();

        query.forEach((doc) => {
          setRecipe(doc.data());
        }); // setRecipe(recipe);
      } catch (err) {
        throw new Error(err);
      }
    }
    if (id && currentUser) {
      getRecipe();
    }
  }, [id]);

  return (
    <Layout activeIng={[]}>
      <div className={styles.section}>
        {recipe ? (
          <div className={styles.container}>
            <div className={styles.ingredients}>
              {recipe.ingredients.map((ing) => {
                return <Ingredient ingredient={ing} key={uuid()} />;
              })}
            </div>
            <div className={styles.title}>
              <h2> {recipe.name} </h2>
            </div>
            <div className={styles.description}>
              <p> {recipe.description} </p>
            </div>
            <div className={styles.steps}>
              {recipe.steps.map((step, n) => {
                return (
                  <div className={styles.step} key={uuid()}>
                    <h4>{n + 1}</h4>
                    <p>{step}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}
