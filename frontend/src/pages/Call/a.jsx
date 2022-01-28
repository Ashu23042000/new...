import React, { useEffect, useContext, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import { SocketContext } from '../../SocketContext';


const Call = () => {

    const { socket } = useContext(SocketContext);

    const [stream, setStream] = useState();
    const [me, setMe] = useState();
    const [idToCall, setIdToCall] = useState();
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);



    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const { from, to, caller } = useParams();
    useEffect(() => {
        setMe(from);
        setIdToCall(to);

        console.log({ me, idToCall, caller });
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then((currentStream) => {
                setStream(currentStream);
                console.log(currentStream);
                myVideo.current.srcObject = currentStream;
            });

        socket.on("callUser", ({ from, signal }) => {
            setCall({ isReceivedCall: true, from, signal });
        });

        if (Boolean(caller))
            callUser(idToCall);
        else
            answerCall();


    }, [])

    const callUser = (id) => {
        console.log(id)
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on("signal", (data) => {
            socket.emit("callUser", { userToCall: id, signalData: data, from: me });
        });

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });


        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    }


    const answerCall = () => {
        setCallAccepted(true);



        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: call.from });
        });

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;

    };




    return (
        <>
            <div className="video-container">
                <div className="video">
                    {stream && < video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                </div>
                <div className="video">
                    {callAccepted && !callEnded ?
                        <video autoPlay playsInline ref={userVideo} style={{ width: "300px" }} />
                        : null
                    }
                </div>
            </div>
            {/* <h1>Call Page</h1>
            {stream && <video autoPlay playsInline ref={myVideo} style={{ width: "300px" }} />} */}

        </>
    )
}

export default Call
