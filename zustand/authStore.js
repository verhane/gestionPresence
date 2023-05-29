import {create} from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const useAuthStore = create((set, get) => ({
  user: {},
  setUser: (user) => set({ user: user }),
  token: null,
  setToken: (token) => set({ token: token }),
  auth_loading: false,
  auth_failed_message: null,
  login: async (email, password) => {
    set({ auth_loading: true });
    try {
      const response = await axios.post("login", {
        email,
        password,
        device_name:'gestion',
      });
      await AsyncStorage.setItem("AccesToken", response.data.token);
      set({ user: response.data.user, token: response.data.token });
      set({ auth_loading: false });
    } catch (error) {
      set({
        auth_failed_message: error.response.data.msg,
        auth_loading: false,
      });
    }
  },
  logout: () => {
    set({ auth_loading: true });
    axios
      .post("logout")
      .then(() => {
        AsyncStorage.removeItem("token");
        set({ user: {}, token: null, auth_loading: false });
      })
      .finally(() => {
        AsyncStorage.removeItem("token").then(() => {
          set({ user: {}, token: null, auth_loading: false });
        });
      });
  },
  clear_auth_failed_message: () => set({ auth_failed_message: null }),
}));

export default useAuthStore;
