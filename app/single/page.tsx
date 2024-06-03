'use client'

import CardFilm from '@/src/components/CardFilm';
import Pagination from '@/src/components/Pagination';
import { useCounterStore } from '@/src/providers/counter-store-provider';
import React, { useEffect } from 'react'

const SingleMoviesPage = () => {
  const { data, loading, error, fetchDataSingleMovies, page, setPage, setPrevPage, setNextPage } = useCounterStore((state) => ({
    data: state.data?.data,
    loading: state.loading,
    error: state.error,
    fetchDataSingleMovies: state.fetchDataSingleMovies,
    page: state.page,
    setPage: state.setPage,
    setPrevPage: state.setPrevPage,
    setNextPage: state.setNextPage,
  }));

  useEffect(()=>{
    setPage(1)
  },[])

  useEffect(()=>{
    fetchDataSingleMovies()
  },[page])
  return (
    <>
      <title>{data?.titlePage}</title>
      <meta name="description" content={data?.seoOnPage?.descriptionHead} />
      <div className="">
        <div className="text-white text-2xl font-bold py-3">
          Phim lẻ - Trang {page}
        </div>
        <div className="flex flex-wrap text-white gap-3 justify-center">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className='text-red-600'>Error: {error}</div>
          ) : (
            data?.items?.map((item: any) => (
              <CardFilm key={item?._id} data={item} film="phim-le" />
            ))
          )}
        </div>
        <div className="flex justify-center mt-5">
          <Pagination currentPage={page} totalPages={data?.params?.pagination?.totalPages || 1} onPageChange={setPage} nextPage={setNextPage} prevPage={setPrevPage} />
        </div>
      </div>
    </>
  );
};
export default SingleMoviesPage