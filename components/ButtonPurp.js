import styles from '../styles/ButtonPurp.module.css'

export default function ButtonPurp ({content, width, height}) {
    return (
        <button style={{ width: width, height: height}} className={styles.button}>{content}</button>
    )
}