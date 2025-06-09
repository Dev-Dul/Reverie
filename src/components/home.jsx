import styles from '../styles/home.module.css';

function Home(){
    return (
      <div className={styles.wrapper}>
        <div className={styles.left}>
            <h1>Timeless Moments & Poignant Memories.</h1>
            <p>...Welcome to a santuary where ideas, thoughts and memories come to live forever.</p>
            <button className={styles.explore}>Explore</button>
        </div>
        <div className="right"></div>
      </div>
    );
}

export default Home;