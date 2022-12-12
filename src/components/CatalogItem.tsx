// Represents an element in catalog list

import React from "react";
import { Link } from "react-router-dom";
import { catalogItem } from "../types/types";

interface CatalogItemProps {
  item: catalogItem;
};

export default function CatalogItem({ item }: CatalogItemProps) {
  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img
          src={item.images[0]}
          className="card-img-top img-fluid"
          alt={item.title}
          />
        <div className="card-body">
          <p className="card-text">{item.title}</p>
          <p className="card-text">{item.price} руб.</p>
          <Link to={`/products/${item.id}`} className="btn btn-outline-primary">Заказать</Link>
        </div>
      </div>
    </div>
  );
};