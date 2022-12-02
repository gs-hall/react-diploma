import React from 'react';

export default function Loader({ isLoading = true }) {
  if (!isLoading) return null;
  //console.log('Loader');
  return (
    <div className="preloader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};