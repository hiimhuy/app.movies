import React from "react";
import { CardFilm, DescriptionFilm } from "../model/type";
import { URL } from "../api";
import FilmDetail from "./FilmDetail";
import Link from "next/link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export const getDataNewUpdate = async () => {
  const response = await fetch(`${URL}/danh-sach/phim-moi-cap-nhat?page=1`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
};

const FilmSlide = async () => {
  const data: CardFilm = await getDataNewUpdate();

  return (
    <div className="pt-32">
      <div className="flex justify-between items-end my-1">
        <h1 className="text-white font-semibold py-1 text-xl">Mới cập nhật</h1>
        <Link href={"/NewUpdate"} className="text-sm hover:text-[#f23f51]">
          Xem tất cả <ArrowRightAltIcon />
        </Link>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
      {data?.items?.slice(0, 6).map((item: DescriptionFilm) => (
          <FilmDetail key={item?._id} data={item} />
        ))}
      </div>
    </div>
  );
};
export default FilmSlide;
