import React, { useEffect, useState } from "react";
import axios from "axios";

type CoursePlayerProps = {
  videoUrl: string;
  title: string;
};

const CoursePlayer = ({ videoUrl, title }: CoursePlayerProps) => {
  const [videoData, setVideoData] = useState<any>({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}courses/getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [videoUrl]);

  return (
    <div>
      <div style={{ paddingTop: "56%", position: "relative" }}>
        {videoData.otp && videoData.playbackInfo !== "" && (
          <iframe
            src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}`}
            style={{
              border: "0",
              maxWidth: "100%",
              position: "absolute",
              top: "0",
              left: "0",
              height: "100%",
              width: "100%",
            }}
            allowFullScreen={true}
            allow="encrypted-media"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default CoursePlayer;
