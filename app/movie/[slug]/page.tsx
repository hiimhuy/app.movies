'use client'

import { getDataMovie } from "@/src/api";
import { IFilmDetail } from "@/src/model/type";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DescriptionMovie from "../components/DescriptionMovie";
import VideoPlayed from "../components/VideoPlayed";

const FilmDetail = () => {
  const { slug } = useParams()
  const [data, setData] = useState<IFilmDetail | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IFilmDetail = await getDataMovie(slug as string);
        setData(data);
      } catch (error: any) {
        console.log(error);
      }
    };
      fetchData();
  }, [slug]);

  const handleEpisodeClick = (episode: any) => {
    setSelectedEpisode(episode);
  };

  return (
    <>
       {/* <Head> */}
          <title>{selectedEpisode?.filename ? data?.movie?.name : selectedEpisode?.filename}</title>
          <meta name="description" content={data?.movie?.content} />
        {/* </Head>  */}
          
      {data?.episodes ?
      <div className="h-full text-white">
        <DescriptionMovie data={data} />
        <div className="p-4">
           <div>
            {data?.episodes?.map((item: any) => (
              <div key={item.id}>
                <p className="py-2 font-semibold">{item?.server_name}</p>
                <div className="flex flex-wrap gap-3 max-h-[120px] overflow-y-scroll scrollbar-hide">
                  {item?.server_data?.map((episode: any) => (
                    <button
                      className={
                        "px-1 border-2 duration-300 rounded-sm text-white border-white hover:text-[#f23f51] hover:border-[#f23f51]"
                      }
                      key={episode?.id}
                      onClick={() => handleEpisodeClick(episode)}
                    >
                      {episode?.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedEpisode ? (
          <VideoPlayed data={data} episodeMovie={selectedEpisode} />
        ) : (
          <div className="flex justify-center items-center py-10">
            <p className="text-md">Vui lòng chọn một tập phim để xem!</p>
          </div>
        )}
      </div>
    : <div>Phim hiện không có, xin vui lòng quay lại sau!</div>  
    }
    </>
  )
};

export default FilmDetail;