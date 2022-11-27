import { withRedux } from "../../hoc/withRedux";
import CatalogList from "../../components/CatalogList";
import { selectCatalog, actionGetCatalog, actionReloadCatalog, actionLoadMoreCatalog } from "./catalogSlice";

export default function catalogFactory() {
  return withRedux({
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