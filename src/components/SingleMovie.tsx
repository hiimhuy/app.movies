import React from "react";
import { getDataSingleMovies } from "../api";
import Link from "next/link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CardFilm from "./CardFilm";
import { IMovie } from "../model/type";

const SingleMovie = async () => {
  const data :IMovie = await getDataSingleMovies(1,10);

  return <div className="mt-2">
  <div className="flex justify-between items-end my-1">
    <h1 className="text-white font-semibold py-1 text-xl">Phim lẻ</h1>
    <Link href={"/single"} className="text-sm hover:text-[#f23f51] text-white">
      Xem tất cả <ArrowRightAltIcon />
    </Link>
  </div>
  <div className="flex flex-wrap gap-3 justify-center">
    {data?.data?.items?.slice(0,6)?.map((item) => (
      <CardFilm key={item?._id} data={item} film={'phim-le'} />
    ))}
  </div>
</div>
};

export default SingleMovie;
