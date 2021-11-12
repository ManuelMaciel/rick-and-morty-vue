import { OMDBService } from "../../services/OMDBService";
import { APIService } from "../../services/APIService";

export default {
  namespaced: true,
  state: () => {
    return {
      episode: {},
      loading: false
    };
  },
  mutations: {
    setEpisode: (state, episode) => {
      state.episode = episode;
    },
    setLoading: (state, loading) => {
      state.loading = loading;
    }
  },
  actions: {
    fetchEpisodeAsync: ({ commit }, id) => {
      commit("setLoading", true);

      APIService.getEpisode(id)
        .then(async data => {
          const response = await OMDBService.getEpisodeInfo(data.episode);
          const info = response.data;

          data.info = {
            imdbId: info.imdbID,
            plot: info.Plot,
            poster: info.Poster,
            rated: info.Rated,
            rating: info.imdbRating,
            runtime: info.Runtime
          };

          return data;
        })
        .then(data => commit("setEpisode", data))
        .catch(error => {
          alert(`No se pudo completar la peticion: ${error}`);
        })
        .finally(() => commit("setLoading", false));
    }
  }
};
