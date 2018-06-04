
export default {
	state:{
		el:{},
		balls:{}
	},
	mutations: {
		cartAddposition(state,el) {
			state.el=el
		},
		balls(state,type) {
			state.balls=type
		}
	}
}

