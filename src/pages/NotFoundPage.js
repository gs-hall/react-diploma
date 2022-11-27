import React from "react";
import Error from "../components/Error";

export default function NotFoundPage() {
  return (
    <Error title="Страница не найдена" message="Извините, такая страница не найдена!" />
  );
};