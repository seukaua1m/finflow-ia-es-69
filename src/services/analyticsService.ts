
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

// Create or get a session ID (not user-specific, just for tracking the session)
const getSessionId = (): string => {
  let sessionId = localStorage.getItem('session_id');
  
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('session_id', sessionId);
  }
  
  return sessionId;
};

// Track page view with country data
export const trackPageView = async (pagePath: string, componentName?: string) => {
  try {
    const sessionId = getSessionId();
    
    // Get country information if available
    let country = localStorage.getItem('visitor_country') || 'Unknown';
    
    // Try to get country from IP using a free API if we don't have it yet
    if (country === 'Unknown') {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.country_name) {
          country = data.country_name;
          localStorage.setItem('visitor_country', country);
        }
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    }
    
    await supabase
      .from('page_views')
      .insert({
        page_path: pagePath,
        component_name: componentName,
        user_session_id: sessionId,
        country: country
      });
      
    return true;
  } catch (error) {
    console.error('Error tracking page view:', error);
    return false;
  }
};

// Track user input
export const trackUserInput = async (inputValue: string, componentName: string) => {
  try {
    const sessionId = getSessionId();
    
    await supabase
      .from('user_inputs')
      .insert({
        input_value: inputValue,
        component_name: componentName,
        user_session_id: sessionId
      });
      
    return true;
  } catch (error) {
    console.error('Error tracking user input:', error);
    return false;
  }
};

// Track funnel step completion
export const trackComponentInteraction = async (componentName: string, interactionType: string) => {
  try {
    const sessionId = getSessionId();
    
    await supabase
      .from('component_interactions')
      .insert({
        component_name: componentName,
        interaction_type: interactionType,
        user_session_id: sessionId,
        // Timestamp will be added automatically by Supabase
      });
      
    return true;
  } catch (error) {
    console.error('Error tracking component interaction:', error);
    return false;
  }
};

// Get current funnel step progress (1-4)
export const getCurrentFunnelStep = (): number => {
  return parseInt(localStorage.getItem('current_funnel_step') || '1');
};

// Save current funnel step progress
export const saveFunnelStep = (step: number): void => {
  localStorage.setItem('current_funnel_step', step.toString());
};
