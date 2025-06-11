import styles from '../styles/home.module.css';
import { useNavigate } from 'react-router-dom';

function Home(){
  const navigate = useNavigate();
  function goToExplore(){
    navigate("/explore");
  }

    return (
      <div className={styles.wrapper}>
        <div className={styles.left}>
            <h1>Timeless Moments & Poignant Memories.</h1>
            <p>...Welcome to a santuary where ideas, thoughts and memories come to live forever.</p>
            <button className={styles.explore} onClick={goToExplore}>Explore</button>
        </div>
        <div className="right"></div>
      </div>
    );
}

export default Home;