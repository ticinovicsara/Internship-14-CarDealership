import React, { useEffect, useRef, useState } from "react";
import "../styles/hero.css";

const Hero = () => {
  const heroRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(false);
          setTimeout(() => setAnimate(true), 50);

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
    <div ref={heroRef} className={`hero ${animate ? "animate" : ""}`} id="home">
      <div className="overlay"></div>
      <h1 className="hero-title">Welcome to the Dealership</h1>
    </div>
  );
};

export default Hero;
