
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

  // Auto-rotate testimonials with updated interval time
  useEffect(() => {
    const autoRotateInterval = setInterval(() => {
      nextImage();
    }, 3000); // Change testimonial every 3 seconds
    
    return () => clearInterval(autoRotateInterval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto my-8 relative overflow-hidden">
      <div className="flex transition-transform duration-1000 ease-in-out" 
           style={{ transform: `translateX(-${currentImage * 100}%)` }}>
        {testimonialImages.map((testimonial) => (
          <div 
            key={testimonial.id}
            className="w-full flex-shrink-0"
          >
            <img 
              src={testimonial.image} 
              alt={`Depoimento ${testimonial.id}`} 
              className="w-full h-[270px] object-contain" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
