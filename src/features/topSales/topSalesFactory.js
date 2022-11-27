import { withRedux } from "../../hoc/withRedux";
import TopSales from "../../components/TopSales";
import { selectTopSales, actionGetTopSales, actionReloadTopSales } from "./topSalesSlice";

export default function topSalesFactory() {
  return withRedux({
    WrappedComponent: TopSales,
    selector: selectTopSales,
    actions: {
      load: actionGetTopSales,
      reload: actionReloadTopSales
    }       
  });
};