import styles from "../styles/prev.module.css";

function Prev({ created, body }){
    return(
        <div className={styles.prev}>
            <h3>You</h3>
            <p>{created}</p>
            <p>{body}</p>
        </div>
    )
}

export default Prev;