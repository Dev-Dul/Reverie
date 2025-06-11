import styles from '../styles/header.module.css';
import { useNavigate } from 'react-router-dom';

function Header(){
    const navigate = useNavigate();
    return (
        <header className={styles.header}>
            <nav>
                <h2 onClick={() => navigate("/")}>Reverie</h2>
                <ul>
                    <li><button onClick={() => navigate("/signup")}>Sign Up</button></li>
                    <li><button onClick={() => navigate("/login")}>Log In</button></li>
                    <li><button onClick={() => navigate("/profile")}>Profile</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;