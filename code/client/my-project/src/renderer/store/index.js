import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
// import user from './modules/user'


// import { createPersistedState, createSharedMutations } from 'vuex-electron'

// import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  // state:{
  //   year:0
  // },
  // mutations:{
  //   set_year(state,year){
  //     state.year = year
  //   }
  // },
  modules: {
    app,
    settings,
    // user
  },
  getters
})

export default store