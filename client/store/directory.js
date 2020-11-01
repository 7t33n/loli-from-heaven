/* eslint-disable no-shadow */
export const state = () => ({
  kinds: [],
  sex: [],
});

export const mutations = {
  SET_KINDS(state, payload) {
    state.kinds = payload;
  },
  SET_SEX(state, payload) {
    state.sex = payload;
  },
};

export const actions = {
  async FETCH_KINDS({ commit }) {
    const response = await this.$axios.$get('/api/v1/directory/kind');
    commit('SET_KINDS', response);
  },
  async FETCH_SEX({ commit }) {
    const response = await this.$axios.$get('/api/v1/directory/sex');
    commit('SET_SEX', response);
  },
};
