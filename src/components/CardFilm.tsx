'use client'

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useCounterStore } from '../providers/counter-store-provider';

interface IProps {
  data: any;
  film: string;
}

const CardFilm: React.FC<IProps> = ({ data, film }) => {
  const { listFavorite, addMovieToFavorite, deleteMovieToFavorite, getMoviesFavorite } = useCounterStore((state) => ({
    listFavorite: state.listFavorite,
    addMovieToFavorite: state.addMovieToFavorite,
    deleteMovieToFavorite: state.deleteMovieToFavorite,
    getMoviesFavorite: state.getMoviesFavorite,
  }));

  useEffect(()=>{
    getMoviesFavorite()
  },[])

  const isFavorite = listFavorite.some((item) => item.slug === data.slug);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      deleteMovieToFavorite(data);
    } else {
      addMovieToFavorite(data);
    }
  };

  const posterUrl = data?.poster_url.startsWith('https://img.phimapi.com/')
    ? data?.poster_url
    : `https://img.phimapi.com/${data?.poster_url}`;

  return (
    <div className='relative flex flex-col w-[180px] h-[350px] 2xl:w-[230px] 2xl:h-[430px] my-2 items-center cursor-pointer'>
      {isFavorite ? (
        <Favorite onClick={handleToggleFavorite} className='absolute z-10 h-34 top-3 right-2 text-[#f23f51] hover:text-[#faf9f9] duration-300' />
      ) : (
        <FavoriteBorder onClick={handleToggleFavorite} className='absolute z-10 h-34 top-3 right-2 hover:text-[#f23f51] duration-300' />
      )}
      <Link
        href={`/movie/${data?.slug}`}
        className='flex flex-col w-[180px] h-[350px] 2xl:w-[230px] 2xl:h-[430px] py-2 items-center cursor-pointer'
      >
        <div className='w-full relative 2xl:w-[230px] overflow-hidden rounded-sm h-[260px] 2xl:h-[430px]'>
          <Image
            src={posterUrl}
            width={180}
            height={260}
            priority
            alt={`${data?.name} poster`}
            className='rounded-sm hover:scale-110 duration-300 h-[260px] w-[180px] object-cover 2xl:w-[230px] 2xl:h-[400px]'
          />
        </div>
        <p className='px-2 my-2 text-base w-full overflow-hidden font-semibold line-clamp-1 hover:line-clamp-none hover:overflow-visible hover:text-[#f23f51] duration-300'>
          {data?.name}
        </p>
        <div className='flex gap-1 justify-between w-full 2xl:w-[230px] px-2'>
          <p className='my-2 text-sm overflow-hidden line-clamp-1'>{data?.year}</p>
          {film === 'phim-le' ? (
            <p className='my-2 text-sm overflow-hidden line-clamp-1'>{data?.time}</p>
          ) : (
            <p className='my-2 w-[90px] text-sm overflow-hidden line-clamp-1'>{data?.episode_current}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CardFilm;

