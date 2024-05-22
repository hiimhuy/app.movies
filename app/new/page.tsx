'use client'

import { getDataNewUpdate } from "@/src/api";
import FilmDetail from "@/src/components/SlideFilm";
import Pagination from "@/src/components/Pagination";
import { DescriptionFilm } from "@/src/model/type";
import React, { useState, useEffect, useRef } from "react";

const NewUpdatePage = () => {
  const [data, setData] = useState<DescriptionFilm[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response:any = await getDataNewUpdate(currentPage,30);
        setData(response.items);
        setCurrentPage(response.pagination.currentPage);
        setTotalPage(response.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
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
    <div className=""  ref={scrollRef}>
      <div className="text-white text-2xl font-bold py-3">
        Phim mới cập nhật - Trang {currentPage}
      </div>
      <div className="flex flex-col items-center" >
        <div className="flex flex-wrap gap-3 justify-center">
          {data?.map((item: DescriptionFilm) => (
            <FilmDetail key={item._id} data={item} />
          ))}
        </div>
        <div className="flex justify-center mt-5">
        <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange} />
      </div>
      </div>
    </div>
  );
};

export default NewUpdatePage;
