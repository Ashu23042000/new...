import React, { useEffect, useContext, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { SocketContext } from '../../SocketContext';
import styles from "./Call.module.css";
import Video from '../../components/Video/Video';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from "../../components/Footer/Footer";

const Call = () => {


    const { socket } = useContext(SocketContext);

    const [stream, setStream] = useState();
    // const [me, setMe] = useState();
    // const [idToCall, setIdToCall] = useState();
    // const [call, setCall] = useState({});
    // const [callAccepted, setCallAccepted] = useState(false);
    // const [callEnded, setCallEnded] = useState(false);


    const myVideo = useRef();
    const userVideo = useRef();
    const peerConnection = useRef();

    const { from, to, caller } = useParams();

    function sendData(data) {
        data.to = to;
        data.from = from;
        console.log(data);
        socket.emit("send", data);
    };


    async function start() {
        let localStream = await navigator.mediaDevices.getUserMedia({
            audio: true, video: true
        });
        myVideo.current.srcObject = localStream;

        setStream(localStream);
        const dataChannel = peerConnection.current.createDataChannel("myDataChannel");

        dataChannel.onopen = () => {
            console.log("Channel Opened");
        }

        console.log(localStream);
        peerConnection.current.addStream(localStream);



        createAndSendOffer();
    }

    async function createAndSendOffer() {
        let offer = await peerConnection.current.createOffer();

        sendData({
            type: "offer",
            offer
            // to: to,
            // from: from
        });

        await peerConnection.current.setLocalDescription(offer);
    };

    async function handleSignalingData(data) {
        switch (data.type) {
            case "answer":
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
                break;

            case "offer":
                // await peerConnection.setRemoteDescription(data.offer);
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
                recieveCall(data);
                break;

            case "candidate":
                if (data.candidate) {
                    // console.log(data.candidate);
                    await peerConnection.current.addIceCandidate(data.candidate, successFull, Rejected);
                }
                break;

            default:
                break;
        }
    }

    function successFull() {
        console.log("Successfull");
    }


    function Rejected() {
        console.log("Rejected");
    }


    async function recieveCall(data) {
        // idToCall = data.from;

        let localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        myVideo.current.srcObject = localStream;

        setStream(localStream);

        // peerConnection = new RTCPeerConnection({
        //     iceServers: [
        //         {
        //             url: ["stun:stun.stunprotocol.org", "stun.12connect.com:3478"]
        //         }
        //     ]
        // });


        peerConnection.current.ondatachannel = (e) => {
            let dataChannel = e.channel;
            dataChannel.onopen = () => {
                console.log("Channel Opened");
            }
        }

        // await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));

        peerConnection.current.addStream(localStream);

        // peerConnection.onaddstream = (e) => {
        //     console.log(e.stream);
        //     remoteView.srcObject = e.stream;
        // };

        createAndSendAnswer();

        peerConnection.current.onicecandidate = (e) => {

            if (e.candidate == null) {
                return;
            }
            sendData({
                type: "candidate",
                candidate: e.candidate
            });

        };
    }

    async function createAndSendAnswer() {

        let answer = await peerConnection.current.createAnswer();

        sendData({
            type: "answer",
            answer
        });

        await peerConnection.current.setLocalDescription(answer);
    }



    useEffect(() => {


        // setMe(from);
        // setIdToCall(to);


        peerConnection.current = new RTCPeerConnection({
            iceServers: [
                {
                    url: ["stun:stun.stunprotocol.org", "stun.12connect.com:3478"]
                }
            ]
        });

        if (Boolean(caller)) {
            start();
        }

        socket.on("send", handleSignalingData);

        peerConnection.current.onaddstream = (e) => {
            console.log(e.stream);
            userVideo.current.srcObject = e.stream;
        };

        peerConnection.current.onicecandidate = (e) => {

            if (e.candidate == null) {
                return;
            }

            sendData({
                type: "candidate",
                candidate: e.candidate
            });
        };


    }, [])


    return <>
        < Navbar menus={[]} />
        <div className={styles.main}>
            <div className={styles.section1}>
                <Video myVideoRef={myVideo} otherVideoRef={userVideo} localStream={stream} peerConnectionRef={peerConnection} />
            </div>
            <Sidebar />
        </div>
        <Footer />

    </>;
};

export default Call;
