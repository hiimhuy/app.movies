'use client'

import { getDataSingleMovies } from '@/src/api';
import CardFilm from '@/src/components/CardFilm';
import Pagination from '@/src/components/Pagination';
import { IMovie } from '@/src/model/type';
import React, { useEffect, useRef, useState } from 'react'

const SingleMoviesPage = () => {
  const [data, setData] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: IMovie = await getDataSingleMovies(currentPage, 30);
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
    // Thêm logic để load dữ liệu tương ứng với trang mới
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
          Phim lẻ - Trang {currentPage}
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
export default SingleMoviesPage