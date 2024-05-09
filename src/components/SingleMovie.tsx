import React from "react";
import { URL } from "../api";
import Link from "next/link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { IDescription, IMovie } from "../model/type";
import CardFilm from "./CardFilm";


export const getDataSingleMovies = async () => {
  const response = await fetch(`${URL}/v1/api/danh-sach/phim-le`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
};

const SingleMovie = async () => {
  const data :IMovie = await getDataSingleMovies();
  // console.log("data", data);

  return <div className="mt-2">
  <div className="flex justify-between items-end my-1">
    <h1 className="text-white font-semibold py-1 text-xl">Phim lẻ</h1>
    <Link href={"/SingleMovies"} className="text-sm hover:text-[#f23f51]">
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
