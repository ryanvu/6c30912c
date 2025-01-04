import React, { useEffect, useRef, useState } from 'react';

const StickyActionBar = ({ children }) => {
  const containerRef = useRef(null);
  const [mainHeaderHeight, setMainHeaderHeight] = useState(0);
  
  useEffect(() => {
    if (containerRef.current) {

      const element = containerRef.current;
      const container = element.closest('.container');
      const mainHeader = container.querySelector('header');
      
      const updatePositions = () => {
        const headerHeight = mainHeader.offsetHeight;
        setMainHeaderHeight(headerHeight);
      };
      
      updatePositions();
      window.addEventListener('resize', updatePositions);
      return () => window.removeEventListener('resize', updatePositions);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white -mx-4 p-4"
      style={{
        position: 'sticky',
        top: mainHeaderHeight,
        zIndex: 100
      }}
    >
      {children}
    </div>
  );
};

export default StickyActionBar;