"use client";

import CardFilm from "@/src/components/CardFilm";
import Pagination from "@/src/components/Pagination";
import { useCounterStore } from "@/src/providers/counter-store-provider";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const CategoryPage = () => {
  const { slug }: any = useParams();

  const { data, loading, error, fetchDataCategoryMovies, page, setPage, setPrevPage, setNextPage, setSlug } = useCounterStore((state) => ({
    data: state.data?.data,
    loading: state.loading,
    error: state.error,
    fetchDataCategoryMovies: state.fetchDataCategoryMovies,
    page: state.page,
    setPage: state.setPage,
    setPrevPage: state.setPrevPage,
    setNextPage: state.setNextPage,
    setSlug: state.setSlug
  }));

  useEffect(() => {
    setSlug(slug);
    fetchDataCategoryMovies();
  }, [page,slug]);

  return (
    <>
      <title>{data?.titlePage}</title>
      <meta name="description" content={data?.seoOnPage?.descriptionHead} />
      <div className="" >
        <div className="text-white text-2xl font-bold py-3">
          Phim {data?.titlePage} - Trang {page}
        </div>
        <div className="flex flex-wrap text-white gap-3 justify-center">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className='text-red-600'>Error: {error}</div>
          ) : (
            data?.items?.map((item: any) => (
              <CardFilm key={item?._id} data={item} film="phim-bo" />
            ))
          )}
        </div>
        <div className="flex justify-center mt-5">
          <Pagination currentPage={page} totalPages={data?.params?.pagination?.totalPages || 1} onPageChange={setPage} nextPage={setNextPage} prevPage={setPrevPage} />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
