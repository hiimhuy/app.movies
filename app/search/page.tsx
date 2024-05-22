'use client';

import { getDataSearch } from '@/src/api';
import Pagination from '@/src/components/Pagination';
import { IDescription, IMovie } from '@/src/model/type';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState, Suspense } from 'react';

const SearchPage = () => {
  const [data, setData] = useState<IMovie | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const query = useSearchParams();
  const keywordPath: any = query.get('query');

  useEffect(() => {
    const fetchData = async () => {
      const response: IMovie = await getDataSearch(keywordPath, 100);
      setData(response);
      setTotalPage(response.data.params.pagination.totalPages);
      setCurrentPage(response.data.params.pagination.currentPage);
    };
    fetchData();
  }, [keywordPath, currentPage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/search?query=${keywordPath}&page=${page}`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (keyword.trim()) {
      router.push(`/search?query=${keyword}`);
    }
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
            <input
              className="py-1 px-6 text-black w-full focus:outline-none focus:border-black"
              type="text"
              placeholder="Nhập để tìm kiếm..."
              value={keyword}
              onChange={handleInputChange}
            />
            <button className='w-40 bg-[#f23f51] hover:bg-red-600' type='submit'>Tìm kiếm</button>
          </div>
        </form>
        <p className='py-4 font-semibold text-2xl text-[#f23f51]'>{data?.data.titlePage}</p>
        {data?.data.items[0] ? data?.data?.items?.map((film: IDescription) => (
          <Link key={film?._id} href={`/movie/${film?.slug}`} className='p-2'>
            <div className='flex gap-8'>
              <Image src={`https://img.phimapi.com/${film?.thumb_url}`} loading='lazy' height={40} width={40} alt='img' className='w-32 h-40 rounded-sm object-cover' />
              <div className="p-2 cursor-pointer">
                <p className='text-[#f23f51] text-xl font-semibold'>{film.name}</p>
                <p className='font-sm'>{film?.origin_name}</p>
                <p className='font-sm'>{film?.year}</p>
                <p className='font-sm'>{film.country?.map((item: any) => item.name).join(', ')}</p>
              </div>
            </div>
          </Link>
        )) : <p>Không tìm thấy phim!</p>}
        {totalPage > 1 && (
          <div className="flex justify-center mt-5">
            <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange} />
          </div>
        )}
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
