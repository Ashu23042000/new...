import React, { useEffect, useState, useRef, useContext } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Peoples.module.css";
import UserCard from '../../components/UserCard/UserCard';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from "../../SocketContext";









const Peoples = () => {


    const nevigate = useNavigate();
    const { socket } = useContext(SocketContext);


    const [me, setMe] = useState("");
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState("");
    const [idToCall, setIdToCall] = useState();



    useEffect(() => {


        const user = localStorage.getItem("user");
        setLoggedInUser(JSON.parse(user));
        setName(JSON.parse(user).name);

        socket.emit("meConnected", JSON.parse(user));


        socket.on("me", (id) => {
            setMe(id);
        });


        socket.on("connectedUsers", (data) => {
            setUsers(data);
        });

        socket.on("someOneCallingYou", (data) => {
            let a = window.confirm(`${data.fromName} wants to talk with you`);

            socket.emit("requestReply", { reply: a, to: data.from, from: data.to })


            if (a) {
                nevigate(`/call/${data.from}/${data.to}/${false}`);
            }
        });

        socket.on("requestReplyFromOther", (data) => {

            if (data.reply) {
                nevigate(`/call/${data.to}/${data.from}/${true}`);
            } else {
                alert("Didn't answer you");
            }
        })

    }, []);


    const makeCall = (id) => {
        setIdToCall(id);
        socket.emit("callRequest", { to: id, from: me, fromName: name });
    }


    return (
        <>
            <Navbar menus={[{ title: `${me}`, link: "" }]} />

            {
                <div className={styles.users_grid}>
                    {users && Object.values(users).map((user, index) => {
                        return user.id !== loggedInUser.id ?
                            // return <UserCard key={index} user={user} me={me} />
                            < div className={styles.users} >
                                <h2>{user.name}</h2>
                                <div>
                                    <span>
                                        {user.profession}
                                    </span>
                                    <span>
                                        {user.level}
                                    </span>
                                </div>
                                <button className={styles.callBtn} onClick={() => { makeCall(user.socketId) }} >
                                    {/* <span>Start Conversation</span> */}
                                    <span>Start</span>
                                </button>
                            </div>
                            : null;

                    })}
                </div>

                // !callAccepted ?
                //     <div>
                //         <div>
                //             {callAccepted && !callEnded ? (
                //                 <button onClick={() => { leaveCall() }}> End</button>

                //             )
                //                 : null
                //                 //   (
                //                 //     <button onClick={() => { callUser(idToCall) }}>Call</button>
                //                 // )
                //             }
                //         </div>


                //         <div>
                //             {/* {!callAccepted ?
                //                 (
                //                     <div>
                //                         <h1>{name} is calling.....</h1>
                //                         <button onClick={answerCall}>Answer</button>
                //                     </div>
                //                 ) : null
                //             } */}
                //         </div>
                //     </div>
                //     :
                //     <div className="video-container">


                //         <div className="video">
                //             {stream && < video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                //         </div>
                //         <div className="video">
                //             {callAccepted && !callEnded ?
                //                 <video autoPlay playsInline ref={userVideo} style={{ width: "300px" }} />
                //                 : null
                //             }
                //         </div>
                //     </div>

            }
        </>
    )
}

export default Peoples
