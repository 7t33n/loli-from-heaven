/* eslint-disable no-shadow */
export const state = () => ({
  pages: [],
});

export const mutations = {
  SET_PAGES(state, payload) {
    state.pages = payload;
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
};
