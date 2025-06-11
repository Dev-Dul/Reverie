import styles from '../styles/blog.module.css';
import { useNavigate } from 'react-router-dom';


function Blog(){
    const navigate = useNavigate();
    function goToCreate(){
        navigate('/explore/create');
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.add} onClick={goToCreate}></div>
            <div className={styles.header}>
                <h2>Explore Reverie</h2>
            </div>
            <div className={styles.posts}>

            </div>
        </div>
    )
}

export default Blog;