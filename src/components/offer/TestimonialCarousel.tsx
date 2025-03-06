
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
    <div className="w-full max-w-md mx-auto my-6 relative">
      <div className="overflow-hidden rounded-lg shadow-md h-64">
        <div 
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ 
            transform: `translateX(-${currentImage * 100}%)`,
            width: `${testimonialImages.length * 100}%` 
          }}
        >
          {testimonialImages.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="w-full flex-shrink-0 h-full flex items-center justify-center"
            >
              <img 
                src={testimonial.image} 
                alt={`Depoimento ${testimonial.id}`} 
                className="max-w-full max-h-full object-contain" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
