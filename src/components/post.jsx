import styles from "../styles/post.module.css";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCreateComment, useDeletePost, useEditPost, useFetchPost, UsePublishPost } from "../fetch/utils";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import Loader from "./loader";
import Error from "./error";
import Comment from "./comment";
import { AuthContext } from "../App";

function Post(){
  const { user } = useContext(AuthContext);
  const { postId } = useParams();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const { info, load, err, fetchData } = useFetchPost(Number(postId));
  const { data, loading, error, createComment } = useCreateComment();
  const { editPost } = useEditPost();
  const { delError, deletePost } = useDeletePost();
  const { publishPost } = UsePublishPost();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
  } = useForm();


  function onEditPost(formdata){
    console.log("Submitted:", formdata);
    toast.promise(editPost(info.id, formdata.edited), {
      loading: "Editing Post...",
      success: "Post Edited Successfully",
      error: "Editing Post Failed.",
    });
  }

  async function handleDelete(){
    toast.promise(deletePost(info.id), {
      loading: "Deleting Post...",
      success: "Post Deleted Successfully",
      error: "Deleting Post Failed.",
    });

    if(!delError){
      navigate("/explore");
    }
  }

  async function onPublish(){
    const publishPromise = publishPost(info.id);
    toast.promise(publishPromise, {
      loading: "Publishing Post...",
      success: (response) => {
        if(response){
          fetchData(Number(postId));
          return response.message;
        }
      },

      error: (err) => {
        return `Publishing Post Failed, ${err.message}`
      }
    })
  }

  async function onSubmit(data){
    setOpen(prev => !prev);
    const author = user ? user.username : data.author + "(Guest)";
    await createComment(info.id, data.body, author);
    fetchData(Number(info.id));
  }

  function handleOpen(){
    setOpen(prev => !prev)
  }

  function openEdit(){
    setEdit(true)

  }

  function closeEdit(){
    setEdit(false)
  }

  function formatDate(date){
    const dt = new Date(date);
    const formatted = format(dt, "do MMMM yyyy");
    return formatted;
  }

  if(load) return <Loader />
  if(err) return <Error message={err} />
  const isUser = user ? info.authorId === user.id : null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <div className={styles.header}>
          {isUser && (
            <div
              className={`${styles.danger} ${info.published ? styles.pub : ""}`}
            >
              {!info.published && <button onClick={onPublish}>Publish</button>}
              <div className={styles.delete} onClick={handleDelete}>
                <Trash2 size={20} />
              </div>
            </div>
          )}
          <h1>{info.title}</h1>
          <p className="date">{formatDate(info.created)}</p>
          <p className="author">By: {info.author.username}</p>
        </div>
        <div className={styles.body}>
          {edit ? (
            <form action="" onSubmit={handleEditSubmit(onEditPost)}>
              <textarea
                id="edited"
                {...registerEdit("edited", {
                  required: "Post body is required",
                  minLength: {
                    value: 50,
                    message: "*Post body must be at least 50 characters",
                  },
                })}
              >
                {info.body}
              </textarea>
              <p className={`${styles.error} ${styles.second}`}>
                {editErrors.edited?.message}
              </p>
              <div className={styles.action}>
                <button type="submit">Post</button>
                <button type="button" onClick={closeEdit}>
                  Close
                </button>
              </div>
            </form>
          ) : (
            <p>{info.body}</p>
          )}
          {isUser && (
            <div className={styles.edit} onClick={openEdit}>
              <Pencil size={20} />
            </div>
          )}
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
              <input
                type="text"
                id="author"
                placeholder={"Your Name"}
                {...register("author", {
                  required: "*Comment Author is Required",
                  minLength: {
                    value: 5,
                    message: "*Name has to be at least 5 characters.",
                  },
                })}
              />
              <p className={styles.error}>{errors.author?.message}</p>
            </div>
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
            <div className={styles.action}>
              <button type="buttom" onClick={handleOpen}>
                Close
              </button>
              <button type="submit">POST</button>
            </div>
          </form>
        </div>
        <div className={styles.comms}>
          {error && <Error message={error} />}
          {info.comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              body={comment.body}
              postId={info.id}
              created={formatDate(comment.created)}
              author={comment.author}
              fetchData={fetchData}
              isUser={isUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
