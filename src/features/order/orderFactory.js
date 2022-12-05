import { withLocalStorage } from "../../hoc/withLocalStorage";
import Order from "../../components/Order";
import { localStorageOrderKey, selectOrderData, setOrderData } from "./orderSlice";

export default function orderFactory() {
  return withLocalStorage({
    WrappedComponent: Order,
    selector: selectOrderData,
    actions: {
      setData: setOrderData
    },
    localStorageKey: localStorageOrderKey
  });
};