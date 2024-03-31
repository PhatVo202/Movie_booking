import React from "react";
import CarouselMovies from "./components/carousel/CarouselMovies";
import PavilitonCluster from "./components/cluster/PavilitonCluster";
import MovieList from "./components/movie-list/MovieList";
import News from "./components/news/News";

export default function HomePage() {
  return (
    <div className="py-2 " style={{ backgroundColor: "#111" }}>
      <CarouselMovies />
      <MovieList className="mt-2" />
      <PavilitonCluster />
      <News />
    </div>
  );
}
