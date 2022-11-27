import React from "react";
import Error from "../components/Error";

export default function NoProduct() {
  return (
    <Error title="Продукт не найден" message="Извините, нет такого продукта!" />
  );
};