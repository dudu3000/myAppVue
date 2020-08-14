import Vue from 'vue'
import Vuex from 'vuex'





Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: 'undefined',
    page: 'home',
    errorCode: 0
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
    },
    updateErrorCode (state, code){
      return state.errorCode = code;
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
    },
    updateErrorCode (context, code){
      context.commit('updateErrorCode', code);
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