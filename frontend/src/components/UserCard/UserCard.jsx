import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./UserCard.module.css";
import io from "socket.io-client";

const UserCard = ({ user, me }) => {

    const navigate = useNavigate();

    const makeCall = (me, userToCall) => {
        // navigate("/")
        
    }

    

    return (
        <>
            <div className={styles.users} >
                <h2>{user.name}</h2>
                <div>
                    <span>
                        {user.profession}
                    </span>
                    <span>
                        {user.level}
                    </span>
                </div>

                <button className={styles.callBtn} onClick={() => makeCall(me, user.socketId)}>
                    {/* <span>Start Conversation</span> */}
                    <span>Start</span>
                </button>
            </div>
        </>
    )
}

export default UserCard
