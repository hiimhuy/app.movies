import React from 'react';
import Link from 'next/link';
import { DescriptionFilm } from '../model/type';
import Image from 'next/image';

const SearchResults = ({ results, onClick }:any) => {
  console.log(results)
  return (
    <div className="flex flex-col gap-2 h-full">
      {results?.data?.items?.slice(0,6)?.map((result:DescriptionFilm) => (
        <Link onClick={onClick} key={result?._id} href={`/movie/${result?.slug}`} className='p-2'>
          <div className='flex hover:text-[#f23f51]'>
            <Image src={`https://img.phimapi.com/${result?.thumb_url}`} loading='lazy' height={40} width={40} alt='img' className='w-16 h-20 rounded-sm object-cover'/>
            <div className="p-2 cursor-pointer">
              <p className=''>{result.name}</p>
              <p className='text-sm font-normal'>{result?.origin_name}</p>
            </div>
           
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
