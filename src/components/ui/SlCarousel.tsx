import React, { useState, useEffect } from 'react';

interface SlCarouselProps {
  children: React.ReactNode;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  mouseDragging?: boolean;
  scrolling?: boolean;
}

const SlCarousel: React.FC<SlCarouselProps> = ({ children, className, autoplay }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = React.Children.toArray(children);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoplay, slides.length]);

  return (
    <div className={className}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {slide}
        </div>
      ))}
    </div>
  );
};

export default SlCarousel;
