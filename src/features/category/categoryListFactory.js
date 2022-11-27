import { withRedux } from "../../hoc/withRedux";
import CategoryList from "../../components/CategoryList";
import { selectCategory, actionGetCategory, actionReloadCategory, actionSetActiveCategory } from "./categorySlice";

export default function categoryListFactory() {
  return withRedux({
    WrappedComponent: CategoryList,
    selector: selectCategory,
    actions: {
      load: actionGetCategory,
      reload: actionReloadCategory,
      setActive: actionSetActiveCategory
    }
  });
};