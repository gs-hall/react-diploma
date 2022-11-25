import React from "react"
import CategoryItem from "./CategoryItem";

export default function CategoryList({ data, activeItemID, dispatch, setActiveAction }) {
  if (data === null) return;
  return (
    <ul className="catalog-categories nav justify-content-center">
      {data?.map(item => <CategoryItem item={ item } key={ item.id } isActive={ item.id === activeItemID } onClick={ () => dispatch(setActiveAction(item.id)) } /> )}
    </ul>  
  );
};