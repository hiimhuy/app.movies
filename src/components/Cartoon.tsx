import React from "react";
import { DescriptionFilm, IMovie } from "../model/type";
import { URL } from "../api";
import Link from "next/link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CardFilm from "./CardFilm";

export const getDataCartoon = async () => {
  const response = await fetch(`${URL}/v1/api/danh-sach/hoat-hinh`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
};

const Cartoon = async () => {
  const data: IMovie = await getDataCartoon();
  console.log("data", data);

  return (
    <div className="pt-2">
      <div className="flex justify-between items-end my-1">
        <h1 className="text-white font-semibold py-1 text-xl">Hoạt hình</h1>
        <Link href={"/Cartoon"} className="text-sm hover:text-[#f23f51]">
          Xem tất cả <ArrowRightAltIcon />
        </Link>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {data?.data?.items?.slice(0, 6)?.map((item) => (
          <CardFilm key={item?._id} data={item} film={"hoat-hinh"} />
        ))}
      </div>
    </div>
  );
};
export default Cartoon;
