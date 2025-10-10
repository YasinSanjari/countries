"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Loader } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { useCountries } from "@/hooks/use-countries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isError, isLoading, error } = useCountries(regionFilter, searchTerm);
  let countries = data;

  const router = useRouter();

  const handleClick = (name: string) => {
    router.push(`/countries/${name.toLowerCase()}`);
  };

  if (regionFilter && searchTerm) {
    countries = countries?.filter((country) => country.region === regionFilter);
  }

  // console.log(JSON.stringify(error));

  
  
//   if (isError && error.response?.status === 404) {
//   return <p>کشوری با این نام پیدا نشد 😕</p>;
// }


  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-black font-sans w-full mx-auto items-center">
      {/* Search & Filter */}
      <section className="px-4 md:px-16 py-6 flex flex-col gap-4 md:self-start md:w-full">
        <div className="relative flex items-center gap-3">
          <Search
            className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-800"
            size={18}
          />
          <Input
            placeholder="Search for a country..."
            className="pl-10 bg-gray-100 dark:text-white border-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ModeToggle />
        </div>
        <div className="w-48">
          <Select
            onValueChange={(value) => setRegionFilter(value)}
            value={regionFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Regions</SelectLabel>
                <SelectItem value="Africa">Africa</SelectItem>
                <SelectItem value="Americas">Americas</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="Oceania">Oceania</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Country Cards */}
      {isLoading && <Loader className="animate-spin w-12 h-12 my-auto" />}
      {isError && error.response?.status === 404 && (
        <p className="w-full text-center h-full my-auto text-2xl">
          No country found.
        </p>
      )}
            {isError && error.response?.status !== 404 && (
        <p className="w-full text-center h-full my-auto text-2xl">
          Something went wrong.
        </p>
      )}
      <section className="md:grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] flex flex-col items-center gap-6 px-4 md:px-16 pb-10 w-full">
        {countries?.map((country) => (
          <Card
            key={country.name.common}
            className="overflow-hidden rounded-2xl p-4 max-w-[350px] w-[300px] md:w-auto cursor-pointer hover:scale-[1.05] transition-transform justify-center bg-gray-100 dark:bg-[#171717]"
            onClick={() => handleClick(country.name.common)}
          >
            <CardHeader className="relative aspect-square w-full">
              <Image
                src={country.flags.svg}
                alt={country.name.common}
                fill
                className="object-contain object-center rounded-2xl scale-85"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
              />
            </CardHeader>
            <CardContent className="text-center text-2xl">
              <p className="font-medium text-[#111518] dark:text-white">
                {country.name.common}
              </p>
              <p className="text-[#949ba1] text-lg">{country.capital[0]}</p>
              <p className="text-sm text-[#949ba1]">{country.region}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
