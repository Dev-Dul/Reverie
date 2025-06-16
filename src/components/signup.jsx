import { useState } from "react";
import styles from '../styles/signup.module.css';
import { useForm } from "react-hook-form";
import { useSignUp } from "../fetch/utils";
import { toast } from "sonner";
import { Navigate, useNavigate } from "react-router-dom";
import nine from  "../assets/Img/nine.png";
import one from  "../assets/Img/one.png";

function SignUp(){
    const { SignUp } = useSignUp();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const navigate = useNavigate();
    const successMessage = "Sign Up Successful. Just a moment as we redirect you to the Login Page.";


    
    async function onSubmit(formdata){
        const SignUpPromise = SignUp(formdata.username, formdata.password);

        toast.promise(SignUpPromise, {
            loading: "Just a moment...",
            success: (result) => {
                if(result){
                    navigate("/login", { replace: true });    // Redirect to the profile page
                }
                return successMessage; // Return the message to display in the toast
            },
            error: (err) => {
                return `Sign Up Failed. with error: ${err.message}`;
            },
        });

    }
    

    return(
        <div className={styles.wrapper}>
            <form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <img src={one} className={styles.one}/>
                <img src={nine} className={styles.nine}/>
                <h2>Your Thoughts Have Found The perfect home.</h2>
                <p className={styles.sub}>Join the sanctuary of thoughts today!</p>
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;