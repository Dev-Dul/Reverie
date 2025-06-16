import styles from "../styles/prev.module.css";

function Prev({ created, body }){
    return(
        <div className={styles.prev}>
            <h3>You</h3>
            <p>Posted On: {created}</p>
            <p>Text: {body}</p>
        </div>
    )
}

export default Prev;