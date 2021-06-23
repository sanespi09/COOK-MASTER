import styles from '../styles/ButtonPurp.module.css'

export default function ButtonPurp ({content, font, height, width}) {
    return (
        <button style={{height: height, fontSize: font, width: width}} className={styles.button}>{content}</button>
    )
}