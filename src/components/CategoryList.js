import React from "react"
import CategoryItem from "./CategoryItem";

export default function CategoryList(props) {
  const { data, activeItemID, actions } = props;
  if (data === null) return;
  //console.log('CategoryList', props);
  return (
    <ul className="catalog-categories nav justify-content-center">
      {data?.map(item =>
        <CategoryItem
          item={ item }
          key={ item.id }
          isActive={ item.id === activeItemID }
          onClick={ () => actions.dispatch(actions.setActive({ activeItemID: item.id })) }
          />
      )}
    </ul>
  );
};