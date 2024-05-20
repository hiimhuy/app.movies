import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DescriptionMovie = ({data}:any) => {
  return (
    <div className="md:flex md:flex-row md:justify-between flex flex-col items-center gap-8">
    <Image
      src={data?.movie.poster_url || ""}
      height={450}
      width={350}
      priority
      alt="."
      className="rounded-sm md:h-[450px] md:w-[350px] h-80 w-64"
    />
    <div className="text-sm px-6">
      <h1 className="text-4xl font-semibold text-[#f23f51]">
        {data?.movie?.name}
      </h1>
      <h4 className="font-semibold text-2xl py-3">
        Đạo diễn: {data?.movie?.director?.map((direct: string) => direct)}
      </h4>
      <div className="flex gap-5">
        <p>Năm {data?.movie?.year}</p>
        <p className="">
          {data?.movie?.quality}
        </p>
        <p className="">
          {data?.movie?.lang}
        </p>
        <div>
        Quốc gia:{" "}
        {data?.movie?.country?.map((item: any, index: number) => (
          <Link href={`/country/${item.slug}`} key={item.id} className="px-1 hover:text-[#f23f51]">
            {item.name}
          </Link>
        ))}
      </div>
      </div>
      <div className="flex flex-wrap">
        Thể loại:{" "}
        {data?.movie?.category?.map((item: any, index: number) => (
          <span key={item.id} className="px-1">
            {item.name}
            {index !== data.movie.category.length - 1 && ", "}
          </span>
        ))}
      </div>
      
      <div>
        Diễn viên:{" "}
        {data?.movie?.actor?.map((item: string, index: number) => (
          <span key={item} className="px-1">
            {item}
            {index !== data.movie.actor.length - 1 && ", "}
          </span>
        ))}
      </div>
      <div>Thời gian: {data?.movie?.time}</div>
      <p>Tổng số tập: {data?.movie?.episode_total}</p>
      <p>Tập mới nhất: {data?.movie?.episode_current}</p>
      <div>
        Tình trạng:{" "}
        {data?.movie.status === "ongoing" ? "Đang chiếu" : "Hoàn thành"}
      </div>
      <div className="text-justify">Mô tả: {data?.movie?.content}</div>
    <div>
      {/* <Link className="border-2 border-white text-xl font-semibold hover:text-[#f23f51] hover:border-[#f23f51] rounded-sm px-3 duration-300 py-1" href={'/'}>Xem phim</Link> */}
    </div>
    </div>
  </div>
  )
}

export default DescriptionMovie