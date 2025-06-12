import styles from "../styles/loader.module.css";

function Loader({ mini = '' }){
    return (
        <div className={`${styles.loader} ${mini ? styles.mini : ''}`}>
            <div className="spinner">Loading</div>
        </div>
    )
}

export default Loader;