import { axiosInstance } from "@/lib/utils";
import { Country } from "@/types/countries";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCountry = (countryName: string) => {
  const fields =
    "names.common,capitals,region,subregion,population,codes.alpha_2,codes.alpha_3";

  return useQuery<Country, AxiosError>({
    queryKey: ["country", countryName],

    queryFn: async () => {
      const res = await axiosInstance.get("", {
        params: {
          country: countryName,
          fields,
        },
      });

      return res.data.data.objects[0];
    },

    enabled: !!countryName,
  });
};
