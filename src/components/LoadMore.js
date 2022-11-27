import React from "react";

export default function LoadMore({ onClick }) {
  if (!onClick) return;
  return (
    <div className="text-center">
      <button className="btn btn-outline-primary" onClick={onClick} >Загрузить ещё</button>
    </div>
  );
};