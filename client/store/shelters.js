/* eslint-disable no-shadow */
export const state = () => ({
  data: [],
});

export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload;
    console.log(state.data);
  },
};

export const actions = {
  async FETCH_DATA({ commit }) {
    try {
      const response = await this.$axios.$get('/api/v1/directory/shelter');
      commit('SET_DATA', response);
    } catch (e) {
      console.error(e);
    }
  },
};
