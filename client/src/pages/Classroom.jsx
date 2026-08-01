import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";

const Classroom = () => {
  const { id } = useParams();
  const student = useSelector((state) => state?.student?.student);
  const teacher = useSelector((state) => state?.teacher?.teacher);

  const role = student ? "student" : teacher ? "teacher" : "guest";
  const userName = student?.fullName || teacher?.fullName || "Guest User";
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  const meetingRef = useRef(null);
  const zpRef = useRef(null);

 
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  useEffect(() => {
    const initMeeting = async () => {
      const appID = 1038255726;
      const serverSecret = "31d0e9385d28a19a800ab1fcddebdd76";
      const userID = Date.now().toString();

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        id,
        userID,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zpRef.current = zp;

      // Configure room settings based on role
      const config = {
        container: meetingRef.current,
        scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
        showRoomTimer: true,
        showTextChat: true,
        showAudioVideoSettingsButton: true,
        showPinButton: true,
        showLayoutButton: true,
        showNonVideoUser: true,
        showOnlyAudioUser: true,
        turnOnMicrophoneWhenJoining: role === "teacher",
        turnOnCameraWhenJoining: role === "teacher",
        lowerLeftNotification: {
          showUserJoinAndLeave: true,
          showTextChat: true,
        }
      };

      // Teacher-specific settings
      if (role === "teacher") {
        config.showRoomDetailsButton = true;
        config.showScreenSharingButton = true;
        config.showInviteToCohostButton = true;
        config.showRemoveUserButton = true;
        config.sharedLinks = [
          { 
            name: "Class Link", 
            url: `${window.location.origin}/classroom/${id}` 
          }
        ];
      }
      
      // Both teachers and students join immediately
      zp.joinRoom(config);

      // Focus on teacher after a short delay for students
      if (role === "student") {
        setTimeout(() => {
          focusOnTeacher();
        }, 3000);
      }
    };

    initMeeting();

    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
      }
    };
  }, [id, userName, role]);

  // Custom fullscreen function
  const handleFullScreen = () => {
    const container = meetingRef.current || document.querySelector('.video-container');
    
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen()
          .then(() => setIsFullScreen(true))
          .catch(err => console.error('Error attempting to enable fullscreen:', err));
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
          .then(() => setIsFullScreen(false))
          .catch(err => console.error('Error attempting to exit fullscreen:', err));
      }
    }
  };

  // Function to focus on teacher's video
  const focusOnTeacher = () => {
    const teacherVideo = document.querySelector('[data-id="video-container-main"]');
    const studentVideos = document.querySelectorAll('[data-id="video-container-cell"]');
    
    if (teacherVideo) {
      teacherVideo.style.flex = "3";
      teacherVideo.style.maxWidth = "70%";
      teacherVideo.style.height = "70%";
    }
    
    if (studentVideos) {
      studentVideos.forEach(video => {
        video.style.flex = "1";
        video.style.maxWidth = "30%";
      });
    }
  };

  // Function to reset to grid view
  const resetToGridView = () => {
    const videos = document.querySelectorAll('[data-id^="video-container"]');
    videos.forEach(video => {
      video.style.flex = "1";
      video.style.maxWidth = "100%";
      video.style.height = "auto";
    });
  };

  // Handle orientation change for mobile
  const handleRotateScreen = () => {
    if (window.screen.orientation && window.screen.orientation.lock) {
      if (!isLandscape) {
        window.screen.orientation.lock('landscape')
          .then(() => setIsLandscape(true))
          .catch(err => console.error('Error locking orientation:', err));
      } else {
        window.screen.orientation.lock('portrait')
          .then(() => setIsLandscape(false))
          .catch(err => console.error('Error locking orientation:', err));
      }
    } else {
      alert("Screen orientation API not supported on this device.");
    }
  };

  // Toggle screen sharing
  const toggleScreenSharing = async () => {
    try {
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ 
          video: true,
          audio: true 
        });
        
        console.log("Screen sharing started");
        setIsScreenSharing(true);
        
        // Handle when user stops screen sharing using the browser UI
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
        };
      } else {
        console.log("Screen sharing stopped");
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error("Error with screen sharing:", error);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-gray-900">
      {/* Header Bar */}
      <div className="absolute top-0 left-0 right-0 bg-gray-800 text-white p-2 z-10 flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Classroom: {id}</h2>
          <span className="ml-4 px-2 py-1 bg-blue-500 rounded text-xs">
            {role === 'teacher' ? 'Teacher' : 'Student'}
          </span>
        </div>
        <div className="flex space-x-2">
          {role === 'teacher' && (
            <>
              <button
                onClick={focusOnTeacher}
                className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm"
              >
                Focus on Teacher
              </button>
              <button
                onClick={resetToGridView}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
              >
                Grid View
              </button>
              <button
                onClick={toggleScreenSharing}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
              >
                {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
              </button>
            </>
          )}
          {role === 'student' && (
            <>
              <button
                onClick={focusOnTeacher}
                className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm"
              >
                Focus on Teacher
              </button>
              <button
                onClick={resetToGridView}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
              >
                Show All
              </button>
            </>
          )}
          <button
            onClick={handleFullScreen}
            className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm"
          >
            {isFullScreen ? 'Exit Fullscreen' : '⛶ Fullscreen'}
          </button>
          {window.screen.orientation && (
            <button
              onClick={handleRotateScreen}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
            >
              {isLandscape ? 'Portrait' : 'Landscape'}
            </button>
          )}
        </div>
      </div>

      {/* Video Container */}
      <div 
        ref={meetingRef} 
        className="w-full h-full bg-black pt-12 video-container"
        style={{ paddingTop: '3rem' }}
      ></div>
    </div>
  );
};

export default Classroom;