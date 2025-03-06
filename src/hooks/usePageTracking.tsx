
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/services/analyticsService';

export function usePageTracking() {
  const location = useLocation();
  
  useEffect(() => {
    // Only track page views on the index page (home route)
    if (location.pathname === '/') {
      // Track page view on component mount or route change
      trackPageView(location.pathname);
      
      // Track the time spent on the page
      const startTime = new Date();
      
      return () => {
        // Calculate time spent on page in seconds when component unmounts
        const endTime = new Date();
        const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
        
        // Update the page view with duration
        if (duration > 0) {
          console.log(`User spent ${duration} seconds on ${location.pathname}`);
          // We could also update the duration in the database here if needed
        }
      };
    }
    
    return undefined; // Return empty cleanup for non-index pages
  }, [location.pathname]);
}
