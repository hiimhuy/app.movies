import React from "react";
import { getDataSeriesMovies } from "../api";
import Link from "next/link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { IMovie } from "../model/type";
import CardFilm from "./CardFilm";

const SeriesMovies = async () => {
  const data :IMovie = await getDataSeriesMovies(1,10);

  return <div className="mt-2">
  <div className="flex justify-between items-end my-1">
    <h1 className="text-white font-semibold py-1 text-xl">Phim bộ</h1>
    <Link href={"/SeriesMovies"} className="text-sm hover:text-[#f23f51]">
      Xem tất cả <ArrowRightAltIcon />
    </Link>
  </div>
  <div className="flex flex-wrap gap-3 justify-center">
    {data?.data?.items?.slice(0,6)?.map((item) => (
      <CardFilm key={item?._id} data={item} film={'phim-bo'} />
    ))}
  </div>
</div>
};

export default SeriesMovies;
