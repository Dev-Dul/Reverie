import styles from '../styles/comment.module.css';

function Comment({ }){
    return (
      <div className={styles.comm}>
        <h3>Comment 1</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
          molestiae aliquam eaque iste deleniti voluptate sed nam earum, quod
          totam.
        </p>
        <div className={styles.action}>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    );
}

export default Comment;