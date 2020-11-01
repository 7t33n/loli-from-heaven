/* eslint-disable no-shadow */
export const state = () => ({
  current: [],
  data: [],
});

export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload.items;
  },
  SET_CURRENT_PAGE(state, payload) {
    state.current = payload;
  },
};

export const actions = {
  async FETCH_DATA({ commit }) {
    try {
      const response = await this.$axios.$get('/api/v1/animals/');
      commit('SET_DATA', response);
    } catch (e) {
      console.error(e);
    }
  },
  async FETCH_PAGE_BY_ID({ commit }, id) {
    try {
      const response = await this.$axios.$get(`/api/v1/animals/${id}/`);
      commit('SET_CURRENT_PAGE', response);
    } catch (e) {
      console.error(e);
    }
  },
};
