import Layout from "../components/Layout";
import IngredientBox from "../components/IngredientBox";
import Router from "next/router";
import ButtonSub from "../components/ButtonSub";
import ButtonPurp from "../components/ButtonPurp";
import { useReducer, useState, useEffect, useContext } from "react";
import IngredientDispatch from "../components/context/IngredientDispatch";
import IngredientReducer from "../reducer/IngredientReducer";
import styles from "../styles/Create.module.scss";
import useFormSubmit from "../hooks/useFormSubmit";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v1 as uuidv1 } from "uuid";
import { db } from "./api/firebase";

export default function Create({ UserContext }) {
  const onFormSubmit = async (values) => {
    console.log(values);
    let recipe = {
      ...values,
      id: uuidv1(),
    };

    try {
      let response = await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("recipes")
        .add(recipe);
      console.log(response);
      setRecetaAgregada("Su receta se creo con exito!");
      setTimeout(() => Router.push("/dash"), 2000);
    } catch (err) {
      throw new Error(err);
    }
  };

  const currentUser = useContext(UserContext);
  const [recetaAgregada, setRecetaAgregada] = useState();
  const [state, dispatch] = useReducer(IngredientReducer, { ingredients: [] });
  const [pasos, setPasos] = useState([{ id: uuidv1(), value: "" }]);
  const [
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    handleIngChange,
  ] = useFormSubmit(onFormSubmit);

  const removeIngredient = (name) => {
    dispatch({ type: "remove", payload: name });
  };

  useEffect(() => {
    handleIngChange(state.ingredients);
  }, [state]);

  const addPaso = (e) => {
    e.preventDefault();
    if (pasos.length < 5) {
      setPasos((prev) => [...prev, { id: uuidv1(), value: "" }]);

      values.steps = [...values.steps, ""];
      console.log(pasos);
    }
  };

  const removePaso = (e, id) => {
    if (pasos.length > 1) {
      setPasos((prev) => prev.filter((p) => p.id !== id));

      let newSteps = values.steps.slice();
      newSteps.splice(id, 1);
      values.steps = newSteps;

      let newStepsErrors = errors.steps.slice();
      newStepsErrors.splice(id, 1);
      errors.steps = newStepsErrors;
    }
  };

  const pasosList = pasos.map((p, i) => {
    return (
      <CSSTransition
        key={p.id}
        timeout={300}
        classNames={{
          enter: styles.pasoEnter,
          enterActive: styles.pasoEnterActive,
          exitActive: styles.pasoExitActive,
        }}
      >
        <div style={{ width: "100%" }} className={styles.paso} key={p.id}>
          <div className={styles.pasoContent}>
            <label>{i + 1}</label>
            <textarea
              name={i + 1}
              rows={5}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.steps[i]}
              className={styles.input}
            ></textarea>
            <div
              className={styles.removePaso}
              onClick={(e) => removePaso(e, p.id)}
            >
              X
            </div>
          </div>
          <div className={styles.error}>{errors.steps[i]}</div>
        </div>
      </CSSTransition>
    );
  });

  return (
    <IngredientDispatch.Provider value={dispatch}>
      <Layout activeIng={state.ingredients}>
        <section className={styles.container}>
          <form
            onSubmit={handleSubmit}
            className={styles.form}
            name="create-form"
          >
            <div className={styles.formTitle}>
              <h2>Crea tu propia receta:</h2>
            </div>
            <div className={styles.formSection}>
              <label>Nombre:</label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                type="text"
                name="name"
                className={styles.input}
              ></input>
              <div className={styles.error}>{errors.name}</div>
            </div>
            <div className={styles.formSection}>
              <label>Descripci??n:</label>
              <textarea
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                name="description"
                rows={10}
                className={styles.input}
              ></textarea>
              <div className={styles.error}>{errors.description}</div>
            </div>
            <div className={styles.formSection}>
              <IngredientBox
                ingredients={state.ingredients}
                onRemove={removeIngredient}
              />
              <div className={styles.error}>{errors.ingredients}</div>
            </div>
            <div className={styles.formSection}>
              <h3 className={styles.pasosTitle}>Pasos:</h3>
              <TransitionGroup className={styles.pasosContainer}>
                {pasosList}
              </TransitionGroup>
              <div className={styles.pasosButton}>
                <ButtonSub
                  onClick={addPaso}
                  content="A??adir Paso"
                  font="1.5em"
                />
              </div>
            </div>
            <div className={styles.formSection}>
              <div className={styles.submitForm}>
                <ButtonPurp
                  content="Crear"
                  height="50px"
                  width="150px"
                  font="1.5em"
                />
              </div>
            </div>
            {recetaAgregada ? (
              <div className={styles.createFeedback}>
                Su receta se agrego correctamente!
              </div>
            ) : (
              ""
            )}
          </form>
        </section>
      </Layout>
    </IngredientDispatch.Provider>
  );
}
