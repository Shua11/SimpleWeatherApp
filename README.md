# Simple Current Weather App

This is a weather app excercise. It can search for the current weather conditions by city name, zipcode, or coordinates.

It uses [OpenWeatherMap](https://openweathermap.org/api) API.

## Getting Started

First, make sure you have dependancies installed:

```bash
npm i
```

Update the ENV to use the correct enviorment variables:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=YOUR_API_KEY
```

Then, run the development server:

```bash
npm run dev
```

Fianlly, open [http://localhost:3000](http://localhost:3000) with your browser to see the result. If you have another service running on 3000 then you may need to double check what port the server is running on and switch to that.

## Additional info

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

The styles are using [TailwindV4](https://tailwindcss.com/), but it's relatively new, so the config options are using the v3 method.

The basic UI components are [shadcn/ui](https://ui.shadcn.com/).
