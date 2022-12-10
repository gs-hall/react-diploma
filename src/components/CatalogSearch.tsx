import React from "react";
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore
import { selectSearchCatalog, setSearchCatalog, startSearchCatalog } from "../features/catalog/catalogSlice";

export default function CatalogSearch() {
  const dispatch = useDispatch();
  const search: string = useSelector(selectSearchCatalog);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(startSearchCatalog(e.currentTarget.value));
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={ handleSubmit }>
      <input
        type="search"
        name="search"
        className="form-control"
        placeholder="Поиск"
        value={ search }
        onChange={ (e) => dispatch(setSearchCatalog(e.target.value)) }
        />
    </form>
  );
};