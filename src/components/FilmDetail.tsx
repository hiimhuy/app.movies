import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DescriptionFilm } from '@/src/model/type';

interface FilmDetailProps {
  data: DescriptionFilm;
}

const FilmDetail = ({ data }: FilmDetailProps) => {
  // console.log(data);
  return (
    <div className="flex py-2 md:w-[80%] md:h-[80%] items-center text-white">
      <div className="w-[60%] overflow-hidden rounded-sm h-full">
        <Image
          src={data?.poster_url}
          width={180}
          priority
          height={260}
          alt="."
          className="rounded-sm hover:scale-110 duration-300 cursor-pointer md:h-full md:w-[80%] w-[202px] h-[285px] object-cover"
        />
      </div>
     <div className='flex flex-col md:w-[40%] h-[285px] w-[210px] md:h-full md:py-8'>
        <p className="px-2 my-2 text-lg md:text-4xl font-bold text-[#f23f51]">
          {data?.name}
        </p>
        <p className="px-2 my-2 md:text-base text-sm font-semibold overflow-hidden">
          {data?.origin_name}
        </p>
        <p className="px-2 my-2 text-sm w-[180px] overflow-hidden line-clamp-1">{data?.year}</p>
     <Link href={`/movie/${data?.slug}`} className='flex mx-2 items-center justify-center text-xl px-2 my-2 bg-[#f32f51] hover:bg-red-700 h-10 w-28 font-bold  text-white'>Xem ngay</Link>
     </div>
    </div>
  );
};

export default FilmDetail;