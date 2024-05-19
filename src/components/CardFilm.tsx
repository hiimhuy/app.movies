import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  data: any;
  film: string;
}

const CardFilm: React.FC<IProps> = ({ data, film }) => {
  return (
    <Link
      href={`/movie/${data?.slug}`}
      className='flex flex-col w-[180px] h-[350px] py-2 items-center cursor-pointer duration-300 hover:text-[#f23f51]'
    >
      <div className='w-[180px] overflow-hidden rounded-sm h-[260px]'>
        <Image
          src={`https://img.phimapi.com/${data?.poster_url}`}
          width={180}
          height={260}
          priority
          alt={`${data?.name} poster`}
          className='rounded-sm hover:scale-110 duration-300 h-[260px] w-[180px] object-cover'
        />
      </div>
      <p className='px-2 my-2 text-base w-[180px] overflow-hidden font-semibold line-clamp-1 hover:line-clamp-none hover:overflow-visible'>
        {data?.name}
      </p>
      <div className='flex gap-1 justify-between w-[180px] px-2'>
        <p className='my-2 text-sm overflow-hidden line-clamp-1'>{data?.year}</p>
        {film === 'phim-le' ? (
          <p className='my-2 text-sm overflow-hidden line-clamp-1'>{data?.time}</p>
        ) : (
          <p className='my-2 w-[90px] text-sm overflow-hidden line-clamp-1'>{data?.episode_current}</p>
        )}
      </div>
    </Link>
  );
};

export default CardFilm;

