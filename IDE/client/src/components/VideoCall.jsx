import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const VideoCall = () =>  {
  const { videoId } = useParams();
  const containerRef = useRef(null);

  useEffect(() => {
    const MyRoom = async () => {
      const appId = 1511634706;
      const serverSecret = "8f72ab86e21e70a14795d617b8472d77";
      const userId = Date.now().toString();
      const userName = "User" + userId;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        videoId,
        userId,
        userName
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);

      zc.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `${window.location.href}`
          }
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall
        },
        showScreenSharingButton: true
      });
    };

    MyRoom();
  }, [videoId]);

  return <div ref={containerRef} className='bg-stone-100 h-screen z-100'/>;
}

export default VideoCall