import { URL } from "@/src/api";
import { IFilmDetail } from "@/src/model/type";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import VideoPlayed from "./components/VideoPlayed";
import DescriptionMovie from "./components/DescriptionMovie";
import Head from "next/head";

const getData = async (slug: string) => {
  const response = await fetch(`${URL}/phim/${slug}`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
};

const FilmDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<IFilmDetail | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IFilmDetail = await getData(slug as string);
        setData(data);
      } catch (error: any) {
        console.log(error);
      }
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  const handleEpisodeClick = (episode: any) => {
    setSelectedEpisode(episode);
  };

  return (

    <>
     <Head>
        <title>{selectedEpisode?.filename ? selectedEpisode?.filename : data?.movie?.name}</title>
      </Head> 
      <div className="h-full pt-40 text-white">
        <DescriptionMovie data={data} />
        <div className="py-4">
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
    </>
  )
};

export default FilmDetail;
