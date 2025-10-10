import { axiosInstance } from "@/lib/utils";
import { Country } from "@/types/countries";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCountries = (regionFilter: string, searchTerm: string) => {
  let endpoint = "";
  if (regionFilter && searchTerm) {
    endpoint = `name/${searchTerm}?fields=name,capital,flags,region`;
  } else if (regionFilter) {
    endpoint = `region/${regionFilter}?fields=name,capital,flags,region`;
  } else if (searchTerm) {
    endpoint = `name/${searchTerm}?fields=name,capital,flags,region`;
  } else {
    endpoint = "all?fields=name,capital,flags,region";
  }
  return useQuery<Country[], AxiosError>({
    queryKey: ["countries", endpoint],
    queryFn: () =>
      axiosInstance
        .get<Country[]>(endpoint || "all?fields=name,capital,flags,region")
        .then((res) => res.data),
    retry:false,
  });
};
