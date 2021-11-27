import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = (props) => {

    const [toggle, settoggle] = useState(false);

    const showMenu = () => {
        settoggle(!toggle);
    }

    return (
        <>
            <div className={styles.navbar}>
                <div className={`container ${styles.navbar_wraper}`}>
                    <div className={styles.brand}>
                        <h2><Link to="/">ASHAPP</Link></h2>
                    </div>
                    <div className={styles.navMenu}>
                        <ul>
                            {props.menus.map((menu, i) => { return (<li key={i}><Link to={`/${menu.link}`}>{menu.title}</Link></li>) })}
                        </ul>
                    </div>
                    <div className={`${styles.hamburger} ${toggle ? styles.show : null}`} onClick={showMenu} >
                        <i className={`fal fa-bars ${styles.hamburger_img}`}></i>
                    </div>
                </div>
            </div>

            <div className={`${styles.hamburger_navMenu} ${toggle ? styles.show : null}`}  >
                <ul>
                    {props.menus.map((menu, i) => { return (<li key={i}><Link to={`/${menu.link}`}>{menu.title}</Link></li>) })}
                </ul>
            </div>
        </>
    )
}

export default Navbar
