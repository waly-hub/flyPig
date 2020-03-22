import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const list = []

const state = {
	list
}

export default new Vuex.Store({
	state,
	actions: {
		listDis(context,data){
			
			context.commit('listDis',data)
		}
	},
	mutations: {
		listDis(state,data){
			
			state.list = data
		}
	}
})