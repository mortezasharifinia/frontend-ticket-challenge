import router from "@/router";
import { booking } from "@/services/booking";

// ##################################################################################
// ################################### State ########################################
// ##################################################################################
const state = {
  stadiumMaps: [],
  selectedStadiumMap: null,
  stadiumSeats: [],
  selectedSeat: null,
};

// ##################################################################################
// ################################## Getters #######################################
// ##################################################################################
const getters = {
  getStadiumMaps(state) {
    return state.stadiumMaps;
  },
  getSelectedStadiumMap(state) {
    return state.selectedStadiumMap;
  },
  getSelectedSeat(state) {
    return state.selectedSeat;
  },
  getStageSeatsRowsNumber(state) {
    return state.stadiumSeats.length;
  },
  getStageSeats(state) {
    return state.stadiumSeats;
  },
};

// ##################################################################################
// ################################## Mutations #####################################
// ##################################################################################
const mutations = {
  SET_STADIUM_MAPS(state, stadiumMaps) {
    let temp = [];
    const length = stadiumMaps.length <= 10 ? 10 : stadiumMaps.length;
    for (let i = 0; i < length; i++) {
      if (i < 10) {
        temp.push({
          id: stadiumMaps[i],
          status: "available",
        });
      } else {
        temp.push({
          id: "unav" + Math.floor(Math.random() * 10000),
          status: "unavailable",
        });
      }
      if (i > 10) {
        temp.push({
          id: stadiumMaps[i],
          status: "vip",
        });
      }
    }
    console.log(temp);
    state.stadiumMaps = temp;
  },

  SET_SELECTED_STADIUM_MAP(state, map) {
    state.selectedStadiumMap = map;
  },

  SET_STADIUM_SEATS(state, seats) {
    state.stadiumSeats = Object.freeze(seats);
  },

  SET_SELECTED_SEAT(state, seat) {
    state.selectedSeat = seat;
  },
};

// ##################################################################################
// ################################### Actions ######################################
// ##################################################################################
const actions = {
  getStadiumMaps({ commit }) {
    booking.getStadiumMap().then((res) => {
      console.log(res.data.data.map_ids);
      commit("SET_STADIUM_MAPS", res.data.data.map_ids);
    });
  },
  getStadiumSeats({ commit }, { map, matchId }) {
    booking.getStadiumSeats(map.id).then((res) => {
      commit("SET_SELECTED_STADIUM_MAP", map);
      commit("SET_STADIUM_SEATS", res.data.data);
      router.push({
        name: "stage",
        params: {
          matchId: matchId,
          stageId: map.id,
        },
      });
    });
  },
  bookTicket({ commit, state }, seatPosition) {
    commit("SET_SELECTED_SEAT", seatPosition);
    const mapId = state.selectedStadiumMap.id;
    const formData = new FormData();
    formData.append("x", seatPosition.x);
    formData.append("y", seatPosition.y);
    booking.bookTicket(mapId, formData).then((res) => {
      console.log(res.data);
      router.push({
        name: "ticket",
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
