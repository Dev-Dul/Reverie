import { useContext } from 'react';
import { useDeleteComment } from '../fetch/utils';
import styles from '../styles/comment.module.css';
import { AuthContext } from '../App';

function Comment({ body, id, created }){
  const { user } = useContext(AuthContext);
  const { data, loading, error, delComment } = useDeleteComment();

  function handleDelete(id){
     delComment(id)
  }
    return (
      <div className={styles.comm}>
        <div className={styles.commHeader}>
          <h3>Comment 1</h3>
          <p>{created}</p>
        </div>
        <p>{body}</p>
        {user && (
          <div className={styles.action}>
            <button onClick={() => handleDelete(id)}>Edit</button>
            <button>Delete</button>
          </div>
        )}
      </div>
    );
}

export default Comment;