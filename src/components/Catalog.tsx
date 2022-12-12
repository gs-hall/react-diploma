import React, { useState } from "react"
import CatalogItem from "./CatalogItem";
import Error from "./Error";
import Loader from "./Loader";
import LoadMore from "./LoadMore";
import { catalogItem } from "../types/types";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

interface CatalogProps {
  children: React.ReactNode
};

export default function Catalog({ children }: CatalogProps) {
  const loadMoreCount = 6;
  const [offset, setOffset] = useState(0);
  const { data, error, isLoading, isFetching, refetch, lastLoadedItemCount } = useInfiniteScroll({ offset });

  return (
    <section className="catalog">
    <h2 className="text-center">Каталог</h2>
    { error && <Error message="Ошибка получения каталога" refetch={refetch} isLoading={isLoading} /> }
    { children }
    { data &&
      <>
        <div className="row">
          { data?.map((item:catalogItem) => <CatalogItem item={item} key={item.id} />) }
        </div>
        { !isFetching && loadMoreCount && loadMoreCount === lastLoadedItemCount && <LoadMore onClick={() => setOffset(prevOffset => (prevOffset + loadMoreCount))} /> }
        <Loader isLoading={isFetching} />
      </>
    }
  </section>
  );
};