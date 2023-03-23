import axios from 'axios';

export default {
  namespaced: true,
  state: {
    data: {},
    loading: false,

    searchResultContribuyente: [],
  },
  mutations: {
    getData(state, payload) {
      state.data = payload;
    },

    startLoading(state) {
      state.loading = true;
    },

    finishLoading(state) {
      state.loading = false;
    },

    setContribuyente(state, payload) {
      state.searchResultContribuyente = payload;
    },
  },
  actions: {
    async newHandler({ commit, dispatch }, payload) {
      commit('startLoading');
      try {
        const result = await axios.post('/users', { data: payload.data });
        dispatch('snackbar/showSnackbar', 'Users has been created', {
          root: true,
        });
        commit(`getData`, result.data);
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        commit('finishLoading');
      }
    },
    async edit({ commit, dispatch }, payload) {
      commit('startLoading');
      try {
        const result = await axios.put(`/users/${payload.id}`, {
          id: payload.id,
          data: payload.data,
        });

        dispatch('auth/findMe', null, { root: true });

        dispatch('snackbar/showSnackbar', 'Users has been updated', {
          root: true,
        });
        commit(`getData`, result.data);
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        commit('finishLoading');
      }
    },
    async getData({ commit, dispatch }, payload) {
      commit('startLoading');
      try {
        const result = await axios.get(`/users/${payload}`);
        commit(`getData`, result.data);
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        commit('finishLoading');
      }
    },

    async searchContribuyente({ commit, dispatch }, val) {
      try {
        if (val) {
          const result = await axios(
            `/contribuyentes/autocomplete?query=${val}&limit=100`,
          );
          commit('setContribuyente', result.data);
        } else {
          const result = await axios(`/contribuyentes/autocomplete?limit=100`);
          commit('setContribuyente', result.data);
        }
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
        commit('setContribuyente', []);
      }
    },
  },
};
