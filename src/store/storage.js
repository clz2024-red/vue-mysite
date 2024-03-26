import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
export default createStore({
    state() {
        return {
            authUser: {no:1, name:"이효리"},
            token: null
        };
    },
    mutations: {
        setAuthUser(state, payload){
            state.authUser = payload;
        },
        setToken(state, payload){
            state.token = payload;
        },
        setAuthName(state, payload){
            state.authUser.name = payload;
        }

    },
    plugins: [
        createPersistedState({
            paths: ['authUser', 'token']
        })
    ]
});
