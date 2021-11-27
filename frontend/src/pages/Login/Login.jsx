import React, { useState } from 'react';
// import { useHistory } from 'react-router';
// import axios from "axios";
// import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
// import Footer from "../../components/Footer/Footer";
import styles from "./Login.module.css";



const Login = () => {

    // const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const getEmail = (e) => {
        setEmail(e.target.value);
    }

    const getPassword = (e) => {
        setPassword(e.target.value);
    }

    // const data = { email, password };

    const submitForm = (e) => {

        // if (email && password) {
        //     e.preventDefault();
        //     axios.post("http://localhost:5000/login", data)
        //         .then((response) => {
        //             if (response.status === 200) {
        //                 swal(response.data.message, "", "success");
        //                 localStorage.setItem("user", JSON.stringify(response.data.user));
        //                 history.push("/people");
        //             } else if (response.status === 201) {
        //                 swal(response.data.message, "Try again", "error");
        //             } else {
        //                 swal(response.data.message, "Try again", "error");
        //             }
        //         }).catch((err) => {
        //             console.log(err);
        //         });
        // }
    }

    return (
        <>
            <Navbar menus={[{ title: "Home", link: "" }, { title: "Signup", link: "signup" }]} />
            <div className={styles.form}>
                <form >
                    <i className="fas fa-user-circle"></i>
                    <input type="email" className={styles.user_input} placeholder="Email" name="email" required value={email} onChange={getEmail} />
                    <input type="password" className={styles.user_input} placeholder="Password" name="password"
                        required value={password} onChange={getPassword} />
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
