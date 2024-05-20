'use client'

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { getDataNewUpdate } from "../api";
import FilmDetail from "./SlideFilm";
import { CardFilm, DescriptionFilm } from "../model/type";
import { EffectCoverflow, Autoplay } from "swiper/modules";

const FilmSlide = () => {
  const [data, setData] = useState<CardFilm | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: CardFilm = await getDataNewUpdate(1, 20);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="md:h-screen">
      <div className="flex flex-wrap md:h-full md:w-full gap-4 justify-center">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          speed={1500}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
        >
          {data.items.map((item: DescriptionFilm) => (
            <SwiperSlide key={item._id}>
              <FilmDetail data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FilmSlide;
