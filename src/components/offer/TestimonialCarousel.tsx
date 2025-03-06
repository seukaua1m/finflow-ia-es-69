
import React, { useState, useEffect } from 'react';

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

  // Auto-rotate testimonials
  useEffect(() => {
    const autoRotateInterval = setInterval(() => {
      nextImage();
    }, 4000); // Change testimonial every 4 seconds
    
    return () => clearInterval(autoRotateInterval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto my-8 relative">
      <div className="overflow-hidden rounded-lg shadow-md">
        {testimonialImages.map((testimonial, index) => (
          <div 
            key={testimonial.id}
            className={`absolute w-full transition-opacity duration-1000 ease-in-out ${
              currentImage === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img 
              src={testimonial.image} 
              alt={`Depoimento ${index + 1}`} 
              className="w-full h-auto object-contain" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
