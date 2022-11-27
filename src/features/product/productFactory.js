import { withRedux } from "../../hoc/withRedux";
import ProductDetails from "../../components/Product";
import { selectProduct, actionGetProduct, actionReloadProduct } from "./productSlice";

export default function productFactory({ itemID }) {
  console.log('productFactory', itemID);
  return withRedux({
    WrappedComponent: ProductDetails,
    selector: selectProduct,
    actions: {
      load: actionGetProduct,
      reload: actionReloadProduct
    },
    itemID
  });
};