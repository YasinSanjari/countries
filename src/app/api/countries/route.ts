import { NextResponse } from "next/server";

const BASE_URL = "https://api.restcountries.com/countries/v5";

export async function GET(req: Request) {
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { message: "API_KEY is missing" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);

    const region = searchParams.get("region");
    const search = searchParams.get("search");
    const country = searchParams.get("country");
    const fields = searchParams.get("fields");

    let url = "";

    // country details
    if (country) {
      url = `${BASE_URL}/names.common/${encodeURIComponent(country)}`;
    }
    // search
    else if (search) {
      url = `${BASE_URL}/name?q=${encodeURIComponent(search)}`;
    }
    // all countries
    else {
      url = BASE_URL;
    }

    const apiUrl = new URL(url);

    // region filter
    if (region) {
      apiUrl.searchParams.set("region", region);
    }

    if (fields) {
      apiUrl.searchParams.set("response_fields", fields);
    }

    const response = await fetch(apiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      cache: "no-store",
    });

    const data = await response.json();

    console.log(apiUrl.toString());

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}