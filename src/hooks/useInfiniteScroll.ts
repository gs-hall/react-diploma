import { useEffect, useState } from "react";
import { useGetCatalogQuery } from "../app/services/shopApi";
import { catalogItems } from "../types/types";

const mergeData = (a: catalogItems, b: catalogItems) => {
  const ids = new Set(a.map(x => x.id));
  const n = b.filter(x => !ids.has(x.id));
  return a.concat(n);
};

interface useInfiniteScrollProps {
  offset: number
};

export default function useCatalogInfiniteScroll({offset}: useInfiniteScrollProps) {
  const [combinedData, setCombinedData] = useState<catalogItems>([]);

  const { data, ...rest } = useGetCatalogQuery({offset});
  const lastLoadedItemCount = data?.length;

  useEffect(() => {
    if (data){
      if (offset === 0) {
        setCombinedData(data);
      } else {
        setCombinedData((prevData) => mergeData(prevData, data));
      };
    };
  }, [data, offset]);

  return {data: combinedData, lastLoadedItemCount, ...rest};
};