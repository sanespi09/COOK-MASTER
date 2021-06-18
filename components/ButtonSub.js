import styles from '../styles/ButtonSub.module.css'

export default function ButtonSub ({content, onClick, width, height, font}) {
    return (
        <button onClick={onClick} style={{ width: width, height: height, fontSize:font}} className={styles.button}>{content}</button>
    )
}