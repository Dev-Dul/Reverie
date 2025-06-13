import styles from '../styles/login.module.css';
import { useLogIn } from '../fetch/utils';
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate, useLocation, replace } from 'react-router-dom';
import { toast } from 'sonner';

function LogIn(){
    const { handleUser } = useContext(AuthContext);
    const { logIn } = useLogIn();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const navigate = useNavigate();
    const successMessage = "Login Successful. Just a moment, \n as we redirect you to your profile";

    async function onSubmit(formdata){
        const loginPromise = logIn(formdata.username, formdata.password);

        toast.promise(loginPromise, {
            loading: "Just a moment...",
            // On successful login, the 'result' parameter will contain the data
            // that the 'logIn' promise resolved with.
            success: (result) => {
                // Ensure 'result' and 'result.user' exist before handling
                if(result && result.user){
                    handleUser(result.user); // Update the user context
                    navigate("/profile", { replace: true });    // Redirect to the profile page
                }
                return successMessage; // Return the message to display in the toast
            },
            error: (err) => {
                // You can customize the error message based on 'err' if needed
                console.error("Login error:", err); // Log the actual error for debugging
                return "Login Failed. Please check your credentials.";
            },
        });

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