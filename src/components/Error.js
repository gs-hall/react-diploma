import React from "react";

export default function Error({ error, onRetry }) {
  if (!error) return null;

  return (
    <div className="error">
      <span>Произошла ошибка</span>
      <button className="button" onClick={onRetry} >Повторить запрос</button>
    </div>
  );
};