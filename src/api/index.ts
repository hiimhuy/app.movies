export const URL = "https://phimapi.com"

export const getCountry = async () => {
  const response = await fetch(`${URL}/quoc-gia`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
};

export const getDataDetailCountry = async (slug:string, page:number, limit:number) =>{
  const response = await fetch(`${URL}/v1/api/quoc-gia/${slug}?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
}

export const getDataDetailCategory = async (slug:string, page:number, limit:number) =>{
  const response = await fetch(`${URL}/v1/api/the-loai/${slug}?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
}

export const getDataMovie = async (slug: string) => {
  const response = await fetch(`${URL}/phim/${slug}`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
};

export const getCategory = async () =>{
  const response = await fetch(`${URL}/the-loai`)
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
}

export const getDataCartoon = async (page:number, limit:number) => {
  const response = await fetch(`${URL}/v1/api/danh-sach/hoat-hinh?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
};

export const getDataNewUpdate = async (page:number, limit:number) => {
  const response = await fetch(`${URL}/danh-sach/phim-moi-cap-nhat?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
};

export const getDataSeriesMovies = async (currentPage:number,limit:number) => {
  const response = await fetch(`${URL}/v1/api/danh-sach/phim-bo?page=${currentPage}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
};

export const getDataSingleMovies = async (page:number, limit:number) => {
  const response = await fetch(`${URL}/v1/api/danh-sach/phim-le?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
};

export const getDataTVShows = async (page:number, limit:number) => {
  const response = await fetch(`${URL}/v1/api/danh-sach/tv-shows?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
};

export const getDataFilm = async (slug: string) => {
  const response = await fetch(`${URL}/phim/${slug}`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
};

export const getDataSearch = async (keyword:string, limit:number) => {
  const response = await fetch(`${URL}/v1/api/tim-kiem?keyword=${keyword}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("error");
  }
  return response.json();
};