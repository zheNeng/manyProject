import Vue from "vue";
import Vuex from "vuex";
import { checkDefault } from "=_=/util";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    joinAct: {},
    clerk: {}
  },
  mutations: {
    setJoinAct(state, joinAct) {
      state.joinAct = joinAct;
      sessionStorage.setItem("userId", joinAct.userId);
      sessionStorage.setItem("joinAct", JSON.stringify(state.joinAct));
    }
  },
  getters: {
    getJoinAct(state) {
      if (checkDefault(state.joinAct)) {
        state.joinAct = JSON.parse(sessionStorage.getItem("joinAct")) || {};
      }
      return state.joinAct;
    }
  }
});
