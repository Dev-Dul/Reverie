import { useState } from "react";
import styles from '../styles/signup.module.css';

function SignUp(){
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    function handleChange(e){
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value }));
    }

    function handleSubmit(e){
        e.preventDefault();
    }

    return(
        <div className={styles.wrapper}>
            <form action="" className={styles.form}>
                <h2>Your Thoughts Have Found The perfect home.</h2>
                <p className={styles.sub}>Join the sanctuary of thoughts today!</p>
                <div className={styles.inputBox}>
                    <label htmlFor="username">Name</label>
                    <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required/>
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange}  required/>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;