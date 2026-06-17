export type Country = {
  names: {
    common: string;

    native?: Record<
      string,
      {
        official: string;
        common: string;
      }
    >;
  };

  capitals?: {
    name: string;
  }[];

  flag: {
    url_svg: string;
  };

  region: string;

  subregion?: string;

  population?: number;

  codes?: {
    alpha_2?: string;
    alpha_3?: string;
  };
};

export type CountriesResponse = {
  data: {
    objects: Country[];
    meta: {
      total: number;
      request_id: string;
    };
  };
};
