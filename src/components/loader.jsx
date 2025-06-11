import styles from "../styles/loader.module.css";

function Loader(){
    return (
        <div className={styles.loader}>
            <div className="spinner">Loading</div>
        </div>
    )
}

export default Loader;