/* eslint-disable no-shadow */
export const state = () => ({
  pages: [],
  current: {},
});

export const mutations = {
  SET_PAGES(state, payload) {
    state.pages = payload;
  },
  SET_CURRENT_PAGE(state, payload) {
    state.current = payload;
  },
};

export const actions = {
  async FETCH_PAGES({ commit }) {
    try {
      const response = await this.$axios.$get('/api/v1/admin/pages/');
      commit('SET_PAGES', response);
    } catch (e) {
      console.error(e);
    }
  },
  async FETCH_PAGE_BY_ID({ commit }, id) {
    try {
      const response = await this.$axios.$get(`/api/v1/admin/pages/${id}/`);
      commit('SET_CURRENT_PAGE', response);
    } catch (e) {
      console.error(e);
    }
  },
};
