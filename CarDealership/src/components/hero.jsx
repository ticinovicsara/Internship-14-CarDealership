import React, { useEffect, useRef } from "react";
import "../styles/hero.css";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  return (
    <div ref={heroRef} className="hero" id="home">
      <div className="overlay"></div>
      <h1 className="hero-title">Welcome to the Dealership</h1>
    </div>
  );
};

export default Hero;
