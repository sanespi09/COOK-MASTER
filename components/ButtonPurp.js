import styles from '../styles/ButtonPurp.module.css'

export default function ButtonPurp ({content, font, height, width, onClick, color}) {
    return (
        <button style={{height: height, fontSize: font, width: width, backgroundColor: color}} onClick={onClick} className={styles.button}>{content}</button>
    )
}