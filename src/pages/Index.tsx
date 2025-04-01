
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This file just redirects to the HomePage
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);
  
  return null;
};

export default Index;
