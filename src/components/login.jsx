import styles from '../styles/login.module.css';
import { useForm } from "react-hook-form";

function LogIn(){

    const { register, handleSubmit, formState: { errors }} = useForm();

    function onSubmit(data){
        console.log("Submitted:", data);
    }

    return(
        <div className={styles.wrapper}>
            <form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h2>Welcome back to Reverie, <br /> the sanctuary of thoughts.</h2>
                <p className={styles.sub}>Login to continue to your account</p>
                <div className={styles.inputBox}>
                    <label htmlFor="username">Name</label>
                    <input type="text" name="username" id="username" {...register('username', {
                        required: "Username is required",
                        minLength: {
                            value: 5,
                            message: "Username must be at least 5 characters."
                        }
                    })}/>
                    <p className={styles.error}>{errors.username?.message}</p>
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" {...register('password', {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters."
                        }   
                    })}/>
                    <p className={styles.error}>{errors.password?.message}</p>
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default LogIn;