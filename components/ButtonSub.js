import styles from '../styles/ButtonSub.module.css'

export default function ButtonSub ({content, width, height}) {
    return (
        <button style={{ width: width, height: height}} className={styles.button}>{content}</button>
    )
}