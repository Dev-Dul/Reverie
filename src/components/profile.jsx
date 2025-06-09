import { useState } from 'react';
import styles from '../styles/profile.module.css';

function Profile(){
    const [tab, setTab] = useState(0);
    function openPosts(){
        setTab(0);
    }

    function openComments(){
        setTab(1);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.hero}>
                <div className={styles.back}></div>
                <div className={styles.pfp}></div>
                <div className={styles.deets}>
                    <h2>Name</h2>
                    <p>Date Registered</p>
                    <p>Blogs Posted</p>
                    <p>Bio</p>
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