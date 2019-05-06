import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentComponent: 'login',
    enrollComponent: 'stageone',
    username: '',
    appLoading: false,
    dataOnLogin: {},
  },
  getters:{
    getCurrentComponent: state => {
      return state.currentComponent
    },
    getEnrollComponent: state => {
      return state.enrollComponent
    },
    getUsername: state => {
      return state.username
    },
    getAppLoading: state => {
      return state.appLoading
    },
    startAppLoading: state => {
      return state.appLoading = true
    },
    stopAppLoading: state => {
      return state.appLoading =false
    },
    getDataOnLogin: state => {
      return state.dataOnLogin
    },
  },
  mutations: {
    updateCurrentComponent: (state, payload)=>{
      state.currentComponent = payload
    },
    updateEnrollComponent: (state, payload)=>{
      state.enrollComponent = payload
    },
    updateUsername: (state, payload)=>{
      state.username = payload
    },
    updateAppLoading: (state, payload)=>{
      state.appLoading = payload
    },
    updateDataOnLogin: (state, payload)=>{
      state.dataOnLogin = payload
    },
  },
  actions: {
    updateCurrentComponent: ({ commit }, payload)=>{
      commit('updateCurrentComponent', payload)
    },
    updateEnrollComponent: ({ commit }, payload)=>{
      commit('updateEnrollComponent', payload)
    },
    updateUsername: ({ commit }, payload)=>{
      commit('updateUsername', payload)
    },
    updateAppLoading: ({ commit }, payload)=>{
      commit('updateAppLoading', payload)
    },
    updateDataOnLogin: ({ commit }, payload)=>{
      commit('updateDataOnLogin', payload)
    },
  }
})
