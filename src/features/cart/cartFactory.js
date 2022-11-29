import { withLocalStorage } from "../../hoc/withLocalStorage";
import { selectCartData, setCartData, localStorageCartKey, getCartAsArray } from "./cartSlice";

export default function cartFactory({ WrappedComponent }) {
  return withLocalStorage({
    WrappedComponent,
    selector: selectCartData,
    actions: {
      setData: setCartData,
    },
    localStorageKey: localStorageCartKey,
    dataTransformationFunction: getCartAsArray
  });
};