import React from "react"
import CatalogItem from "./CatalogItem";
import Loader from "./Loader";
import LoadMore from "./LoadMore";

export default function CatalogList(props) {
  const handleLoadMore = (e) => {
    const { dispatch, loadMore } = props.actions;
    dispatch(loadMore({ count: props.loadMoreCount }));
    };

  return (
    <section className="catalog">
    <h2 className="text-center">Каталог</h2>
    { props.children }
    { props.data &&
      <>
        <div className="row">
          { props.data.map(item => <CatalogItem item={ item } key={ item.id } />) }  
        </div>
        { !props.isLoading && props.loadMoreCount && props.loadMoreCount === props.lastLoadedItemCount && <LoadMore onClick={ handleLoadMore } /> }
        <Loader isLoading={ props.isLoading } />
      </>
    }
  </section>
  );
};