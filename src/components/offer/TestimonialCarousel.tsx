
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface TestimonialImage {
  id: number;
  image: string;
}

interface TestimonialCarouselProps {
  testimonialImages: TestimonialImage[];
}

const TestimonialCarousel = ({ testimonialImages }: TestimonialCarouselProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  // Function to navigate to the next image
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % testimonialImages.length);
  };

  // Function to navigate to the previous image
  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? testimonialImages.length - 1 : prev - 1));
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const autoRotateInterval = setInterval(() => {
      nextImage();
    }, 5000); // Change testimonial every 5 seconds
    
    return () => clearInterval(autoRotateInterval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto my-8 relative">
      <div className="overflow-hidden rounded-lg shadow-md">
        <img 
          src={testimonialImages[currentImage].image} 
          alt={`Depoimento ${currentImage + 1}`} 
          className="w-full h-auto object-contain" 
        />
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        aria-label="Depoimento anterior"
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        aria-label="Próximo depoimento"
      >
        <ChevronRight size={20} />
      </button>
      
      {/* Dots navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonialImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-2 rounded-full ${
              currentImage === index ? "w-4 bg-[#FFA35B]" : "w-2 bg-gray-300"
            } transition-all duration-300`}
            aria-label={`Ir para depoimento ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
