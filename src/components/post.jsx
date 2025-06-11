import { useState } from "react";
import styles from "../styles/post.module.css";
import { useForm } from "react-hook-form";

function Post() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data){
    console.log("Submitted:", data);
    setOpen(prev => !prev)
  }

  function handleOpen(){
    setOpen(prev => !prev)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <div className={styles.header}>
          <h1>Title</h1>
          <p className="date">9th June 2025</p>
          <p className="author">By: Author</p>
        </div>
        <div className={styles.body}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est
            iusto, quasi quia incidunt, exercitationem magnam ad nemo eos
            eveniet ducimus provident inventore ipsa mollitia repellendus maxime
            error. Voluptatem expedita quasi ratione, omnis ipsam cupiditate
            optio exercitationem facere saepe beatae ea pariatur rerum dolorum
            aperiam quo quas! Porro magni corporis explicabo, ipsam aliquam quo,
            libero distinctio natus, numquam aliquid nesciunt exercitationem
            neque recusandae dolore! In voluptate doloremque ducimus iure
            obcaecati, nemo, modi officia quis maxime rem reprehenderit neque
            aliquid iste repellat sunt eveniet sapiente optio temporibus
            corrupti. Accusamus necessitatibus corporis neque omnis alias quos,
            a ratione excepturi laboriosam nihil eos.
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
                name="newCommen"
                id="newCommen"
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
        <div className={styles.comms}></div>
      </div>
    </div>
  );
}

export default Post;
