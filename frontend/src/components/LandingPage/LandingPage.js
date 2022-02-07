import React from "react";
import Header from "./Header";
import SectionHero from "./SectionHero";
import SectionHow from "./SectionHow";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <SectionHero />
        <SectionHow />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
