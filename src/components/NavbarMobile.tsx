import Link from "next/link";
import React from "react";
import { ICountryAndCategory } from "../model/type";
import { Search } from "@mui/icons-material";

const NavbarMobile = ({
  setOpenMenu,
  setIsHoveredCategory,
  openMenu,
  isHoveredCategory,
  isHoveredCountry,
  setIsHoveredCountry,
  category,
  country,
}: any) => {
  return (
      <div className="absolute flex flex-col items-start top-[70px] left-0 py-2 bg-black gap-2 w-full text-base font-semibold ">
        <Link onClick={() => setOpenMenu(!openMenu)} href={"/single"} className="duration-300 px-4 text-white hover:text-[#f23f51]">PHIM LẺ</Link>
        <Link onClick={() => setOpenMenu(!openMenu)} href={"/series"} className="duration-300 px-4 text-white hover:text-[#f23f51]">PHIM BỘ</Link>
        <Link onClick={() => setOpenMenu(!openMenu)} href={"/cartoon"} className="duration-300 px-4 text-white hover:text-[#f23f51]">HOẠT HÌNH</Link>
        <Link onClick={() => setOpenMenu(!openMenu)} href={"/tvshows"} className="duration-300 px-4 text-white hover:text-[#f23f51]">TV SHOWS</Link>
        <div
          onClick={() => setIsHoveredCountry(!isHoveredCountry)}
          className="duration-300 cursor-pointer px-4 text-white hover:text-[#f23f51]"
        >
          <span>QUỐC GIA</span>
          <div
            className={`transform transition-all duration-1000 ${
              isHoveredCountry
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0 pointer-events-none"
            }`}
          >
            {isHoveredCountry && (
              <div className="w-[550px] h-[300px] duration-300 top-full bg-[#000000e6] px-5 py-2 grid grid-cols-2 gap-2 overflow-hidden overflow-y-scroll text-white ">
                {country?.map((item: ICountryAndCategory) => (
                  <Link
                    onClick={() => setOpenMenu(!openMenu)}
                    key={item?._id}
                    href={`/country/${item.slug}`}
                    className="text-sm hover:text-[#f23f51]"
                  >
                    {item?.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          onClick={() => setIsHoveredCategory(!isHoveredCategory)}
          className="relative duration-300 cursor-pointer px-4 text-white hover:text-[#f23f51]"
        >
          <span>THỂ LOẠI</span>
          <div
            className={`transform transition-all duration-1000 ${
              isHoveredCategory
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0 pointer-events-none"
            }`}
          >
            {isHoveredCategory && (
              <div className="w-[450px] h-[250px] top-full bg-[#000000e6] px-5 py-2 grid grid-cols-4 gap-2 overflow-hidden overflow-y-scroll text-white">
                {category?.map((item: ICountryAndCategory) => (
                  <Link
                    onClick={() => setOpenMenu(!openMenu)}
                    key={item?._id}
                    href={`/category/${item.slug}`}
                    className="text-sm hover:text-[#f23f51]"
                  >
                    {item?.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <Link href={"/search"} onClick={() => setOpenMenu(false)} className="px-4"><Search /></Link>
      </div>
  );
};

export default NavbarMobile;
