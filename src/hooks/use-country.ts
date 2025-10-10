import { axiosInstance } from "@/lib/utils";
import { Country } from "@/types/countries";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCountry = (countryName:string) => {

  return useQuery<Country, AxiosError>({
    queryKey: [countryName, countryName],
    queryFn: () =>
      axiosInstance
        .get<Country[]>(`name/${countryName}`)
        .then((res) => res.data[0]),
  });
};
