import styles from "../styles/loader.module.css";

function Loader(){
    return (
        <div className={styles.loader}>
            <div className="spinner"></div>
        </div>
    )
}

export default Loader;