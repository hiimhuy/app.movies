'use client'

import React, { useState, useEffect, useCallback, useRef } from "react";
import Container from "./Container";
import Link from "next/link";
import { getCategory, getCountry, getDataSearch } from "../api";
import { ICountryAndCategory, IMovie } from "../model/type";
import SearchResults from "./SearchResult";
import { Close, Menu, Search } from "@mui/icons-material";

const Header = () => {
  const [isHoveredCountry, setIsHoveredCountry] = useState(false);
  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  const [country, setCountry] = useState<ICountryAndCategory[]>([]);
  const [category, setCategory] = useState<ICountryAndCategory[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<IMovie|null>(null);
  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryData = await getCountry();
        const categoryData = await getCategory();
        setCountry(countryData);
        setCategory(categoryData);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchData();
  }, []);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = async (keyword: string) => {
    try {
      const data: any = await getDataSearch(keyword, 10);
      setSearchResult(data);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  const debounceSearch = useCallback(debounce((keyword: string) => {
    handleSearch(keyword);
  }, 400), []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
    if (value) {
      debounceSearch(value);
    } else {
      setSearchResult(null)
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (keyword) {
      handleSearch(keyword);
    }
  };

  return (
    <div className="bg-black w-full pt-3 pb-5 fixed z-50 roboto-regular">
      <Container>
        <div className="flex md:justify-start justify-between items-end">
          <Link href={"/"} className="text-[#941320] duration-300 items-end font-bold text-4xl hover:text-[#f23f51]">OFilm</Link>
          <button
            className="text-white md:hidden relative"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <div className="transition-transform hover:rotate-180 duration-500 ease-in-out">
              {!openMenu ?  <Menu className="transform scale-100" />: <Close className="transform scale-100" /> }
            </div>
          </button>
          <div className="hidden md:flex md:gap-4 md:px-12 md:text-base md:items-end font-semibold ">
            <Link href={"/single"} className="duration-300 text-white hover:text-[#f23f51]"> PHIM LẺ</Link>
            <Link href={"/series"} className="duration-300 text-white hover:text-[#f23f51]"> PHIM BỘ</Link>
            <Link href={"/cartoon"} className="duration-300 text-white hover:text-[#f23f51]"> HOẠT HÌNH  </Link>
            <Link href={"/tvshows"} className="duration-300 text-white hover:text-[#f23f51]"> TV SHOW </Link>
            <div
              onMouseEnter={() => setIsHoveredCountry(true)}
              onMouseLeave={() => setIsHoveredCountry(false)}
              onClick={()=> setIsHoveredCountry(!isHoveredCountry)}
              className="relative duration-300 cursor-pointer text-white hover:text-[#f23f51]"
            >
              <span>QUỐC GIA</span>
              <span className="absolute left-0 -bottom-4 h-[20px] w-[100%]"></span>
              <div
                className={`transform transition-all duration-500 ${
                  isHoveredCountry ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
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
              <div className={`transform transition-all duration-500 ${
                  isHoveredCategory ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
                }`}>
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
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-2">
                <div className="relative top-0 border rounded-3xl focus:border-black">
                  <input
                    className="py-1 px-6 text-black w-80 rounded-3xl focus:outline-none focus:border-black "
                    type="text"
                    placeholder="Nhập để tìm kiếm..."
                    value={keyword}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    {searchResult && searchResult?.data?.items.length > 0? <Close onClick={()=> {setSearchResult(null); setKeyword('')}}/> :<Link href={'/search'}><Search /></Link>}
                  </button>
                </div>
                <div
                className={`transform transition-all duration-500 absolute flex flex-col top-[70px] bg-[#000000e6] px-4 mt-2 w-[400px] rounded-md shadow-lg overflow-y-auto ${
                  searchResult && searchResult?.data?.items.length > 0 ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
                }`}
                >{searchResult && searchResult?.data?.items.length > 0 &&<SearchResults results={searchResult} onClick={()=>setSearchResult(null)} />}</div>
              </div>
            </form>
          </div>
          {
            openMenu && <div className="absolute flex flex-col items-start top-[70px] left-0 py-2 bg-black gap-2 w-full text-base font-semibold ">
            <Link onClick={()=>setOpenMenu(!openMenu)} href={"/single"} className="duration-300 px-4 text-white hover:text-[#f23f51]"> PHIM LẺ</Link>
            <Link onClick={()=>setOpenMenu(!openMenu)} href={"/series"} className="duration-300 px-4 text-white hover:text-[#f23f51]"> PHIM BỘ</Link>
            <Link onClick={()=>setOpenMenu(!openMenu)} href={"/cartoon"} className="duration-300 px-4 text-white hover:text-[#f23f51]"> HOẠT HÌNH  </Link>
            <Link onClick={()=>setOpenMenu(!openMenu)} href={"/tvshows"} className="duration-300 px-4 text-white hover:text-[#f23f51]"> TV SHOW </Link>
            <div
              onClick={() => setIsHoveredCountry(!isHoveredCountry)}
              className="duration-300 cursor-pointer px-4 text-white hover:text-[#f23f51]"
            >
              <span>QUỐC GIA</span>
              <div
                className={`transform transition-all duration-1000 ${
                  isHoveredCountry ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
                }`}
              >
                {isHoveredCountry && (
                  <div className="w-[550px] h-[300px] duration-300 top-full bg-[#000000e6] px-5 py-2 grid grid-cols-2 gap-2 overflow-hidden overflow-y-scroll text-white ">
                    {country?.map((item: ICountryAndCategory) => (
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
              className="relative duration-300 cursor-pointer px-4 text-white hover:text-[#f23f51]"
            >
              <span>THỂ LOẠI</span>
              <div className={`transform transition-all duration-1000 ${
                  isHoveredCategory ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
                }`}>
                {isHoveredCategory && (
                  <div className="w-[450px] h-[250px] top-full bg-[#000000e6] px-5 py-2 grid grid-cols-4 gap-2 overflow-hidden overflow-y-scroll text-white">
                    {category?.map((item: ICountryAndCategory) => (
                      <Link onClick={()=>setOpenMenu(!openMenu)} key={item?._id} href={`/category/${item.slug}`} className="text-sm hover:text-[#f23f51]">
                        {item?.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <Link href={'/search'} className="px-4"><Search/></Link>
            {/* <form onSubmit={handleSubmit}>
              <div className="flex items-center  px-4 gap-2">
                <div className="relative top-0 border rounded-3xl focus:border-black">
                  <input
                    className="py-1 px-6 text-black w-[386px] rounded-3xl focus:outline-none focus:border-black "
                    type="text"
                    placeholder="Nhập để tìm kiếm..."
                    value={keyword}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <Search/>
                  </button>
                </div>
                {searchResult && searchResult?.data?.items.length > 0 &&<SearchResults results={searchResult} onClick={()=>setSearchResult(null)} />}
              </div>
            </form> */}
          </div>
          }    
        </div>
      </Container>
    </div>
  );
};

export default Header;