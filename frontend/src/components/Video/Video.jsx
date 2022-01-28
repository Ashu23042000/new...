import React, { useState } from 'react';
import styles from "./Video.module.css";

const Video = ({ myVideoRef, otherVideoRef, localStream, peerConnectionRef }) => {

    const [isAudio, setisAudio] = useState(true);
    const [isVideo, setisVideo] = useState(true);

    function muteAudio() {
        setisAudio(!isAudio);
        localStream.getAudioTracks()[0].enabled = isAudio;
    };

    function muteVideo() {
        setisVideo(!isVideo);
        localStream.getVideoTracks()[0].enabled = isVideo;
    };


    function endCall() {
        peerConnectionRef.removeStream(localStream);
        peerConnectionRef.close();
    }

    return <>

        <div className={styles.stream_section}>
            <video className={styles.myStream} ref={myVideoRef} autoPlay muted ></video>
            <video className={styles.otherStream} ref={otherVideoRef} autoPlay width={300} height={200}></video>
        </div>
        <div className={styles.menus}>
            {isAudio ? <i className="fa fa-microphone-slash mikeoff" aria-hidden="true" onClick={muteAudio}></i> :
                <i className="fas fa-microphone mikeon" onClick={muteAudio}></i>}
            {isVideo ? <i className="fas fa-video-slash videooff" onClick={muteVideo}></i> :
                <i className="fas fa-video videoon" onClick={muteVideo}></i>

            }
        </div>
        <a href="/people" className={styles.endCall}>
            <button onClick={endCall}>End Call</button>
        </a>
    </>
};

export default Video;
