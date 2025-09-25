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

  const fetchVideoData = React.useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}courses/getVdoCipherOTP`,
        {
          videoId: videoUrl,
        }
      );
      console.log("Video data received", response.data);

      if (
        response.data?.videoURL?.otp &&
        response.data?.videoURL?.playbackInfo
      ) {
        setVideoData(response.data.videoURL);
      } else {
        console.log("Invalid video data received");
      }
    } catch (err: any) {
      console.error("Video loading error: catch", err);
      console.log(
        err.response?.data?.message || "Failed to load video. Please try again."
      );
    } finally {
      console.log("Video loading error: finally");
    }
  }, [videoUrl]);

  useEffect(() => {
    fetchVideoData();
  }, [videoUrl, fetchVideoData]);

  return (
    <div className="w-full h-full">
      {videoData?.otp && videoData?.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=Aqj945gVGrnvSFQu`}
          className="w-full h-full"
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
