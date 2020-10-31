/* eslint-disable no-shadow */
export const state = () => ({
  pages: [],
  current: [],
  animalsTableFieldNames: {},
});

export const mutations = {
  SET_PAGES(state, payload) {
    state.current = payload.items;
  },
  SET_CURRENT_PAGE(state, payload) {
    state.current = payload;
  },
};

export const actions = {
  async FETCH_PAGES({ commit }) {
    try {
      const response = await this.$axios.$get('/api/v1/animals/');
      commit('SET_PAGES', response);
    } catch (e) {
      console.error(e);
    }
  },
};
