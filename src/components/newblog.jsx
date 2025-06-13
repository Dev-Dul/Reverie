import { useContext } from 'react';
import styles from '../styles/login.module.css';
import { useForm } from "react-hook-form";
import { AuthContext } from '../App';
import { useCreatePost } from '../fetch/utils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


function NewBlog(){
    const { user } = useContext(AuthContext);
    const { createPost } = useCreatePost();
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    function onSubmit(data) {
      console.log("Submitted:", data);
      const createPostPromise =  createPost(data.title, data.body, user.id);
      toast.promise(createPostPromise, {
        loading: "Creating Post...",
        success: (result) => {
          if(result){
            navigate("/explore");
            return "Post Created Successfully";
           }
        },
        error: (err) => {
            return `Create Post Failed, ${err.message}`;
        },
      });
    }

    return (
      <div className={styles.wrapper}>
        <form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Write A New Reverie</h2>
          <div className={styles.inputBox}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 5,
                  message: "Post title must be at least five characters",
                },
              })}
            />
            <p className={styles.error}>{errors.title?.message}</p>
          </div>
          <div className={`${styles.inputBox} ${styles.auto}`}>
            <label htmlFor="body">Body</label>
            <textarea
              id="body"
              cols={32}
              rows={8}
              {...register("body", {
                required: "Post body is required",
                minLength: {
                  value: 50,
                  message: "Message body must be at least 50 characters",
                },
              })}
            ></textarea>
            <p className={styles.error}>{errors.body?.message}</p>
          </div>
          <button type="submit">POST</button>
        </form>
      </div>
    );
}

export default NewBlog;