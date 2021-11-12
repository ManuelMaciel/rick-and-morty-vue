import { APIService } from "../../services/APIService";

export default {
  namespaced: true,
  state: () => {
    return {
      location: {},
      loading: false
    };
  },
  mutations: {
    setLocation: (state, location) => {
      state.location = location;
    },
    setLoading: (state, loading) => {
      state.loading = loading;
    }
  },
  actions: {
    fetchLocationAsync: ({ commit }, id) => {
      commit("setLoading", true);

      APIService.getLocation(id)
        .then(data => commit("setLocation", data))
        .catch(error => {
          alert(`No se pudo completar la peticion: ${error}`);
        })
        .finally(() => commit("setLoading", false));
    }
  }
};
