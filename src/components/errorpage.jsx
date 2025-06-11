import { Link } from "react-router-dom";
import styles from "../styles/error.module.css";

function ErrorPage(){
    return (
        <div className={styles.error}>
            <h1>Oops!, An Error Occurred.</h1>
            <p>Try Checking Your Internet Connection.</p>
            <p> <Link to={"/"}> Go Home </Link></p>
        </div>
    )
}

export default ErrorPage;