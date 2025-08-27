import BackToTop from "components/backtotop/BackToTop";
import React, { useEffect, useRef } from "react";

import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

import "./index.scss";

export default function HomeLayout() {
  const showTimeRef = useRef(null);
  const cinemaRef = useRef(null);
  const newsRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollIntoShowTimesRef = () => {
    if (showTimeRef.current) {
      showTimeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollIntoCinemasRef = () => {
    if (cinemaRef.current) {
      cinemaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollIntoNewsRef = () => {
    if (newsRef.current) {
      newsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollIntoAppRef = () => {
    if (appRef.current) {
      appRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header
        scrollIntoShowTimesRef={scrollIntoShowTimesRef}
        scrollIntoCinemasRef={scrollIntoCinemasRef}
        scrollIntoNewsRef={scrollIntoNewsRef}
        scrollIntoAppRef={scrollIntoAppRef}
      />
      {/* provide refs to pages rendered in the Outlet so they can attach DOM nodes */}
      <Outlet context={{ showTimeRef, cinemaRef, newsRef, appRef }} />
      <Footer />
      <BackToTop />
    </>
  );
}
