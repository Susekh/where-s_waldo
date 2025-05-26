import React from 'react';

const SlCarouselItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="w-full h-full">{children}</div>;
};

export default SlCarouselItem;
