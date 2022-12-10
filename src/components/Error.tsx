import React from "react";
import Banner from "./Banner";

interface ErrorProps {
  title: string;
  message: string;
};

export default function Error({ title, message }: ErrorProps) {
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