// import FilmDetail from "@/src/components/FilmDetail";
import NewUpdate from "@/src/components/NewUpdate";
import "./globals.css";
import SingleMovie from "@/src/components/SingleMovie";
import SeriesMovies from "@/src/components/SeriesMovie";
import Cartoon from "@/src/components/Cartoon";
import TVShows from "@/src/components/TVShows";
import { CounterStoreProvider } from "@/src/providers/counter-store-provider";

export default function Home() {
  return (
    <CounterStoreProvider>
        <NewUpdate />
        <SingleMovie />
        <SeriesMovies />
        <Cartoon />
        <TVShows />
    </CounterStoreProvider>
  );
}
