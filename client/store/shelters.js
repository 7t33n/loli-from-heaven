/* eslint-disable no-shadow */
export const state = () => ({
  data: {},
});

export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload.items;
  },
};

export const actions = {
  async FETCH_DATA({ commit }) {
    try {
      const response = await this.$axios.$get('/api/v1/directory/shelters');
      commit('SET_DATA', response);
    } catch (e) {
      console.error(e);
    }
  },
};
