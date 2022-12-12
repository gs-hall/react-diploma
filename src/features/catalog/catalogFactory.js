import { withApi } from "../../hoc/withApi";
import CatalogList from "../../components/Catalog";
import { selectCatalog, actionGetCatalog, actionReloadCatalog, actionLoadMoreCatalog } from "./catalogSlice";

export default function catalogFactory() {
  return withApi({
    WrappedComponent: CatalogList,
    selector: selectCatalog,
    actions: {
      load: actionGetCatalog,
      reload: actionReloadCatalog,
      loadMore: actionLoadMoreCatalog
    },
    loadMoreCount: 6
  });
};