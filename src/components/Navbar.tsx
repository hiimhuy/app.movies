'use client'

import React, { useState, useEffect, useCallback } from "react";
import Container from "./Container";
import Link from "next/link";
import { getCategory, getCountry, getDataSearch } from "../api";
import { ICountryAndCategory, IMovie } from "../model/type";
import { Close, Menu} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "../api/config/firebaseConfig";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

const Header = () => {
  const [isHoveredCountry, setIsHoveredCountry] = useState(false);
  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  const [country, setCountry] = useState<ICountryAndCategory[]>([]);
  const [category, setCategory] = useState<ICountryAndCategory[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<IMovie|null>(null);
  const [openMenu, setOpenMenu] = useState(false)
  const path = usePathname()
  const router = useRouter()

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
    if (keyword.trim()) {
      router.push(`/search?query=${keyword}`);
      setSearchResult(null)
      setKeyword('')
    }
  };

  return (
      <div className="bg-black w-full pt-3 pb-5 fixed z-50 roboto-regular">
        <Container>
          <div className="flex lg:justify-start justify-between items-end">
            <Link href={"/"} className="text-[#941320] duration-300 items-end font-bold text-4xl hover:text-[#f23f51]">OFilm</Link>
            <button
              className="text-white lg:hidden relative"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <div className="transition-transform hover:rotate-360 duration-500 ease-in-out">
                {!openMenu ?  <Menu className="transform scale-100" />: <Close className="transform scale-100" /> }
              </div>
            </button>
           <NavbarDesktop setIsHoveredCategory={setIsHoveredCategory} setIsHoveredCountry={setIsHoveredCountry} isHoveredCategory={isHoveredCategory} isHoveredCountry={isHoveredCountry} country={country} category={category} path={path} handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleSearch={handleSearch} keyword={keyword} searchResult={searchResult} setSearchResult={setSearchResult} auth={auth} setKeyword={setKeyword} />
            {openMenu && <NavbarMobile setOpenMenu={setOpenMenu} setIsHoveredCategory={setIsHoveredCategory} openMenu={openMenu} isHoveredCategory={isHoveredCategory} isHoveredCountry={isHoveredCountry} setIsHoveredCountry={setIsHoveredCountry} category={category} country={country} />}    
          </div>
        </Container>
      </div>
  );
};

export default Header;

