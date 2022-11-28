import React from "react";
import Banner from "./Banner";

export default function Error({ title, message }) {
  if (!message) return null;
  return (
    <>
      <Banner />
      <section className="top-sales">
        <h2 className="text-center">{title || message}</h2>
        <p>{message}</p>
      </section>
    </>
  );
};