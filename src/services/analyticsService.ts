
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

// Create or get a user session ID
const getUserSessionId = (): string => {
  let sessionId = localStorage.getItem('user_session_id');
  
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('user_session_id', sessionId);
  }
  
  return sessionId;
};

// Track page view
export const trackPageView = async (pagePath: string, componentName?: string) => {
  try {
    const userSessionId = getUserSessionId();
    
    await supabase
      .from('page_views')
      .insert({
        page_path: pagePath,
        component_name: componentName,
        user_session_id: userSessionId
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
    const userSessionId = getUserSessionId();
    
    await supabase
      .from('user_inputs')
      .insert({
        input_value: inputValue,
        component_name: componentName,
        user_session_id: userSessionId
      });
      
    return true;
  } catch (error) {
    console.error('Error tracking user input:', error);
    return false;
  }
};

// Track component interaction
export const trackComponentInteraction = async (componentName: string, interactionType: string) => {
  try {
    const userSessionId = getUserSessionId();
    
    await supabase
      .from('component_interactions')
      .insert({
        component_name: componentName,
        interaction_type: interactionType,
        user_session_id: userSessionId
      });
      
    return true;
  } catch (error) {
    console.error('Error tracking component interaction:', error);
    return false;
  }
};
