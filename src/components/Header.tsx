import React from "react";
import Container from "./Container";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-black w-full pt-3 pb-5 fixed z-50">
      <Container>
        <div className="flex">
          <Link
            href={"/"}
            className="text-[#941320] duration-300 items-end font-bold text-4xl hover:text-[#f23f51]"
          >
            OFilm
          </Link>
          <div className="flex gap-4 px-12 text-lg items-end font-semibold">
            <Link href={"/NewUpdate"} className="duration-300 text-white hover:text-[#f23f51]">
              Mới cập nhật
            </Link>
            <Link href={"/SingleMovies"} className="duration-300 text-white hover:text-[#f23f51]">
              Phim lẻ
            </Link>
            <Link href={"/SeriesMovies"} className="duration-300 text-white hover:text-[#f23f51]">
              Phim bộ
            </Link>
            <Link href={"/Cartoon"} className="duration-300 text-white hover:text-[#f23f51]">
              Hoạt Hình
            </Link>
            <Link href={"/TVShows"} className="duration-300 text-white hover:text-[#f23f51]">
              TV Shows
            </Link>
            {/* <Link href={"/movie"} className="duration-300 text-white hover:text-[#f23f51]">
              app
            </Link> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
