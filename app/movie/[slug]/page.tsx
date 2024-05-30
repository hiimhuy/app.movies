"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import DescriptionMovie from "../components/DescriptionMovie";
import VideoPlayed from "../components/VideoPlayed";
import { useCounterStore } from "@/src/providers/counter-store-provider";

const FilmDetail = () => {
  const { slug }: any = useParams();
  const { setSlug, data, getDataMovie, episode, setEpisode } = useCounterStore(
    (state) => ({
      data: state.data,
      setSlug: state.setSlug,
      getDataMovie: state.getDataMovie,
      episode: state.episode,
      setEpisode: state.setEpisode,
    })
  );
  useEffect(() => {
    setSlug(slug);
    getDataMovie();
  }, []);

  return (
    <>
      <title>{data?.movie?.name}</title>
      <meta name="description" content={data?.movie?.content} />
      {data?.episodes ? (
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
                        onClick={() => setEpisode(episode)}
                      >
                        {episode?.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {episode ? (
            <VideoPlayed data={data} episodeMovie={episode} />
          ) : (
            <div className="flex justify-center items-center py-10">
              <p className="text-md">Vui lòng chọn một tập phim để xem!</p>
            </div>
          )}
        </div>
      ) : (
        <div>Phim hiện không có, xin vui lòng quay lại sau!</div>
      )}
    </>
  );
};

export default FilmDetail;
