import Link from "next/link";
import React, { useState } from "react";
import { ICountryAndCategory } from "../model/type";
import { AccountCircle, Close, FavoriteBorder, Search } from "@mui/icons-material";
import SearchResults from "./SearchResult";
import LoginForm from "./LoginForm";
import Image from "next/image";
import RegisterForm from "./RegisterForm";

const NavbarDesktop = ({
  setIsHoveredCategory,
  setIsHoveredCountry,
  isHoveredCategory,
  isHoveredCountry,
  country,
  category,
  path,
  handleSubmit,
  handleInputChange,
  keyword,
  searchResult,
  setSearchResult,
  auth,
  setKeyword,
}:any) => {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  return (
    <div className="hidden lg:flex justify-between lg:w-full">
      <div className="hidden lg:flex lg:gap-4 lg:px-12 lg:text-base lg:items-end font-semibold ">
        <Link href={"/single"} className="duration-300 text-white hover:text-[#f23f51]">
          PHIM LẺ
        </Link>
        <Link href={"/series"} className="duration-300 text-white hover:text-[#f23f51]">
          PHIM BỘ
        </Link>
        <Link href={"/cartoon"} className="duration-300 text-white hover:text-[#f23f51]">
          HOẠT HÌNH
        </Link>
        <Link href={"/tvshows"} className="duration-300 text-white hover:text-[#f23f51]">
          TV SHOW
        </Link>
        <div
          onMouseEnter={() => setIsHoveredCountry(true)}
          onMouseLeave={() => setIsHoveredCountry(false)}
          onClick={() => setIsHoveredCountry(!isHoveredCountry)}
          className="relative duration-300 cursor-pointer text-white hover:text-[#f23f51]"
        >
          <span>QUỐC GIA</span>
          <span className="absolute left-0 -bottom-4 h-[20px] w-[100%]"></span>
          <div
            className={`transform transition-all duration-500 ${
              isHoveredCountry
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0 pointer-events-none"
            }`}
          >
            {isHoveredCountry && (
              <div className="absolute w-[550px] h-[400px] top-full -left-56 mt-2 bg-[#000000e6] p-5 grid grid-cols-4 gap-2 overflow-hidden text-white">
                {country?.map((item: ICountryAndCategory) => (
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
          className="relative duration-300 cursor-pointer text-white hover:text-[#f23f51]"
        >
          <span>THỂ LOẠI</span>
          <span className="absolute left-0 -bottom-4 h-[20px] w-[100%]"></span>
          <div
            className={`transform transition-all duration-500 ${
              isHoveredCategory
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0 pointer-events-none"
            }`}
          >
            {isHoveredCategory && (
              <div className="absolute w-[450px] h-[250px] top-full -left-56 mt-2 bg-[#000000e6] p-5 grid grid-cols-4 gap-2 overflow-hidden text-white">
                {category?.map((item: ICountryAndCategory) => (
                  <Link key={item?._id} href={`/category/${item.slug}`} className="text-sm hover:text-[#f23f51]">
                    {item?.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        {path !== "/search" && (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
              <div className="relative top-0 border rounded-sm font-semibold focus:border-black">
                <input
                  className="py-1 px-6 text-black text- w-80 rounded-sm focus:outline-none focus:border-black"
                  type="text"
                  placeholder="Nhập để tìm kiếm..."
                  value={keyword}
                  onChange={handleInputChange}
                />
                <div className="absolute border-s-[2px] bg-white inset-y-0 right-0 flex items-center px-3 text-gray-500 cursor-pointer">
                  {searchResult && searchResult?.data?.items.length > 0 ? (
                    <Close
                      onClick={() => {
                        setSearchResult(null);
                        setKeyword("");
                      }}
                    />
                  ) : (
                    <Link href={`/search?keyword=${keyword}`}>
                      <Search />
                    </Link>
                  )}
                </div>
              </div>
              <div
                className={`transform transition-all duration-500 absolute flex flex-col top-[60px] bg-[#000000e6] px-4 mt-2 w-[400px] rounded-md shadow-lg overflow-y-auto ${
                  searchResult && searchResult?.data?.items.length > 0
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 opacity-0 pointer-events-none"
                }`}
              >
                {searchResult && searchResult?.data?.items.length > 0 && (
                  <SearchResults
                    results={searchResult}
                    onClick={() => setSearchResult(null)}
                  />
                )}
                <Link
                  onClick={() => setSearchResult(null)}
                  className="flex justify-center pb-2 hover:text-[#f23f51] border-t-[1px]"
                  href={`/search?query=${keyword}`}
                >
                  Xem thêm
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
      <div className="hidden lg:flex lg:items-center lg:gap-10">
        {auth && (
          <Link href={"/favorite"}>
            <FavoriteBorder className="h-8 w-8 text-red-500 hover:text-red-700" />
          </Link>
        )}
        <div className="">
          {!auth?.currentUser ? (
         <>
            <AccountCircle onClick={() => setOpenLoginForm(!openLoginForm)} className="relative w-8 h-8 cursor-pointer" />
                 {openLoginForm && 
              <div>
                    <div className="absolute w-screen h-screen flex items-center justify-center opacity-20 bg-black top-0 right-0 z-0"></div>
                    <LoginForm setOpenLoginForm={setOpenLoginForm} openLoginForm={openLoginForm} setOpenRegisterForm={setOpenRegisterForm} openRegisterForm={openRegisterForm}/>
              </div>
                  }
                  {openRegisterForm && 
              <div>
                    <div className="absolute w-screen h-screen flex items-center justify-center opacity-20 bg-black top-0 right-0 z-0"></div>
                    <RegisterForm setOpenRegisterForm={setOpenRegisterForm} openRegisterForm={openRegisterForm} setOpenLoginForm={setOpenLoginForm} openLoginForm={openLoginForm}/>
              </div>
                  }
         </>
          ):<Image src={auth?.currentUser?.photoURL} height={20} width={20} alt="avatar" loading="lazy" className="w-8 h-8 rounded-full object-cover"/>}
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
