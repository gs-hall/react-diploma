import React, { useState } from "react"
import { useGetCatalogQuery } from "../app/services/shopApi";
//import useInfiniteScroll from "../hooks/useInfiniteScroll";
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
  const [offset, setOffset] = useState(0);
  //const [combinedData, setCombinedData] = useState<catalogItems>([]);
  const loadMoreCount = 6;
  const { data, error, isLoading, refetch } = useInfiniteScroll({
    useQuery: useGetCatalogQuery,
    loadMoreCount: 6,
    offset });

  //const { data, error, isLoading, refetch } = useGetCatalogQuery({offset});

  /*
  useEffect(() => {
    if (data){
      if (offset === 0) {
        setCombinedData(data);
      } else {
        setCombinedData((prevData) => mergeData(prevData, data));
      };
    };
  }, [data, offset]);
  */
  //const combinedData = useInfiniteScroll({ useQuery: useGetCatalogQuery, currentData: data, loadMoreCount, offset });
  //console.log(combinedData);


  const handleLoadMore = (e: React.MouseEvent) => {
    setOffset(prevOffset => (prevOffset + loadMoreCount));
    console.log('handleLoadMore, offset=', offset);
    //dispatch(loadMore({ count: props.loadMoreCount }));
  };

  const lastLoadedItemCount = 6;


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
        { !isLoading && loadMoreCount && loadMoreCount === lastLoadedItemCount && <LoadMore onClick={handleLoadMore} /> }
        <Loader isLoading={isLoading} />
      </>
    }
  </section>
  );
};