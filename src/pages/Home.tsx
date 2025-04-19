import React from "react";
import Hero from "../components/Homepage/Hero";
import Features from "../components/Homepage/Features";
import Footer from "../components/Homepage/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#00040f] to-[#020617] text-white">
      <main className="flex-grow">
        <section className="px-4 md:px-8 lg:px-16 py-12">
          <Hero />
        </section>

        <section className="px-4 md:px-8 lg:px-16 py-12 bg-[#0f172a]">
          <Features />
        </section>
      </main>

      <footer className="px-4 md:px-8 lg:px-16 py-8 bg-black">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
