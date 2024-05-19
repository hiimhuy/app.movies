import React, { useState } from "react";
import { CardFilm, DescriptionFilm } from "../model/type";
import { getDataNewUpdate } from "../api";
import FilmDetail from "./FilmDetail";
import Link from "next/link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const FilmSlide = async () => {
  const data: CardFilm = await getDataNewUpdate(1, 20);
  return (
    <div className="">
      <div className="flex justify-between items-end my-1">
        <h1 className="text-white font-semibold py-1 text-xl">Mới cập nhật</h1>
        <Link href={"/NewUpdate"} className="text-sm hover:text-[#f23f51]">
          Xem tất cả <ArrowRightAltIcon />
        </Link>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
      {data?.items?.slice(0, 6).map((item: DescriptionFilm) => (
          <FilmDetail key={item?._id} data={item} />
        ))}
      </div>
    </div>
  );
};
export default FilmSlide;
