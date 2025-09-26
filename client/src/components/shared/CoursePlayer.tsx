import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../ui/Spinner";

type CoursePlayerProps = {
  videoUrl: string;
  title: string;
};

const CoursePlayer = ({ videoUrl, title }: CoursePlayerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<any>({
    otp: "",
    playbackInfo: "",
  });

  const fetchVideoData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}courses/getVdoCipherOTP`,
        {
          videoId: videoUrl,
        }
      );

      if (
        response.data?.videoURL?.otp &&
        response.data?.videoURL?.playbackInfo
      ) {
        setVideoData(response.data.videoURL);
      } else {
        toast.error("Invalid video data received");
        setError("Invalid video data received");
        console.log("Invalid video data received");
      }
    } catch (err: any) {
      console.error("Video loading error: catch", err);
      setError(
        err.response?.data?.message || "Failed to load video. Please try again."
      );
      toast.error(
        err.response?.data?.message || "Failed to load video. Please try again."
      );
      console.log(
        err.response?.data?.message || "Failed to load video. Please try again."
      );
    } finally {
      setIsLoading(false);
      console.log("Video loading error: finally");
    }
  }, [videoUrl]);

  useEffect(() => {
    fetchVideoData();
  }, [videoUrl, fetchVideoData]);

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner fullPage={false} />
        </div>
      ) : (
        videoData?.otp &&
        videoData?.playbackInfo !== "" && (
          <iframe
            src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=Aqj945gVGrnvSFQu`}
            className="w-full h-full"
            allowFullScreen={true}
            allow="encrypted-media"
          ></iframe>
        )
      )}
    </div>
  );
};

export default CoursePlayer;
