import React, { useState } from 'react';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Login.module.css";
import { login } from "../../http/index";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../store/authSlice";



const Login = () => {

    const dispatch = useDispatch();

    const nevigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const data = { email, password };

    async function submitForm(e) {
        e.preventDefault();
        if (email && password) {
            try {
                const res = await login(data);
                if (res.status === 200) {
                    dispatch(setAuth(true));
                    dispatch(setUser(res.data.user));
                    localStorage.setItem("isAuth", true)
                    swal(res.data.message, "", "success");
                    nevigate("/people");
                } else if (res.status === 201) {
                    swal(res.data.message, "Try again", "error");
                } else {
                    swal(res.data.message, "Try again", "error");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <Navbar menus={[{ title: "Home", link: "" }, { title: "Signup", link: "signup" }]} />
            <div className={styles.form}>
                <form >
                    <i className="fas fa-user-circle"></i>

                    <input type="email" className={styles.user_input} placeholder="Email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" className={styles.user_input} placeholder="Password" name="password"
                        required value={password} onChange={(e) => setPassword(e.target.value)} />

                    {/* <div className={styles.option_1}>
                                <a href="#">Forgot Password</a>
                            </div> */}

                    <button type="submit" className={styles.btn} onClick={submitForm}>Login</button>

                    <div>
                        <p>Not Registered ?<Link to="/signup">Create an Account</Link></p>
                    </div>
                </form>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Login;
