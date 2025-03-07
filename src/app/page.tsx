import WeatherDashboard from "@/components/WeatherDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 md:text-4xl dark:text-gray-100">
          Simple Weather App
        </h1>
        <WeatherDashboard />
      </div>
    </main>
  );
}
