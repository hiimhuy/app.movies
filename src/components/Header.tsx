'use client'

import React, { useState, useEffect } from "react";
import Container from "./Container";
import Link from "next/link";
import { ICountryAndCategory } from "../model/type";
import { Close, Favorite, Menu, Search } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useCounterStore } from "../providers/counter-store-provider";

const Header = () => {
  const [isHoveredCountry, setIsHoveredCountry] = useState(false);
  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const path = usePathname();

  const { getDataCountry, getDataCategory, dataCountry, dataCategory } = useCounterStore((state) => ({
    getDataCountry: state.getDataCountry,
    getDataCategory: state.getDataCategory,
    dataCountry: state.dataCountry,
    dataCategory: state.dataCategory,
  }));

  useEffect(() => {
    getDataCategory();
    getDataCountry();
  }, []);

  const isCountry = /^\/country\//.test(path);
  const isCategory = /^\/category\//.test(path);
  const isSearch = /^\/search\//.test(path);

  return (
    <div className="bg-black w-full pt-3 pb-5 fixed z-50 roboto-regular">
      <Container>
        <div className="flex lg:justify-between justify-between items-end">
          <div className="flex w-full justify-between">
            <Link href={"/"} className="text-[#941320] duration-300 items-end font-bold text-4xl hover:text-[#f23f51]">OFilm</Link>
            <button
              className="text-white lg:hidden relative"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <div className="transition-transform hover:rotate-180 duration-500 ease-in-out">
                {!openMenu ? <Menu className="transform scale-100" /> : <Close className="transform scale-100" />}
              </div>
            </button>
            <div className="hidden lg:flex lg:gap-4 lg:px-12 lg:text-base lg:items-end font-semibold ">
              <Link href={"/single"} className={path === '/single' ? `text-[#f23f51] px-2` : `duration-300 px-2 text-white hover:text-[#f23f51]`}> PHIM LẺ</Link>
              <Link href={"/series"} className={path === '/series' ? `text-[#f23f51] px-2` : `duration-300 px-2 text-white hover:text-[#f23f51]`}> PHIM BỘ</Link>
              <Link href={"/cartoon"} className={path === '/cartoon' ? `text-[#f23f51] px-2` : `duration-300 px-2 text-white hover:text-[#f23f51]`}> HOẠT HÌNH </Link>
              <Link href={"/tvshows"} className={path === '/tvshows' ? `text-[#f23f51] px-2` : `duration-300 px-2 text-white hover:text-[#f23f51]`}> TV SHOWS </Link>
              <div
                onMouseEnter={() => setIsHoveredCountry(true)}
                onMouseLeave={() => setIsHoveredCountry(false)}
                onClick={() => setIsHoveredCountry(!isHoveredCountry)}
                className={ isCountry ? 'text-[#f23f51] relative duration-300 px-2 cursor-pointer' : 'relative duration-300 px-2 cursor-pointer text-white hover:text-[#f23f51]'}

              >
                <span>QUỐC GIA</span>
                <span className="absolute left-0 -bottom-4 h-[20px] w-[100%]"></span>
                <div
                  className={`transform transition-all duration-500 ${isHoveredCountry ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
                    }`}
                >
                  {isHoveredCountry && (
                    <div className="absolute w-[550px] h-[400px] top-full -left-56 mt-2 bg-[#000000e6] p-5 grid grid-cols-4 gap-2 overflow-hidden text-white">
                      {dataCountry?.map((item: ICountryAndCategory) => (
                        <Link key={item?._id} href={`/country/${item.slug}`} className="text-sm hover:text-[#f23f51]">
                          {item?.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div
                onMouseEnter={() => setIsHoveredCategory(true)}
                onMouseLeave={() => setIsHoveredCategory(false)}
                className={ isCategory ? 'text-[#f23f51] relative px-2 cursor-pointer' : 'relative duration-300 px-2 cursor-pointer text-white hover:text-[#f23f51]'}
              >
                <span>THỂ LOẠI</span>
                <span className="absolute left-0 -bottom-4 h-[20px] w-[100%]"></span>
                <div className={`transform transition-all duration-500 ${isHoveredCategory ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
                  }`}>
                  {isHoveredCategory && (
                    <div className="absolute w-[450px] h-[250px] top-full -left-56 mt-2 bg-[#000000e6] p-5 grid grid-cols-4 gap-2 overflow-hidden text-white">
                      {dataCategory?.map((item: ICountryAndCategory) => (
                        <Link key={item?._id} href={`/category/${item.slug}`} className="text-sm hover:text-[#f23f51]">
                          {item?.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Link className={ path === '/favorite' ? 'hidden lg:flex text-[#f23f51]' : "hidden px-6 hover:text-[#f23f51] duration-300  lg:flex"} href={'/favorite'}><Favorite /></Link>
          <Link className={ isSearch ? 'text-[#f23f51]' : "hidden px-6 hover:text-[#f23f51] duration-300  lg:flex"} href={'/search'}><Search /></Link>
          {
            openMenu && <div className="absolute flex flex-col items-start top-[70px] left-0 py-2 bg-black gap-2 w-full text-base font-semibold ">
              <Link onClick={() => setOpenMenu(!openMenu)} href={"/single"} className={path === '/single' ? `text-[#f23f51] px-2` : `duration-300 px-2 text-white hover:text-[#f23f51]`}> PHIM LẺ</Link>
              <Link onClick={() => setOpenMenu(!openMenu)} href={"/series"} className={path === '/series' ? `text-[#f23f51] px-2` : `duration-300 px-2 text-white hover:text-[#f23f51]`}> PHIM BỘ</Link>
              <Link onClick={() => setOpenMenu(!openMenu)} href={"/cartoon"} className={path === '/cartoon' ? `text-[#f23f51] px-2` : `duration-300 px-2 text-white hover:text-[#f23f51]`}> HOẠT HÌNH </Link>
              <Link onClick={() => setOpenMenu(!openMenu)} href={"/tvshows"} className={path === '/tvshows' ? `text-[#f23f51] px-2` : `duration-300 px-2 text-white hover:text-[#f23f51]`}> TV SHOW </Link>
              <div
                onClick={() => setIsHoveredCountry(!isHoveredCountry)}
                className={ isCountry ? 'text-[#f23f51] relative px-2 cursor-pointer' : 'relative duration-300 px-2 cursor-pointer text-white hover:text-[#f23f51]'}

              >
                <span>QUỐC GIA</span>
                <div
                  className={`transform transition-all duration-1000 ${isHoveredCountry ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
                    }`}
                >
                  {isHoveredCountry && (
                    <div className="w-[550px] h-[300px] duration-300 top-full bg-[#000000e6] px-5 py-2 grid grid-cols-2 gap-2 overflow-hidden overflow-y-scroll text-white ">
                      {dataCountry?.map((item: ICountryAndCategory) => (
                        <Link onClick={() => setOpenMenu(!openMenu)} key={item?._id} href={`/country/${item.slug}`} className="text-sm hover:text-[#f23f51]">
                          {item?.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div
                onClick={() => setIsHoveredCategory(!isHoveredCategory)}
                className={ isCategory ? 'text-[#f23f51] relative px-2 cursor-pointer' : 'relative duration-300 px-2 cursor-pointer text-white hover:text-[#f23f51]'}
              >
                <span>THỂ LOẠI</span>
                <div className={`transform transition-all duration-1000 ${isHoveredCategory ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
                  }`}>
                  {isHoveredCategory && (
                    <div className="w-[450px] h-[250px] top-full bg-[#000000e6] px-5 py-2 grid grid-cols-3 gap-2 overflow-hidden overflow-y-scroll text-white">
                      {dataCategory?.map((item: ICountryAndCategory) => (
                        <Link onClick={() => setOpenMenu(!openMenu)} key={item?._id} href={`/category/${item.slug}`} className="text-sm hover:text-[#f23f51]">
                          {item?.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <Link href={'/favorite'} onClick={() => setOpenMenu(false)} className={path === '/favorite' ? 'text-[#f23f51] px-4 py-2' :"px-4 py-2"}><Favorite /></Link>
              <Link href={'/search'} onClick={() => setOpenMenu(false)} className={path === '/search' ? 'text-[#f23f51] px-4 py-2' :"px-4 py-2"}><Search /></Link>
            </div>
          }
        </div>
      </Container>
    </div>
  );
};

export default Header;
