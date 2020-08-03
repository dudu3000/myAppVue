import Vue from 'vue'
import Vuex from 'vuex'





Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: 'undefined',
    page: 'home',
  },
  mutations: {
    addToken (state, token){
      return state.token = token;
    },
    deleteToken (state){
      return state.token = 'undefined';
    },
    goToPage (state, page){
      return state.page = page;
    }
  },
  actions: {
    addToken (context, token){
      context.commit('addToken', token);
    },
    deleteToken (context){
      context.commit('deleteToken');
    },
    goToPage (context, page){
      context.commit('goToPage', page);
    }
  },
  getters: {
    token: state => {
      return state.token;
    },
    page: state => {
      return state.page;
    }
  }
})