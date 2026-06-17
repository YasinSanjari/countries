"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { useCountry } from "@/hooks/use-country";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";

const CountryDetailsPage = () => {
  const params = useParams<{ name: string }>();
  const { data: country, isLoading, isError } = useCountry(params.name);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex">
        <Loader className="animate-spin w-12 h-12 my-auto mx-auto" />
      </div>
    );
  }

  if (isError || !country) {
    return (
      <div className="w-full text-center h-screen flex items-center justify-center">
        <p className="text-2xl dark:text-white text-black">No country found.</p>
      </div>
    );
  }

  const nativeName = country.names.native
    ? Object.values(country.names.native)[0]?.common
    : "Unknown";

  const capitals =
    country.capitals?.map((capital) => capital.name).join(", ") ?? "Unknown";

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-white dark:bg-black overflow-x-hidden px-4 md:px-0"
      style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}
    >
      <main className="px-4 md:px-40 flex flex-1 justify-center pb-4">
        <div className="flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#111518] dark:text-white text-[32px] font-bold leading-tight min-w-60 md:min-w-72">
              {country.names.common}
            </p>
          </div>

          <AspectRatio ratio={16 / 9}>
            <Image
              src={`https://flags.restcountries.com/v5/w320/${country.codes?.alpha_2?.toLocaleLowerCase()}.png`}
              alt={`${country.names.common} Flag`}
              fill
              className="object-cover rounded-2xl border"
            />
          </AspectRatio>

          <h3 className="text-[#111518] dark:text-white text-lg font-bold tracking-tight px-4 pb-2 pt-4">
            Overview
          </h3>

          <Card className="p-4 pb-0">
            <CardContent className="grid grid-cols-[20%_1fr] gap-x-6 p-0">
              <div className="col-span-2 grid grid-cols-subgrid pb-4 items-center gap-16">
                <p className="text-[#617789] dark:text-[#9ba2a8] text-base font-bold">
                  Property
                </p>

                <p className="text-[#111518] dark:text-[#ffffffb3] text-base font-bold">
                  Value
                </p>
              </div>

              {[
                ["Native Name", nativeName],

                ["Capital", capitals],

                [
                  "Population",
                  country.population?.toLocaleString() ?? "Unknown",
                ],

                ["Region", country.region],

                ["Sub-Region", country.subregion ?? "Unknown"],

                ["Country Code", country.codes?.alpha_3 ?? "Unknown"],
              ].map(([label, value], index) => (
                <div
                  key={index}
                  className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dbe1e6] py-4 items-center gap-16"
                >
                  <p className="text-[#617789] dark:text-[#9ba2a8] text-sm">
                    {label}
                  </p>

                  <p className="text-[#111518] dark:text-[#ffffffb3] text-sm">
                    {value}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CountryDetailsPage;
