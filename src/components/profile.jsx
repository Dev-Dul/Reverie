import { useContext, useState } from 'react';
import styles from '../styles/profile.module.css';
import { AuthContext } from '../App';
import { Navigate } from 'react-router-dom';
import { format } from 'date-fns';

function Profile(){
    const { user } = useContext(AuthContext);
    const [tab, setTab] = useState(0);
    function openPosts(){
        setTab(0);
    }

    function openComments(){
        setTab(1);
    }

    function formatDate(date){
        const dt = new Date(date);
        const formatted = format(dt, "do MMMM yyyy");
        return formatted;
    }
    
    if(!user) return <Navigate to="/login"  replace />

    return (
        <div className={styles.wrapper}>
            <div className={styles.hero}>
                <div className={styles.back}></div>
                <div className={styles.pfp}></div>
                <div className={styles.deets}>
                    <h2>{user.username}</h2>
                    <p>Blogs Posted: {user.blogs.length}</p>
                    <p>Last LogIn: {formatDate(user.lastLog)}</p>
                </div>
            </div>
            <div className={styles.posts}>
                <div className={styles.top}>
                    <button onClick={openPosts}>Posts</button>
                    <button onClick={openComments}>Comments</button>
                </div>
                <div className={styles.tab}>
                    <div className={`${styles.tabContent} ${tab === 0 ? styles.activate : ''}`}>

                    </div>
                    <div className={`${styles.tabContent} ${tab === 1 ? styles.activate : ''}`}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;