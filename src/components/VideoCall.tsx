import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { useParams, useNavigate } from 'react-router-dom';

const socket = io('${API_BASE_URL}');

export const VideoCall = () => {
  const { roomId } = useParams(); // Gets ID from URL
  const navigate = useNavigate();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState<any>();
  const [callAccepted, setCallAccepted] = useState(false);

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    // 1. Get Access to Camera and Mic
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }

        // 2. Join the Socket Room
        socket.emit("join-room", roomId);

        // 3. Listen for other users
        socket.on("user-connected", (userId) => {
          console.log("Other user joined:", userId);
          callUser(userId, currentStream);
        });

        socket.on("signal", (data) => {
          if (connectionRef.current) {
            connectionRef.current.signal(data.signal);
          } else {
            // Handle incoming signal if we are the receiver
            setReceivingCall(true);
            setCallerSignal(data.signal);
            acceptCall(data.from, data.signal, currentStream);
          }
        });
      });

    return () => {
      socket.off("user-connected");
      socket.off("signal");
    };
  }, [roomId]);

  // Logic to initiate the call (First person in)
  const callUser = (userId: string, currentStream: MediaStream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: currentStream,
    });

    peer.on("signal", (data) => {
      socket.emit("signal", { to: userId, signal: data });
    });

    peer.on("stream", (remoteStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = remoteStream;
      }
    });

    connectionRef.current = peer;
  };

  // Logic to accept the call (Second person in)
  const acceptCall = (callerId: string, signal: any, currentStream: MediaStream) => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: currentStream,
    });

    peer.on("signal", (data) => {
      socket.emit("signal", { to: callerId, signal: data });
    });

    peer.on("stream", (remoteStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = remoteStream;
      }
    });

    peer.signal(signal);
    connectionRef.current = peer;
  };

  const endCall = () => {
    if (connectionRef.current) connectionRef.current.destroy();
    window.location.href = '/dashboard'; // Redirect back
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6">
      <h2 className="text-white mb-6 font-bold text-xl">Nexus Meeting Room: {roomId}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Local Video */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-2xl bg-gray-800">
          <video playsInline muted ref={myVideo} autoPlay className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-white text-sm">You (Camera On)</div>
        </div>
        
        {/* Remote Video */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl bg-gray-800">
          <video playsInline ref={userVideo} autoPlay className="w-full h-full object-cover" />
          {!callAccepted && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <p>Waiting for other participant...</p>
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-white text-sm">Partner</div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="flex items-center gap-6 mt-10 bg-gray-900 p-4 rounded-full px-10 border border-gray-800">
        <button className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 text-white transition-all">🎤</button>
        <button className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 text-white transition-all">📷</button>
        <button 
          onClick={endCall}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all"
        >
          End Session
        </button>
      </div>
    </div>
  );
};