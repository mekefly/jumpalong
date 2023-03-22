import { Directive } from "vue";
const HesitantClick: Directive<HTMLElement> = {
  created(el, binding) {
    let cancel = false;
    useEventListener(el, "mousedown", (e) => {
      cancel = false;
    });
    useEventListener(el, "mouseup", (e) => {
      if (cancel) {
        return;
      }
      binding.value(e);
    });
    useEventListener(el, "mousemove", () => {
      cancel = true;
    });
  },
};
export default HesitantClick;
