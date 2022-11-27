import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectSearchCatalog, setSearchCatalog, startSearchCatalog } from "../features/catalog/catalogSlice";

const catalogLink = '/catalog';

export default function HeaderSearch() {
  const dispatch = useDispatch();
  const search = useSelector(selectSearchCatalog);
  const [isHidden, setIsHidden] = useState(true);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isHidden) {
      inputRef.current.focus();
    }
  }, [isHidden]);

  // expand search
  const handleClick = (e) => {
    inputRef.current.focus();
    setIsHidden(!isHidden);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    if (searchText === '') { // user entered nothing
      setIsHidden(true);
    } else { // start search
    navigate(catalogLink);
    dispatch(startSearchCatalog());
    };
  };

  return (
    <>
      <div id="search-expander" className="header-controls-pic header-controls-search" onClick = { handleClick } />
      <form
        id="search-form"
        className={ classNames("header-controls-search-form", "form-inline", { "invisible": isHidden }) }
        onSubmit={ handleSubmit }
        >
        <input
          className="form-control"
          placeholder="Поиск"
          ref={ inputRef }
          name="search"
          value={ search }
          onChange={ (e) => dispatch(setSearchCatalog(e.target.value)) }
          />
      </form>
    </>
  );
};