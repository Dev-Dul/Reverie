import { useContext } from 'react';
import styles from '../styles/header.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function Header(){
    const { user } =  useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <header className={styles.header}>
            <nav>
                <h2 onClick={() => navigate("/")}>Reverie</h2>
                <ul>
                    {user ? (
                        <>
                            <li><button onClick={() => navigate("/profile")}>Profile</button></li>
                            <li><button onClick={() => navigate("/explore")}>Explore</button></li>
                    
                        </>
                    ): 
                     <>
                        <li><button onClick={() => navigate("/signup")}>Sign Up</button></li>
                        <li><button onClick={() => navigate("/login")}>Log In</button></li>
                     </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;