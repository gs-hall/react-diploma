import React from 'react';

export default function Loader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="preloader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};