import styles from '../styles/login.module.css';
import { useForm } from "react-hook-form";


function NewBlog(){
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    function onSubmit(data) {
      console.log("Submitted:", data);
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