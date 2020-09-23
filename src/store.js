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
    editState: false,
    similarUser: '',
    refreshPage: 'home'
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
    },
    updateSimilarUser (state, similarUser){
      return state.similarUser = similarUser;
    },
    updateRefreshPage (state, refreshPage){
      return state.refreshPage = refreshPage;
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
    },
    updateSimilarUser (context, similarUser){
      context.commit('updateSimilarUser', similarUser);
    },
    updateRefreshPage (context, refreshPage){
      context.commit('updateRefreshPage', refreshPage);
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