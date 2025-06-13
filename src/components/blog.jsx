import styles from '../styles/blog.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFetchPosts } from '../fetch/utils';
import Preview from './preview';
import Loader from './loader';
import Error from './error';

function Blog(){
    const { data, loading, error } = useFetchPosts();
    const navigate = useNavigate();
    function goToCreate(){
        navigate('/explore/create');
    }

    if(loading) return <Loader />
    if(error) return <Error message={error} />
    console.log(data);

    return (
      <div className={styles.wrapper}>
        <div className={styles.add} onClick={goToCreate}></div>
        <div className={styles.header}>
          <h2>Explore Reverie</h2>
        </div>
        <div className={styles.posts}>
          {data.map((post) => (
            <Link to={`/explore/posts/${post.id}`}>
              <Preview
                key={post.id}
                title={post.title}
                author={post.author.username}
                prev={post.body}
                created={post.created}
                published={post.published}
              />
            </Link>
          ))}
        </div>
      </div>
    );
}

export default Blog;