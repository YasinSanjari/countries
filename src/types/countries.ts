export type Country = {
  name: {
    common: string;
    nativeName?: Record<
      string,
      {
        official: string;
        common: string;
      }
    >;
  };
  capital: string[];
  flags: { svg: string };
  region: string;
  subregion?: string;
  population?: number;
  cca3?: string;
};
