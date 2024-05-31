"use client";

import CardFilm from "@/src/components/CardFilm";
import { useCounterStore } from "@/src/providers/counter-store-provider";
import React, { useEffect } from "react";

const FavoritePage = () => {
  const { listFavorite, getMoviesFavorite, deleteAllMovies } = useCounterStore(
    (state) => ({
      listFavorite: state.listFavorite,
      getMoviesFavorite: state.getMoviesFavorite,
      deleteAllMovies: state.deleteAllMovies,
    })
  );

  useEffect(() => {
    getMoviesFavorite();
  }, []);

  return (
    <>
      <div className="text-white text-2xl font-bold py-3">
        Danh sách phim yêu thích
      </div>
      { listFavorite.length === 0 ? <div>Hiện không có phim yêu thích!</div>  : <button onClick={deleteAllMovies}>Xóa tất cả phim</button>}
      <div className="flex flex-wrap gap-3 justify-center">
        {listFavorite?.map((movie: any) => (
          <CardFilm data={movie} film="" key={movie?._id} />
        ))}
      </div>
    </>
  );
};

export default FavoritePage;
