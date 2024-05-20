'use client'

import React, { useEffect, useRef, useState } from "react";
import CardFilm from "@/src/components/CardFilm"; 
import { IMovie } from "@/src/model/type";
import { getDataSeriesMovies } from "@/src/api";
import Pagination from "@/src/components/Pagination";

const SeriesMovies = () => {
  const [data, setData] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: IMovie = await getDataSeriesMovies(currentPage, 30);
        console.log(response);
        setData(response.data);
        setCurrentPage(response.data.params.pagination.currentPage);
        setTotalPage(response.data.params.pagination.totalPages);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [currentPage]);
 
  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <>
      <title>{data?.titlePage}</title>
      <meta name="description" content={data?.seoOnPage?.descriptionHead} />
      <div className=""  ref={scrollRef}>
        <div className="text-white text-2xl font-bold py-3">
          Phim bộ - Trang {currentPage}
        </div>
        <div className="flex flex-wrap text-white gap-3 justify-center">
          {data?.items?.map((item: any) => (
            <CardFilm key={item?._id} data={item} film="phim-bo"/>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
};

export default SeriesMovies;
