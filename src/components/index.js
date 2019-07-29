import ElmHeader from "./Header";
import ElmNav from "./Nav";
import ElmIcon from "./Icon";
import ElmScrollView from "./ScrollView";
import ElmDot from "./Dot";
import ElmSelect from "./Select";
import ElmSwipeCell from "./SwipeCell";

export default function(Vue) {
  Vue.component(ElmHeader.name, ElmHeader);
  Vue.component(ElmNav.name, ElmNav);
  Vue.component(ElmIcon.name, ElmIcon);
  Vue.component(ElmScrollView.name, ElmScrollView);
  Vue.component(ElmDot.name, ElmDot);
  Vue.component(ElmSelect.name, ElmSelect);
  Vue.component(ElmSwipeCell.name, ElmSwipeCell);
}
