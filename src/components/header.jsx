import styles from '../styles/header.module.css';

function Header(){
    return (
        <header className={styles.header}>
            <nav>
                <h2>Reverie</h2>
                <ul>
                    <li><button>Sign Up</button></li>
                    <li><button>Log In</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;