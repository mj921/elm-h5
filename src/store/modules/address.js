const address = localStorage.getItem("address");
export default {
  namespaced: true,
  state: address
    ? JSON.parse(address)
    : {
        position: "",
        lat: 120,
        lng: 30,
        username: "",
        usernameTag: "",
        phone: "",
        longitude: "",
        latitude: "",
        address: ""
      },
  mutations: {
    UPDATE_POSITION(state, position) {
      state.position = position.address + position.name;
      state.lat = position.location.lat;
      state.lng = position.location.lng;
      localStorage.setItem("address", JSON.stringify(state));
    },
    // eslint-disable-next-line
    CLEAR(state) {
      state = {
        position: "",
        lat: 120,
        lng: 30,
        username: "",
        usernameTag: "",
        phone: "",
        longitude: "",
        latitude: "",
        address: ""
      };
      localStorage.removeItem("address");
    },
    UPDATE_ADDRESS(state, address) {
      state.position = address.position;
      state.lat = address.lat;
      state.lng = address.lng;
      state.username = address.username;
      state.usernameTag = address.usernameTag;
      state.phone = address.phone;
      state.longitude = address.longitude;
      state.latitude = address.latitude;
      state.address = address.address;
      localStorage.setItem("address", JSON.stringify(state));
    }
  }
};
