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
    <Link href={`/movie/${data?.slug}`} className="flex flex-col py-2 h-[350px] items-center text-white duration-300 cursor-pointer hover:text-[#f23f51]">
      <div className="w-[180px] overflow-hidden rounded-sm h-[260px]">
        <Image
          src={data?.poster_url}
          width={180}
          priority
          height={260}
          alt="."
          className="rounded-sm hover:scale-110 duration-300 h-[260px] w-[180px] ob"
        />
      </div>
      <p className="px-2 my-2 text-base font-semibold w-[180px] overflow-hidden line-clamp-1 hover:line-clamp-none hover:overflow-visible">
        {data?.name}
      </p>
      <p className="px-2 my-2 text-sm w-[180px] overflow-hidden line-clamp-1">{data?.year}</p>
    </Link>
  );
};

export default FilmDetail;