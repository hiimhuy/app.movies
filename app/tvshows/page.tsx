'use client'

import React, { useEffect,  } from 'react';
import CardFilm from '@/src/components/CardFilm';
import Pagination from '@/src/components/Pagination';
import { useCounterStore } from '@/src/providers/counter-store-provider';

const TVShowsPage: React.FC = () => {
  const { data, loading, error, fetchDataTVShows, page, setPage, setPrevPage, setNextPage } = useCounterStore((state) => ({
    data: state.data?.data,
    loading: state.loading,
    error: state.error,
    fetchDataTVShows: state.fetchDataTVShows,
    page: state.page,
    setPage: state.setPage,
    setPrevPage: state.setPrevPage,
    setNextPage: state.setNextPage,
  }));

  useEffect(()=>{
    fetchDataTVShows()
  },[page])

  return (
    <>
      <title>{data?.titlePage}</title>
      <meta name="description" content={data?.seoOnPage?.descriptionHead} />
      <div>
        <div className="text-white text-2xl font-bold py-3">
          TV Shows - Page {page}
        </div>
        <div className="flex flex-wrap text-white gap-3 justify-center">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className='text-red-600'>Error: {error}</div>
          ) : (
            data?.items?.map((item: any) => (
              <CardFilm key={item?._id} data={item} film="phim-bo" />
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

export default TVShowsPage