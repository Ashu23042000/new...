import React, { useState } from 'react';
// import { useHistory } from 'react-router';
// import swal from 'sweetalert';
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Signup.module.css";
// import { signup } from '../../http/index';
import axios from 'axios';





const Signup = () => {

    // const history = useHistory();

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
            const res = await axios.post("/signup", data)
            console.log(res);
        }
    }

    // const getName = (e) => {
    // }
    // const getEmail = (e) => {
    //     ;
    // }
    // const getLevel = (e) => {
    //     setLevel(e.target.value);
    // }
    // const getProfession = (e) => {
    //     setProfession(e.target.value);
    // }
    // const getPassword = (e) => {
    //     setPassword(e.target.value);
    // }
    // const getConfirmPassword = (e) => {
    //     setConfirmPassword(e.target.value);
    // }

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
