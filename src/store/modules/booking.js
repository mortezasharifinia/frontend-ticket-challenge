import router from "@/router";
import cookies from "vue-cookies";
import { booking } from "@/services/booking";

// ##################################################################################
// ################################### State ########################################
// ##################################################################################
const state = {
  selectedMatch: null,
  stadiumMaps: [],
  selectedStadiumMap: null,
  stadiumSeats: [],
  selectedSeat: null,
  ticket: null,
};

// ##################################################################################
// ################################## Getters #######################################
// ##################################################################################
const getters = {
  getSelectedMatch(state) {
    return state.selectedMatch;
  },
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
  getTicket(state) {
    return state.ticket;
  },
};

// ##################################################################################
// ################################## Mutations #####################################
// ##################################################################################
const mutations = {
  SET_SELECTED_MATCH(state, match) {
    state.selectedMatch = match;
  },
  SET_STADIUM_MAPS(state, stadiumMaps) {
    let temp = [];
    const length = stadiumMaps.length <= 10 ? 10 : stadiumMaps.length;
    for (let i = 0; i < length; i++) {
      if (i < 10) {
        temp.push({
          id: stadiumMaps[i],
          status: "available",
          index: i,
        });
      } else {
        temp.push({
          id: "unav" + Math.floor(Math.random() * 10000),
          status: "unavailable",
          index: i,
        });
      }
      if (i > 10) {
        temp.push({
          id: stadiumMaps[i],
          status: "vip",
          index: i,
        });
      }
    }
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

  SET_TICKET(state, ticket) {
    state.ticket = ticket;
  },
};

// ##################################################################################
// ################################### Actions ######################################
// ##################################################################################
const actions = {
  selectMatch({ commit }, match) {
    commit("SET_SELECTED_MATCH", match);
    booking.getStadiumMap().then((res) => {
      commit("SET_STADIUM_MAPS", res.data.data.map_ids);
      router.push({
        name: "booking",
        params: {
          matchId: match.id,
        },
      });
    });
  },
  // getStadiumMaps({ commit }) {
  //   booking.getStadiumMap().then((res) => {
  //     commit("SET_STADIUM_MAPS", res.data.data.map_ids);
  //   });
  // },
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
      commit("SET_TICKET", res.data.data.ticket_id);
      router.push({
        name: "ticket",
      });
      commit(
        "global/SET_ERRORS",
        {
          type: "info",
          message: "بلیط شما با موفقیت رزور شد",
        },
        { root: true }
      );
      cookies.remove("mobileNumber");
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
