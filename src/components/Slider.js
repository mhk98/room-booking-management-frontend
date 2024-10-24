"use client"
import { useState, useEffect } from 'react';
import economoy from "../../public/images/slider/economy_800x200.jpg"
import standard from "../../public/images/slider/standard_800x200.jpg"
import premimum from "../../public/images/slider/premimum_800x200.jpg"
import partner from "../../public/images/slider/partner_800x200.jpg"
import Image from 'next/image';
const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  // Automatically change slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide === 4 ? 1 : prevSlide + 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="carousel w-full">
      <div id="slide1" className={`carousel-item relative w-full ${activeSlide === 1 ? 'block' : 'hidden'}`}>
        <Image
          src={economoy}
          alt='economoy'
          className="w-full"
        />
        {/* <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle" onClick={() => setActiveSlide(4)}>❮</a>
          <a href="#slide2" className="btn btn-circle" onClick={() => setActiveSlide(2)}>❯</a>
        </div> */}
      </div>
      <div id="slide2" className={`carousel-item relative w-full ${activeSlide === 2 ? 'block' : 'hidden'}`}>
      <Image
          src={standard}
          alt='standard'
          className="w-full"
        />
        {/* <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle" onClick={() => setActiveSlide(1)}>❮</a>
          <a href="#slide3" className="btn btn-circle" onClick={() => setActiveSlide(3)}>❯</a>
        </div> */}
      </div>
      <div id="slide3" className={`carousel-item relative w-full ${activeSlide === 3 ? 'block' : 'hidden'}`}>
      <Image
          src={premimum}
          alt='premimum'
          className="w-full"
        />
        {/* <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle" onClick={() => setActiveSlide(2)}>❮</a>
          <a href="#slide4" className="btn btn-circle" onClick={() => setActiveSlide(4)}>❯</a>
        </div> */}
      </div>
      <div id="slide4" className={`carousel-item relative w-full ${activeSlide === 4 ? 'block' : 'hidden'}`}>
      <Image
          src={partner}
          alt='partner'
          className="w-full"
        />
        {/* <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle" onClick={() => setActiveSlide(3)}>❮</a>
          <a href="#slide1" className="btn btn-circle" onClick={() => setActiveSlide(1)}>❯</a>
        </div> */}
      </div>
    </div>
  );
};

export default Slider;
