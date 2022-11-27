import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchCatalog, setSearchCatalog, startSearchCatalog } from "../features/catalog/catalogSlice";

export default function CatalogSearch() {
  const dispatch = useDispatch();
  const search = useSelector(selectSearchCatalog);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit', e.target.search.value);
    dispatch(startSearchCatalog(e.target.search.value));
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