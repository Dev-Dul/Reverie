import styles from "../styles/preview.module.css";

function Preview({ title, prev, author, created }){
    return (
        <div className={styles.preview}>
            <p className={styles.peek}>{prev}</p>
            <h2>{title}</h2>
            <p>{author}</p>
            <p>{created}</p>
        </div>
    )
}

export default Preview;