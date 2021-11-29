import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Signup.module.css";
import { signup } from '../../http/index';




const Signup = () => {

    const navigate = useNavigate();

    const [name, setName] = useState(null);
    const [email, setEmail] = useState("");
    const [level, setLevel] = useState("");
    const [profession, setProfession] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const data = { name, email, level, profession, password, confirmPassword };


    async function submitForm(e) {
        e.preventDefault();
        if (name && email && level && profession && password && confirmPassword) {
            if (password === confirmPassword) {
                try {
                    const res = await signup(data);
                    if (res.status === 200) {
                        swal(res.data.message, "Login now", "success");
                        navigate("/login");
                    } else if (res.status === 201) {
                        swal(res.data.message, "Try with another email", "error");
                    } else {
                        swal(res.data.message, "Try again", "error");
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                swal("Password does not match", "Try again", "error");
            }
        }
    }


    return (
        <>
            <Navbar menus={[{ title: "Home", link: "" }, { title: "Login", link: "login" }]} />

            <div className={styles.form}>
                <form>
                    <i className="fas fa-user-plus"></i>

                    <input type="text" className={styles.user_input} placeholder="Username" name="name" required onChange={(e) => setName(e.target.value)} />

                    <input type="email" className={styles.user_input} placeholder="Email" name="email" required onChange={(e) => setEmail(e.target.value)} />

                    <select name="level" className={styles.selectBox} required onChange={(e) => setLevel(e.target.value)}>
                        <option value="">Select Level</option>
                        <option value="Low">Low</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>

                    <select name="profession" className={styles.selectBox} required onChange={(e) => setProfession(e.target.value)}>
                        <option value="">Select Profession</option>
                        <option value="Student">Student</option>
                        <option value="Employee">Employee</option>
                        <option value="Other">Other</option>
                    </select>

                    <input type="password" className={styles.user_input} placeholder="Password" name="password"
                        required onChange={(e) => setPassword(e.target.value)} />

                    <input type="password" className={styles.user_input} placeholder="Confirm Password"
                        name="confirmPassword" required onChange={(e) => setConfirmPassword(e.target.value)} />

                    <button type="submit" className={styles.btn} onClick={submitForm}>Signup</button>

                    <div className={styles.option_1}>
                        <p>Already Registered? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Signup;
