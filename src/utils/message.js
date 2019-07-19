import Vue from "vue";
import ElmMessage from "../components/Message";

const Message = Vue.extend(ElmMessage);

const message = function(msg) {
  const messageEl = new Message();
  messageEl.message = msg;
  document.body.appendChild(messageEl.$mount().$el);
  setTimeout(function() {
    document.body.removeChild(messageEl.$mount().$el);
  }, 3000);
};
export default message;
