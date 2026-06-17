"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Country } from "@/types/countries";
import Image from "next/image";

const CountryCard = ({
  country,
  handleClick,
}: {
  country: Country;
  handleClick: (countryName: string) => void;
}) => {
  return (
    <Card
      className="overflow-hidden rounded-2xl p-4 max-w-[350px] w-[300px] md:w-auto cursor-pointer hover:scale-[1.05] transition-transform justify-center bg-gray-100 dark:bg-[#171717]"
      onClick={() => handleClick(country.names.common)}
    >
      <CardHeader className="relative aspect-square w-full">
        <Image
          src={`https://flags.restcountries.com/v5/w320/${country.codes?.alpha_2?.toLocaleLowerCase()}.png`}
          alt={country.names.common}
          fill
          className="object-contain object-center rounded-2xl scale-85"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </CardHeader>

      <CardContent className="text-center text-2xl">
        <p className="font-medium text-[#111518] dark:text-white">
          {country.names.common}
        </p>

        <p className="text-[#949ba1] text-lg">
          {country.capitals?.[0]?.name ?? "No capital"}
        </p>

        <p className="text-sm text-[#949ba1]">{country.region}</p>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
