import React, { useState } from "react"
import { useGetCategoryListQuery, categoryAllOption } from "../app/services/shopApi";
import CategoryItem from "./CategoryItem";
import Error from "./Error";

export default function CategoryList() {
  const [activeItemID, setActiveItemID] = useState(categoryAllOption.id);
  const { data, error, isLoading, refetch } = useGetCategoryListQuery();
  if (data === null) return;

  return (
    <>
      { error && <Error message="Ошибка получения категорий" refetch={refetch} isLoading={isLoading} /> }
      <ul className="catalog-categories nav justify-content-center">
        {data?.map(item =>
          <CategoryItem
            title={ item?.title }
            key={ item.id }
            isActive={ item.id === activeItemID }
            onClick={ () => setActiveItemID(item.id) }
            />
        )}
      </ul>
    </>
  );
};