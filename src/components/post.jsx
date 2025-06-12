import { useState } from "react";
import styles from "../styles/post.module.css";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useCreateComment } from "../fetch/utils";
import Loader from "./loader";
import Error from "./error";

function Post(){
  const [open, setOpen] = useState(false);
  const { data, loading, error, createComment } = useCreateComment();
  const location = useLocation();
  const { post } = location.state;
  console.log(post);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data){
    console.log("Submitted:", data);
    setOpen(prev => !prev)
    createComment(post.id, data.body, post.author.id);
  }

  function handleOpen(){
    setOpen(prev => !prev)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <div className={styles.header}>
          <h1>{post.title}</h1>
          <p className="date">9th June 2025</p>
          <p className="author">By: {post.author.username}</p>
        </div>
        <div className={styles.body}>
          <p>
            {post.body}
          </p>
        </div>
      </div>
      <div className={styles.comments}>
        <div className={styles.add}>
          <h2>Comments</h2>
          <button onClick={handleOpen}>Add a comment</button>
        </div>
        <div className={`${styles.newCom} ${open ? styles.open : ''}`}>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputBox}>
              <textarea
                id="newComment"
                cols={31}
                rows={10}
                {...register("body", {
                  required: "*Comment body is required",
                  minLength: {
                    value: 10,
                    message: "*Comments needs to be at least 15 characters.",
                  },
                })}
              ></textarea>
              <p className={styles.error}>{errors.body?.message}</p>
            </div>
            <button type="submit">POST</button>
          </form>
        </div>
        <div className={styles.comms}>
              {loading ? (
                <Loader mini={true} />
              ) : error ? (
                <Error />
              ) : (
                <p>Comment Posted</p>
              )}
              
        </div>
      </div>
    </div>
  );
}

export default Post;
