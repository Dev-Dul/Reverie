import styles from '../styles/comment.module.css';
import { useContext, useState } from 'react';
import { useDeleteComment, useEditComment } from '../fetch/utils';
import { AuthContext } from '../App';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function Comment({ body, id, postId, created, author, fetchData, isUser }){
  const { user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const { data, loading, error, delComment } = useDeleteComment();
  const { isEdit, editLoad, editErr, editComment } = useEditComment()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  function openEdit(){
     setEdit(true);
  }

  function closeEdit(){
    setEdit(false);
  }

  function onEdit(formdata){
    console.log("submitted:", formdata);
    toast.promise(editComment(postId, id, formdata.editComment), {
      loading: "Editing Comment...",
      success: "Comment Edited Successfully",
      error: "Comment Edit Failed",
    });
    fetchData(Number(postId));
    closeEdit();
  }

  function handleDelete(){
    toast.promise(delComment(postId, id), {
      loading: "Deleting Comment...",
      success: "Comment Deleted Successfully",
      error: "Deleting Comment Failed.",
    });
    fetchData(Number(postId));
  }

    return (
      <div className={styles.comm}>
        <div className={styles.commHeader}>
          <h3>{author}</h3>
          <p>{created}</p>
        </div>
        {edit ? (
          <form action="" onSubmit={handleSubmit(onEdit)}>
            <textarea
              id="editComment"
              {...register("editComment", {
                required: "Comment Body is Required",
                minLength: {
                  value: 10,
                  message: "*Comments needs to be at least 10 characters.",
                },
              })}
            >
              {body}
            </textarea>
            <p className={styles.error}>{errors.editComment?.message}</p>
            <div className={`${styles.action} ${styles.second}`}>
              <button type="button" onClick={closeEdit}>Close</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        ) : (
          <p>{body}</p>
        )}
        {isUser && (
          <div className={styles.action}>
            {!edit && (
              <>
                <button onClick={openEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </>
            )}
          </div>
        )}
      </div>
    );
}

export default Comment;