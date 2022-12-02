import { withApi } from "../../hoc/withApi";
import ProductDetails from "../../components/Product";
import { selectProduct, actionGetProduct, actionReloadProduct } from "./orderSlice";

export default function productFactory({ itemID }) {
  //console.log('productFactory', itemID);
  return withApi({
    WrappedComponent: ProductDetails,
    selector: selectProduct,
    actions: {
      load: actionGetProduct,
      reload: actionReloadProduct
    },
    itemID
  });
};