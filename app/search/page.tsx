'use client';

import Pagination from '@/src/components/Pagination';
import { IDescription } from '@/src/model/type';
import { useCounterStore } from '@/src/providers/counter-store-provider';
import { Close } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import React, {Suspense } from 'react';

const SearchPage = () => {
  const {data, getDataSearch, limit, page, keyword, setKeyword, setPage, setNextPage, setPrevPage} = useCounterStore((state) =>({
    data: state.data,
    keyword: state.keyword,
    getDataSearch: state.getDataSearch,
    limit: state.limit,
    page: state.page,
    setKeyword: state.setKeyword,
    setPage: state.setPage,
    setNextPage: state.setNextPage,
    setPrevPage: state.setPrevPage
  }))

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getDataSearch(keyword, limit)
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <>
      <title>{data?.data?.titlePage}</title>
      <meta name="description" content={data?.data?.seoOnPage?.descriptionHead} />
      <div className='text-white'>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <div className='relative w-full'>
              <input
                className=" py-1 px-6 text-black w-full focus:outline-none focus:border-black"
                type="text"
                placeholder="Nhập để tìm kiếm..."
                value={keyword}
                onChange={handleInputChange}
              />
              <Close onClick={()=> setKeyword(' ')} className='absolute z-50 text-black hover:text-[#f23f51] duration-300 cursor-pointer right-1 top-1'/>
            </div>
            <button className='w-40 bg-[#f23f51] hover:bg-red-600' type='submit'>Tìm kiếm</button>
          </div>
        </form>
        <p className='py-4 font-semibold text-2xl text-[#f23f51]'>{data?.data?.titlePage}</p>
        {data?.data?.items[0] ? data?.data?.items?.map((film: IDescription) => (
          <Link key={film?._id} href={`/movie/${film?.slug}`} className='p-2'>
            <div className='flex gap-8'>
              <Image src={`https://img.phimapi.com/${film?.thumb_url}`} loading='lazy' height={40} width={40} alt='img' className='w-32 h-40 rounded-sm object-cover' />
              <div className="p-2 cursor-pointer">
                <p className='text-[#f23f51] text-xl font-semibold'>{film.name}</p>
                <p className='font-sm'>{film?.origin_name}</p>
                <p className='font-sm'>{film?.year}</p>
                <p className='font-sm'>{film?.country?.map((item: any) => item.name).join(', ')}</p>
              </div>
            </div>
          </Link>
        )) : <p>Không tìm thấy phim!</p>}
          {data && <div className="flex justify-center mt-5">
              <Pagination currentPage={page} totalPages={data?.params?.pagination?.totalPages || 1} onPageChange={setPage} nextPage={setNextPage} prevPage={setPrevPage} />
            </div>}
      </div>
    </>
  );
};

const SearchPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
};

export default SearchPageWrapper;
