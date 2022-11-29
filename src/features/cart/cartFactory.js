import { withLocalStorage } from "../../hoc/withLocalStorage";
import { selectCartData, setCartData, localStorageCartKey, getCartAsArray, deleteFromCart } from "./cartSlice";

export default function cartFactory(WrappedComponent) {
  return withLocalStorage({
    WrappedComponent,
    selector: selectCartData,
    actions: {
      setData: setCartData,
      deleteItem: deleteFromCart
    },
    localStorageKey: localStorageCartKey,
    dataTransformationFunction: getCartAsArray
  });
};