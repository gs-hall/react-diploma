import { withApi } from "../../hoc/withApi";
import CategoryList from "../../components/CategoryList";
import { selectCategory, actionGetCategory, actionReloadCategory, actionSetActiveCategory } from "./categorySlice";

export default function categoryListFactory() {
  return withApi({
    WrappedComponent: CategoryList,
    selector: selectCategory,
    actions: {
      load: actionGetCategory,
      reload: actionReloadCategory,
      setActive: actionSetActiveCategory
    }
  });
};