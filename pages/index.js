import LogIn from "../components/LogIn";
import { useState, useContext } from "react";
import ButtonPurp from "../components/ButtonPurp";
import ButtonSub from "../components/ButtonSub";
import Link from "next/link";
import ReactModal from "react-modal";
import styles from "../styles/Home.module.css";

export default function Home({ UserContext }) {
  const [modalOpen, setModal] = useState(false);
  const currentUser = useContext(UserContext);
  const handleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.logo}>CookMaster</h1>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className={styles.welcome}>
            <h2>
              Hace click aquí para ingresar a tu espacio culinario personal
            </h2>
          </div>
          {currentUser ? (
            <Link href="/dash">
              <div className={styles.button}>
                <ButtonPurp
                  font="1.2em"
                  content="Ingresar"
                  height="50px"
                  width="150px"
                />
              </div>
            </Link>
          ) : (
            <div>
              <div className={styles.button}>
                <ButtonPurp
                  onClick={handleModal}
                  font="1.2em"
                  content="Ingresar"
                  height="50px"
                  width="150px"
                />
              </div>
              <div>
                <Link href="/register">
                  <div className={styles.button}>
                    <ButtonSub content="Registrate" font="1em" />
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <ReactModal
        isOpen={modalOpen}
        className="modal-content"
        overlayClassName="modal-overlay"
        onRequestClose={handleModal}
      >
        <LogIn />
      </ReactModal>
    </div>
  );
}
