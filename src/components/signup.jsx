import { useState } from "react";
import styles from '../styles/signup.module.css';
import { useForm } from "react-hook-form";
import { useSignUp } from "../fetch/utils";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

function SignUp(){
    const { data, loading, error, SignUp } = useSignUp();
    const { register, handleSubmit, formState: { errors }} = useForm();

    
    async function onSubmit(formdata){
        await SignUp(formdata.username, formdata.password);
        if(data){
            toast.success(data);
            <Navigate to={"/login"} />
        }

        if(error) toast.error(error.message)
        console.log("Submitted:", formdata);
    }

    return(
        <div className={styles.wrapper}>
            <form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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