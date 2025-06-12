import { useState } from "react";
import { format } from "date-fns";
import styles from "../styles/post.module.css";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { useCreateComment, useFetchPost } from "../fetch/utils";
import Loader from "./loader";
import Error from "./error";
import Comment from "./comment";

function Post(){
  const { postId } = useParams();
  const [open, setOpen] = useState(false);
  const { info, load, err, fetchData } = useFetchPost(Number(postId));
  const { data, loading, error, createComment } = useCreateComment();
  console.log(info);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data){
    console.log("Submitted:", data);
    setOpen(prev => !prev)
    await createComment(info.id, data.body, info.author.id);
    fetchData(Number(info.id));
  }

  function handleOpen(){
    setOpen(prev => !prev)
  }

  function formatDate(date){
    const dt = new Date(date);
    const formatted = format(dt, "do MMMM yyyy");
    return formatted;
  }

  if(load) return <Loader />
  if(err) return <Error message={err} />

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <div className={styles.header}>
          <h1>{info.title}</h1>
          <p className="date">{formatDate(info.created)}</p>
          <p className="author">By: {info.author.username}</p>
        </div>
        <div className={styles.body}>
          <p>{info.body}</p>
        </div>
      </div>
      <div className={styles.comments}>
        <div className={styles.add}>
          <h2>Comments</h2>
          <button onClick={handleOpen}>Add a comment</button>
        </div>
        <div className={`${styles.newCom} ${open ? styles.open : ""}`}>
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
          {error && <Error message={error} />}
          {info.comments.map((comment) => (
             <Comment key={comment.id} id={comment.id} body={comment.body} postId={info.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
