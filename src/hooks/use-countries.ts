import { axiosInstance } from "@/lib/utils";
import { Country } from "@/types/countries";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCountries = (regionFilter: string, searchTerm: string) => {
  const fields = "names.common,capitals,codes.alpha_2,region";

  return useQuery<Country[], AxiosError>({
    queryKey: ["countries", regionFilter, searchTerm],

    queryFn: async () => {
      const res = await axiosInstance.get("", {
        params: {
          region: regionFilter || undefined,
          search: searchTerm || undefined,
          fields,
        },
      });

      return res.data.data?.objects ?? [];
    },

    retry: false,
  });
};
