// import FilmDetail from "@/src/components/FilmDetail";
import NewUpdate from "@/src/components/NewUpdate";
import Header from "@/src/components/Header";
import "./globals.css";
import Container from "@/src/components/Container";
import SingleMovie from "@/src/components/SingleMovie";
import SeriesMovies from "@/src/components/SeriesMovie";
import Cartoon from "@/src/components/Cartoon";
import TVShows from "@/src/components/TVShows";

export default function Home() {
  return (
    <>
        <NewUpdate />
        <SingleMovie />
        <SeriesMovies />
        <Cartoon />
        <TVShows />
    </>
  );
}
