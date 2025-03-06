
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Testimonial {
  id: number;
  image: string;
  name: string;
  username: string;
  text: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Function to navigate to the next testimonial
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  // Function to navigate to the previous testimonial
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const autoRotateInterval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change testimonial every 5 seconds
    
    return () => clearInterval(autoRotateInterval);
  }, []);

  return (
    <div className="w-full max-w-lg border border-gray-200 rounded-lg p-4 mb-8 relative overflow-hidden">
      <div className="flex items-start">
        <img 
          src={testimonials[currentTestimonial].image} 
          alt={`${testimonials[currentTestimonial].name} profile`} 
          className="w-12 h-12 rounded-full mr-3 object-cover" 
        />
        <div>
          <p className="font-bold text-gray-800">
            {testimonials[currentTestimonial].name} 
            <span className="font-normal text-gray-500"> {testimonials[currentTestimonial].username}</span>
          </p>
          <p className="text-gray-800">
            {testimonials[currentTestimonial].text}
          </p>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={prevTestimonial}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={16} />
      </button>
      <button 
        onClick={nextTestimonial}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
        aria-label="Next testimonial"
      >
        <ChevronRight size={16} />
      </button>
      
      {/* Dots navigation */}
      <div className="flex justify-center gap-1 mt-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`h-2 rounded-full ${
              currentTestimonial === index ? "w-4 bg-[#FFA35B]" : "w-2 bg-gray-300"
            } transition-all duration-300`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
