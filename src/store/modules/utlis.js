const state = {
    snackbar: {
        status: false,
        optionalBtnFlag: false,
        optionalBtnLink: '',
        optionalBtnName: '',
        type: 'info',
        timeout: 6000,
        content: ''
    },
};
const getters = {};
const mutations = {
    SET_SNACK_FALSE: (state) => {
        state.snackbar.status = false
        state.snackbar.optionalBtnFlag = false
        state.snackbar.optionalBtnLink = ""
        state.snackbar.optionalBtnName = ""
        state.snackbar.content = '',
            state.snackbar.type = 'info',
            state.snackbar.timeout = 6000
    },
    SET_SNACK_TRUE: (state, payload) => {
        state.snackbar.status = true
        state.snackbar.optionalBtnFlag = payload.optionalBtnFlag
        state.snackbar.optionalBtnLink = payload.optionalBtnLink
        state.snackbar.optionalBtnName = payload.optionalBtnName
        state.snackbar.content = payload.content
        state.snackbar.timeout = payload.timeout
        state.snackbar.type = payload.type
    },
};
const actions = {
    snackTrue: function ({commit}, payload) {
        if (payload.type == null){
            payload.type = 'error'
        }
        if (payload.timeout == null){
            payload.timeout = 6000
        }
        if (payload.optionalBtnFlag == null){
            payload.optionalBtnFlag = false
        }
        if (payload.optionalBtnLink == null){
            payload.optionalBtnLink = ''
        }
        if (payload.optionalBtnName == null){
            payload.optionalBtnName = ''
        }
        commit('SET_SNACK_TRUE', payload);

        // Remove alert with set timeout
        setTimeout(function () {
            commit('SET_SNACK_FALSE');
        }, payload.timeout)
    }
};

const Utils = {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};

export default Utils;