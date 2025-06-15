import styles from '../styles/profile.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../App';
import { Navigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Preview from './preview';
import Prev from './commentPrev';
import multiavatar from '@multiavatar/multiavatar';

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
        const formatted = format(dt, "do MMMM yyyy, h:mm a");
        return formatted;
    }
    
    if(!user) return <Navigate to="/login"  replace />
    console.log(user);
    const svg = multiavatar(user.username);
    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    const blogMatch = user.blogs.length === 0;
    const Usercomments = user.blogs.comments ? user.blogs.flatMap(blog => blog.comments).filter(comment => comment.author === user.username) : [];
    const commentMatch = Usercomments.length === 0;

    return (
        <div className={styles.wrapper}>
            <div className={styles.hero}>
                <div className={styles.back}></div>
                <div className={styles.pfp}>
                    <img src={dataUrl} alt="Avatar" />
                </div>
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
                        {blogMatch ? (
                            <h2>You have'nt written any Reveries yet.</h2>
                        ): (
                            <>
                                {user.blogs.map((post) => (
                                    <Link to={`/explore/posts/${post.id}`} style={{color: '#030303'}}>
                                        <Preview
                                            key={post.id}
                                            title={post.title}
                                            author={post.author.username}
                                            prev={post.body}
                                            created={post.created}
                                            list={true}
                                            published={post.published}
                                        />
                                    </Link>
                                ))}
                            </>
                        )}
                    </div>
                    <div className={`${styles.tabContent} ${tab === 1 ? styles.activate : ''}`}>
                        {commentMatch ? (
                            <h2>You have'nt written any comments yet!</h2>
                        ): (
                            <>
                                {Usercomments.map((comment) => (
                                    <Prev created={comment.created} body={comment.body}/>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;