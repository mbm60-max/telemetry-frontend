import React from 'react';
import './background.css';

interface HomepageProps {
  children?: React.ReactNode;
  style?:string;
}

const Homepage: React.FC<HomepageProps> = ({ children,style }) => {
  return (
    <div className={style}>
      {children}
    </div>
  );
};

export default Homepage;
