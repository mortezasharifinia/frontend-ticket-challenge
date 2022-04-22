import api from "./api";

export const booking = {
  getStadiumMap: async () => api.get("/map"),
  getStadiumSeats: async (mapId) => api.get(`/map/${mapId}`),
  bookTicket: async (mapId, seatPosition) =>
    api.post(`/map/${mapId}/ticket`, seatPosition, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
