import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const SingleFilm = async({data, film}:any) => {
// console.log(data?.modified)
  return (
    <Link href={`/film/${data?.slug}`} className='flex flex-col h-[350px] py-2 items-center cursor-pointer duration-300 hover:text-[#f23f51]'>
      <div className=' w-[180px] overflow-hidden rounded-sm h-[260px]'>
        <Image src={`https://img.phimapi.com/${data?.poster_url}`} width={180} priority height={260} alt='.' className='rounded-sm hover:scale-110 duration-300 h-[260px] w-[180px] ob' />
      </div>
        <p className='px-2 my-2 text-sm w-[180px] overflow-hidden line-clamp-1 hover:line-clamp-none hover:overflow-visible'>{data?.name}</p>
        <div className='flex gap-1 justify-between w-full px-2'>
          <p className='my-2 text-sm overflow-hidden line-clamp-1 '>{data?.year}</p>
          {film ==='phim-le' ? <p className='my-2 text-sm overflow-hidden line-clamp-1'>{data?.time}</p>
            :
            <p className='my-2 text-sm overflow-hidden line-clamp-1'>{data?.episode_current}</p>
        }
        </div>
    </Link>
  )
}

export default SingleFilm



