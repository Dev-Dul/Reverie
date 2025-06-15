import styles from "../styles/loader.module.css";
import butterfly from "../assets/Img/butterfly.gif";

function Loader({ mini = '' }){
    return (
        <div className={`${styles.loader} ${mini ? styles.mini : ''}`}>
            <img src={butterfly} alt="Loader" />
            <div className="spinner">Loading...</div>
        </div>
    )
}

export default Loader;