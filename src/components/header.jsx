import { useState, useContext } from 'react';
import styles from '../styles/header.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { useMediaQuery } from "react-responsive";

function Header(){
    const [sidebar, setSidebar] = useState(false);
    const { user } =  useContext(AuthContext);
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: '(max-width: 486px)'});

    function toggle(){
        if(isMobile){
           setSidebar(prev => !prev);
        }
    }

    return (
        <header className={styles.header}>
            <nav>
                <h2 onClick={() => navigate("/")}>Reverie</h2>
                <div className={styles.menu}>
                    <input type="checkbox" id="check" onChange={toggle}  className={sidebar ? styles.checked : ''}/>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={sidebar ? styles.show : ''}>
                    {user ? (
                        <>
                            {sidebar && <li style={{'--pos': '1'}}><button onClick={() => { navigate("/"); toggle()}}>Home</button></li> }
                            <li style={{'--pos': '2'}}><button onClick={() => { navigate("/profile"); toggle();} }>Profile</button></li>
                            <li style={{'--pos': '3'}}><button onClick={() => { navigate("/explore"); toggle();} }>Explore</button></li>
                            <li style={{'--pos': '4'}}><button onClick={() => { navigate("/about"); toggle();} }>About</button></li>
                        </>
                    ): 
                     <>
                        <li style={{'--pos': '1'}}><button onClick={() => { navigate("/signup"); toggle();}}>Sign Up</button></li>
                        <li  style={{'--pos': '2'}}><button onClick={() =>{ navigate("/login"); toggle();}}>Log In</button></li>
                        <li  style={{'--pos': '3'}}><button onClick={() =>{ navigate("/about"); toggle();}}>About</button></li>
                     </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;