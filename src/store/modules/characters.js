import { APIService } from '../../services/APIService'

export default {
  namespaced: true,
  state: () => {
    return {
      character: {},
      loading: false
    };
  },
  mutations: {
    setCharacter: (state, character) => {
      state.character = character;
    },
    setLoading:  (state, loading) => {
      state.loading = loading;
    }
  },
  actions: {
    fetchCharacterAsync: ({ commit }, id) => {
      commit("setLoading", true);

      APIService.getCharacter(id)
        .then((data) => commit("setCharacter", data))
        .catch((error) => {
          alert(`No se pudo completar la peticion: ${error}`)
        })
        .finally(() => commit("setLoading", false))

    }
  }
};
