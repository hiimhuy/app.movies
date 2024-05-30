import React from "react";
import { IMovie } from "../model/type";
import { getDataCartoon } from "../api";
import Link from "next/link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CardFilm from "./CardFilm";

const Cartoon = async () => {
  const data: IMovie = await getDataCartoon(1, 10);

  return (
    <div className="pt-2">
      <div className="flex justify-between items-end my-1">
        <h1 className="text-white font-semibold py-1 text-xl">Hoạt hình</h1>
        <Link href={"/cartoon"} className="text-sm hover:text-[#f23f51] text-white ">
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