"use client";

import { Input } from "@/components/ui/input";
import { Search, Loader } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
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
import CountryCard from "./_components/country-card";
import { useRouter } from "next/navigation";

export default function Home() {
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const router = useRouter();

  const { data, isError, isLoading, error } = useCountries(
    regionFilter,
    searchTerm,
  );

  let countries = data;

  if (regionFilter && searchTerm) {
    countries = countries?.filter((country) => country.region === regionFilter);
  }

  const handleClick = (name: string) => {
    router.push(`/countries/${name.toLowerCase()}`);
  };

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

      {/* Country Cards */}
      <section className="md:grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] flex flex-col items-center gap-6 px-4 md:px-16 pb-10 w-full">
        {countries?.map((country) => (
          <CountryCard
            handleClick={handleClick}
            country={country}
            key={country.names.common}
          />
        ))}
      </section>
    </main>
  );
}
