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
      className='flex flex-col w-[180px] h-[350px] 2xl:w-[230px] 2xl:h-[430px] py-2 items-center cursor-pointer duration-300 hover:text-[#f23f51]'
    >
      <div className='w-full 2xl:w-[230px] overflow-hidden rounded-sm h-[260px] 2xl:h-[430px]'>
        <Image
          src={`https://img.phimapi.com/${data?.poster_url}`}
          width={180}
          height={260}
          priority
          alt={`${data?.name} poster`}
          className='rounded-sm hover:scale-110 duration-300 h-[260px] w-[180px] object-cover 2xl:w-[230px] 2xl:h-[400px]'
        />
      </div>
      <p className='px-2 my-2 text-base w-full overflow-hidden font-semibold line-clamp-1 hover:line-clamp-none hover:overflow-visible'>
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
  );
};

export default CardFilm;

