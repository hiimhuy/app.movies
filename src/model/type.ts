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
    params:{
      type_slug: string,
      filterCategory: [],
      filterCountry: [],
      filterYear: string,
      filterType: string,
      sortField: string,
      sortType: string,
      pagination: Pagination
    }
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
