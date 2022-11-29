import { withApi } from "../../hoc/withApi";
import TopSales from "../../components/TopSales";
import { selectTopSales, actionGetTopSales, actionReloadTopSales } from "./topSalesSlice";

export default function topSalesFactory() {
  return withApi({
    WrappedComponent: TopSales,
    selector: selectTopSales,
    actions: {
      load: actionGetTopSales,
      reload: actionReloadTopSales
    }
  });
};