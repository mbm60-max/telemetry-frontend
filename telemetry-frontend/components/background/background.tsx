import React from 'react';
import './background.css';

interface HomepageProps {
  children?: React.ReactNode;
}

const Homepage: React.FC<HomepageProps> = ({ children }) => {
  return (
    <div className="homepage-container">
      {children}
    </div>
  );
};

export default Homepage;
