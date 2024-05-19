'use client'

import { getDataDetailCountry } from '@/src/api'
import CardFilm from '@/src/components/CardFilm'
import Pagination from '@/src/components/Pagination'
import { IMovie } from '@/src/model/type'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const CountryPage = () => {
  const {slug}:any = useParams()
  const [data, setData]= useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>('')

  useEffect(()=>{
    const fetchData = async()=>{
      const response:IMovie = await getDataDetailCountry(slug, 1, 30)
      setData(response.data.items)
      setCurrentPage(response.data.params.pagination.currentPage);
      setTotalPage(response.data.params.pagination.totalPages);
      setTitle(response.data.titlePage)
      console.log(response)
    }

    fetchData()
  },[])  

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  console.log(data)
  return (
    <div className=""  ref={scrollRef}>
    <div className="text-white text-2xl font-bold py-3">
      Phim {title} - Trang {currentPage}
    </div>
    <div className="flex flex-wrap text-white gap-3 justify-center">
      {data?.map((item: any) => (
        <CardFilm key={item?._id} data={item} film="phim-bo"/>
      ))}
    </div>
    <div className="flex justify-center mt-5">
      <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange} />
    </div>
  </div>
  )
}

export default CountryPage