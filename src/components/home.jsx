import styles from '../styles/home.module.css';
import { useNavigate } from 'react-router-dom';
import nine from "../assets/Img/eight.png";
import { useMediaQuery } from 'react-responsive';

function Home(){
  const isMobile = useMediaQuery({query: '(max-width: 468px)'});
  const navigate = useNavigate();
  function goToExplore(){
    navigate("/explore");
  }

    return (
      <div className={styles.wrapper}>
        <div className={styles.left}>
            <h1>Timeless Moments & Poignant Memories.</h1>
            <p>...Welcome to a santuary where ideas, thoughts and memories come to live forever.</p>
            <div className={styles.action}>
              <button className={styles.explore} onClick={goToExplore}>Explore</button>
              {isMobile && <button className={`${styles.explore} ${styles.signUp}`} onClick={() => navigate("/signup")}>Sign Up</button>}
            </div>
        </div>
        <div className={styles.right}>
          <img src={nine} />
        </div>
      </div>
    );
}

export default Home;