import { createStore } from "zustand";
import {
  getCategory,
  getCountry,
  getDataCartoon,
  getDataDetailCategory,
  getDataDetailCountry,
  getDataMovie,
  getDataNewUpdate,
  getDataSearch,
  getDataSeriesMovies,
  getDataSingleMovies,
  getDataTVShows,
} from "../api";
import { ICountryAndCategory } from "../model/type";

export type FetchDataState = {
  data: any;
  loading: boolean;
  error: any;
  page: number;
  limit: number;
  slug: string;
  keyword: string;
  dataCountry: any;
  dataCategory: any;
  episode: number;
};

export type FetchDataActions = {
  fetchDataTVShows: () => Promise<void>;
  fetchDataSingleMovies: () => Promise<void>;
  fetchDataSeriesMovies: () => Promise<void>;
  fetchDataCartoonMovies: () => Promise<void>;
  fetchDataCountryMovies: () => Promise<void>;
  fetchDataCategoryMovies: () => Promise<void>;
  setPage: (page: number) => void;
  setPrevPage: () => void;
  setNextPage: () => void;
  setLimit: (limit: number) => void;
  setSlug: (slug: string) => void;
  getDataCategory: () => Promise<void>;
  getDataCountry: () => Promise<void>;
  getDataSearch: (keyword: string, limit: number) => Promise<void>;
  setKeyword: (keyword: string) => void;
  getDataSlideNewUpdate: () => Promise<void>;
  getDataMovie: () => Promise<void>;
  setEpisode: (episode: number) => void;
};

export type CounterStore = FetchDataState & FetchDataActions;

export const defaultInitState: FetchDataState = {
  data: null,
  loading: false,
  error: null,
  page: 1,
  limit: 30,
  slug: "",
  keyword: "",
  dataCountry: null,
  dataCategory: null,
  episode: 1,
};

export const createCounterStore = (
  initState: FetchDataState = defaultInitState
) => {
  return createStore<CounterStore>()((set, get) => ({
    ...initState,
    fetchDataTVShows: async () => {
      const { page, limit } = get();
      set({ loading: true, error: null });
      try {
        const response = await getDataTVShows(page, limit);
        set({ data: response, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },
    fetchDataSingleMovies: async () => {
      const { page, limit } = get();
      set({ loading: true, error: null });
      try {
        const response = await getDataSingleMovies(page, limit);
        set({ data: response, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },
    fetchDataSeriesMovies: async () => {
      const { page, limit } = get();
      set({ loading: true, error: null });
      try {
        const response = await getDataSeriesMovies(page, limit);
        set({ data: response, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },
    fetchDataCountryMovies: async () => {
      const { page, limit, slug } = get();
      set({ loading: true, error: null });
      try {
        const response = await getDataDetailCountry(slug, page, limit);
        set({ data: response, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },
    fetchDataCategoryMovies: async () => {
      const { page, limit, slug } = get();
      set({ loading: true, error: null });
      try {
        const response: ICountryAndCategory = await getDataDetailCategory(
          slug,
          page,
          limit
        );
        set({ data: response, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },
    fetchDataCartoonMovies: async () => {
      const { page, limit } = get();
      set({ loading: true, error: null });
      try {
        const response = await getDataCartoon(page, limit);
        set({ data: response, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },
    getDataCountry: async () => {
      set({ loading: true, error: null });
      try {
        const response = await getCountry();
        set({ dataCountry: response, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },
    getDataCategory: async () => {
      set({ loading: true, error: null });
      try {
        const response = await getCategory();
        set({ dataCategory: response, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },
    getDataSearch: async () => {
      const { keyword, limit } = get();
      set({ loading: true, error: null });
      try {
        const response = await getDataSearch(keyword, limit);
        set({ data: response, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },
    getDataSlideNewUpdate: async () => {
      const { page, limit } = get();
      set({ loading: true, error: null });
      try {
        const response = await getDataNewUpdate(page, limit);
        set({ data: response, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },
    getDataMovie: async () => {
      const { slug } = get();
      set({ loading: true, error: null });
      try {
        const response = await getDataMovie(slug);
        set({ data: response, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },
    setKeyword: (keyword: string) => set({ keyword }),
    setPage: (page: number) => set({ page }),
    setPrevPage: () => set((state) => ({ page: state.page - 1 })),
    setNextPage: () => set((state) => ({ page: state.page + 1 })),
    setLimit: () => set((state) => ({ limit: state.limit + 1 })),
    setSlug: (slug) => set({ slug }),
    setEpisode: (episode) => set({ episode }),
  }));
};
