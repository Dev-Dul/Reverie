import styles from '../styles/post.module.css';

function Post(){
    return (
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <div className={styles.header}>
            <h1>Title</h1>
            <p className="date">9th June 2025</p>
            <p className="author">By: Author</p>
          </div>
          <div className={styles.body}>
             <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est iusto, quasi quia incidunt, exercitationem magnam ad nemo eos eveniet ducimus provident inventore ipsa mollitia repellendus maxime error. Voluptatem expedita quasi ratione, omnis ipsam cupiditate optio exercitationem facere saepe beatae ea pariatur rerum dolorum aperiam quo quas! Porro magni corporis explicabo, ipsam aliquam quo, libero distinctio natus, numquam aliquid nesciunt exercitationem neque recusandae dolore! In voluptate doloremque ducimus iure obcaecati, nemo, modi officia quis maxime rem reprehenderit neque aliquid iste repellat sunt eveniet sapiente optio temporibus corrupti. Accusamus necessitatibus corporis neque omnis alias quos, a ratione excepturi laboriosam nihil eos.</p>
          </div>
        </div>
        <div className={styles.comments}>
            <h2>Comments</h2>
            <div className={styles.comms}>
                <div className={styles.comm}>
                    <h3>Comment 1</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum molestiae aliquam eaque iste deleniti voluptate sed nam earum, quod totam.</p>
                    <div className={styles.action}>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
                <div className={styles.comm}>
                    <h3>Comment 1</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum molestiae aliquam eaque iste deleniti voluptate sed nam earum, quod totam.</p>
                    <div className={styles.action}>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
                <div className={styles.comm}>
                    <h3>Comment 1</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum molestiae aliquam eaque iste deleniti voluptate sed nam earum, quod totam.</p>
                    <div className={styles.action}>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
                <div className={styles.comm}>
                    <h3>Comment 1</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum molestiae aliquam eaque iste deleniti voluptate sed nam earum, quod totam.</p>
                    <div className={styles.action}>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
}

export default Post;