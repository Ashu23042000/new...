// import React, { useState, useEffect, useRef, createContext } from "react";
// import { io } from "socket.io-client";
// import Peer from "simple-peer";
// import { useNavigate } from 'react-router-dom';



// const SocketContext = createContext();

// const socket = io("http://localhost:5000");

// const ContextProvider = ({ children }) => {
//     const nevigate = useNavigate();


//     const [stream, setStream] = useState(null);
//     const [me, setMe] = useState("");
//     const [call, setCall] = useState({});
//     const [callAccepted, setCallAccepted] = useState(false);
//     const [callEnded, setCallEnded] = useState(false);
//     const [name, setName] = useState("");
//     const [users, setUsers] = useState([]);
//     const [loggedInUser, setLoggedInUser] = useState("");
//     const [isReceivingCall, setIsReceivingCall] = useState(false);
//     const [idToCall, setIdToCall] = useState();



//     const myVideo = useRef();
//     const userVideo = useRef();
//     const connectionRef = useRef();




//     useEffect(() => {

//         // navigator.mediaDevices.getUserMedia({ audio: true, video: true })
//         //     .then((currentStream) => {
//         //         setStream(currentStream);
//         //         myVideo.current.srcObject = currentStream;
//         //     });

//         const user = localStorage.getItem("user");
//         setLoggedInUser(JSON.parse(user));
//         setName(JSON.parse(user).name);

//         socket.emit("meConnected", JSON.parse(user));


//         socket.on("me", (id) => {
//             setMe(id);
//         });


//         socket.on("connectedUsers", (data) => {
//             setUsers(data);
//         });

//         socket.on("callUser", ({ from, name, signal }) => {
//             setCall({ isReceivedCall: true, from, name, signal });
//         });

//         socket.on("someOneCallingYou", (data) => {
//             let a = window.confirm("Some one calling you");

//             socket.emit("requestReply", { reply: a, to: data.from })

//             if (a) {
//                 nevigate("/call");
//             }
//         });

//         socket.on("requestReplyFromOther", (data) => {

//             if (data.reply) {
//                 nevigate("/call");
//             } else {
//                 alert("Didn't answer you");
//             }
//         })

//     }, []);



//     const answerCall = () => {
//         setCallAccepted(true);



//         const peer = new Peer({ initiator: false, trickle: false, stream });

//         peer.on("signal", (data) => {
//             socket.emit("answerCall", { signal: data, to: call.from });
//         });

//         peer.on("stream", (currentStream) => {
//             userVideo.current.srcObject = currentStream;
//         });

//         peer.signal(call.signal);

//         connectionRef.current = peer;

//     };


//     const makeCall = (id) => {
//         setIdToCall(id);
//         socket.emit("callRequest", { to: id, from: me });
//     }


//     const callUser = (id) => {
//         setIsReceivingCall(true);


//         const peer = new Peer({ initiator: true, trickle: false, stream });

//         peer.on("signal", (data) => {
//             socket.emit("callUser", { userToCall: id, signalData: data, from: me, name });
//         });

//         peer.on("stream", (currentStream) => {
//             userVideo.current.srcObject = currentStream;
//         });


//         socket.on("callAccepted", (signal) => {
//             setCallAccepted(true);
//             peer.signal(signal);
//         });

//         connectionRef.current = peer;
//     };



//     const leaveCall = () => {
//         setCallEnded(true);
//         // setIsReceivingCall(false);

//         connectionRef.current.destroy();
//     };


//     return (
//         <SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, setStream, name, setName, callEnded, me, callUser, answerCall, leaveCall, users, loggedInUser, isReceivingCall, makeCall, idToCall }}>
//             {children}
//         </SocketContext.Provider>
//     )

// }

// export { ContextProvider, SocketContext };