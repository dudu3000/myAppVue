import Vue from 'vue'
import Vuex from 'vuex'





Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    server: 'localhost',
    token: 'undefined',
    page: 'home',
    errorCode: 0,
    idPostToBeDeleted: 0,
    editState: false
  },
  mutations: {
    addToken (state, token){
      return state.token = token;
    },
    deleteToken (state){
      return state.token = 'undefined';
    },
    goToPage (state, page){
      state.editState = false;
      return state.page = page;
    },
    updateErrorCode (state, code){
      return state.errorCode = code;
    },
    updateIdPostToBeDeleted (state, id){
      return state.idPostToBeDeleted = id;
    },
    updateeditState (state, data){
      return state.editState = data;
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
    },
    updateIdPostToBeDeleted (context, id){
      context.commit('updateIdPostToBeDeleted', id);
    },
    updateeditState (context, data){
      context.commit('updateeditState', data);
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