export interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export interface CardFilm {
  items: {
    modified: {}[];
    _id: string;
    name: string;
    slug: string;
    origin_name: string;
    poster_url: string;
    thumb_url: string;
    year: number;
  }[];
}

export interface DescriptionFilm {
  modified: {}[];
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  year: number;
}

export interface IMovie {
  data: {
    seoOnPage: {
      og_type: string;
      titleHead: string;
      descriptionHead: string;
      og_image: [];
      og_url: string;
    };
    items: DescriptionFilm[];
    titlePage: string;
    // breadCrumb: [
    //   {
    //     name: 'Phim Lẻ',
    //     slug: '/danh-sach/phim-le',
    //     isCurrent: false,
    //     position: 2
    //   },
    //   { name: 'Trang 1', isCurrent: true, position: 3 }
    // ]
    params: {
      type_slug: string;
      filterCategory: [];
      filterCountry: [];
      filterYear: string;
      filterType: string;
      sortField: string;
      sortType: string;
      pagination: Pagination;
    };
  };
}

export interface IDescription {
  modified: {}[];
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  year: number;
  type: string;
  sub_docquyen: boolean;
  chieurap: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  category: [];
  country: [];
}

export interface IFilmDetail {
  episodes: {
    server_data: {
      filename: string;
      link_embed: string;
      link_m3u8: string;
      name: string;
      slug: string;
    }[];
    server_name: string;
  }[];
  movie: {
    actor: [];
    category: {
      id: string;
      name: string;
      slug: string;
    }[];
    chieurap: boolean;
    content: string;
    country: {
      id: string;
      name: string;
      slug: string;
    }[];
    director: [];
    episode_current: string;
    episode_total: string;
    is_copyright: boolean;
    lang: string;
    modified: {
      time: string;
    };
    name: string;
    notify: string;
    origin_name: string;
    poster_url: string;
    quality: string;
    showtimes: string;
    slug: string;
    status: string;
    sub_docquyen: boolean;
    thumb_url: string;
    time: string;
    trailer_url: string;
    type: string;
    year: number;
    _id: string;
  };
}
