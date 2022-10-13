/* 데이터 관리가 필요한 것들 여기에 담는다. 
npm install vuex@next --save; */

import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            user: {}
        }
    },
    mutations: {
        user(state, data) {
            state.user = data;
        }
    }
});

export default store;