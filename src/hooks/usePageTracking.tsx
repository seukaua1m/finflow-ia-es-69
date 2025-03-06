
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/services/analyticsService';

export function usePageTracking() {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view on component mount or route change
    trackPageView(location.pathname);
    
    // Track the time spent on the page
    const startTime = new Date();
    
    return () => {
      // Calculate time spent on page in seconds when component unmounts
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
      
      // We could also track duration here if needed
      // console.log(`User spent ${duration} seconds on ${location.pathname}`);
    };
  }, [location.pathname]);
}
