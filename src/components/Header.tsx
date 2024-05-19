'use client'

import React, { useState, useEffect, useCallback, useRef } from "react";
import Container from "./Container";
import Link from "next/link";
import { getCategory, getCountry, getDataSearch } from "../api";
import { ICountryAndCategory, IMovie } from "../model/type";
import SearchResults from "./SearchResult";
import { Search } from "@mui/icons-material";

const Header = () => {
  const [isHoveredCountry, setIsHoveredCountry] = useState(false);
  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  const [country, setCountry] = useState<ICountryAndCategory[]>([]);
  const [category, setCategory] = useState<ICountryAndCategory[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<IMovie|null>(null);

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
        <div className="flex">
          <Link href={"/"} className="text-[#941320] duration-300 items-end font-bold text-4xl hover:text-[#f23f51]">OFilm</Link>
          <div className="flex gap-4 px-12 text-base items-end font-semibold">
            <Link href={"/single"} className="duration-300 text-white hover:text-[#f23f51]"> PHIM LẺ</Link>
            <Link href={"/series"} className="duration-300 text-white hover:text-[#f23f51]"> PHIM BỘ</Link>
            <Link href={"/cartoon"} className="duration-300 text-white hover:text-[#f23f51]"> HOẠT HÌNH  </Link>
            <Link href={"/tvshows"} className="duration-300 text-white hover:text-[#f23f51]"> TV SHOW </Link>
            <div
              onMouseEnter={() => setIsHoveredCountry(true)}
              onMouseLeave={() => setIsHoveredCountry(false)}
              className="relative duration-300 cursor-pointer text-white hover:text-[#f23f51]"
            >
              <span>QUỐC GIA</span>
              <span className="absolute left-0 -bottom-4 h-[20px] w-[100%]"></span>
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
            <div
              onMouseEnter={() => setIsHoveredCategory(true)}
              onMouseLeave={() => setIsHoveredCategory(false)}
              className="relative duration-300 cursor-pointer text-white hover:text-[#f23f51]"
            >
              <span>THỂ LOẠI</span>
              <span className="absolute left-0 -bottom-4 h-[20px] w-[100%]"></span>
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
                    <Search/>
                  </button>
                </div>
                {searchResult && searchResult?.data?.items.length > 0 &&<SearchResults results={searchResult} onClick={()=>setSearchResult(null)} />}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
