
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
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Function to navigate to the next image
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % testimonialImages.length);
  };

  // Preload images for faster loading
  useEffect(() => {
    testimonialImages.forEach((testimonial, index) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, testimonial.id]));
      };
      img.src = testimonial.image;
    });
  }, [testimonialImages]);

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
            {loadedImages.has(testimonial.id) ? (
              <img 
                src={testimonial.image} 
                alt={`Depoimento ${testimonial.id}`} 
                className="w-full h-[270px] object-contain" 
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="w-full h-[270px] bg-gray-200 animate-pulse flex items-center justify-center">
                <span className="text-gray-400">Cargando...</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
