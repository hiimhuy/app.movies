import React, { useRef } from "react";
import ReactPlayer from "react-player";

const VideoPlayed = ({ data, episodeMovie }: any) => {
  const playerRef = useRef<ReactPlayer>(null);
console.log(episodeMovie)
  return (
      <div className="flex justify-center">
        <div className="flex flex-col px-4 justify-center py-3 md:h-[650px] md:w-[900px]">
          {episodeMovie && (
            <div>
              <ReactPlayer
                ref={playerRef}
                playing={true}
                // onPlay={true}
                url={episodeMovie?.link_m3u8}
                controls={true}
                width="100%"
                height="100%"
              />
              <div className="py-5 text-xl font-semibold">{episodeMovie.filename}</div>
            </div>
          )}
        </div>
      </div>
      
  );
};

export default VideoPlayed;