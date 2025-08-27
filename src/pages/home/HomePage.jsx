import React from "react";
import { useOutletContext } from "react-router-dom";
import CarouselMovies from "./components/carousel/CarouselMovies";
import PavilitonCluster from "./components/cluster/PavilitonCluster";
import MovieList from "./components/movie-list/MovieList";
import News from "./components/news/News";

export default function HomePage() {
  // receive refs provided by HomeLayout via Outlet context
  const { showTimeRef, cinemaRef, newsRef, appRef } = useOutletContext() || {};

  return (
    <div className="py-1 ">
      {/* Carousel / top section */}
      <div ref={appRef} id="lichchieu">
        <CarouselMovies />
      </div>

      {/* Movie list section */}
      <div ref={showTimeRef} id="cumrap">
        <MovieList />
      </div>

      {/* Pavilion / Cluster section */}
      <div ref={cinemaRef} id="tin-tuc">
        <PavilitonCluster />
      </div>

      {/* News section (app download area) */}
      <div ref={newsRef} id="app-section">
        <News />
      </div>
    </div>
  );
}
