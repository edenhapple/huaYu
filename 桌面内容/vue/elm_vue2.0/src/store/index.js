import Vue from 'vue'
import vuex from 'vuex'

import dialog_ball from './components/dialog_ball.js'
Vue.use(vuex);

export default new vuex.Store({//store对象
    modules:{
        ball:dialog_ball
    }
});

