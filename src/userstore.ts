import { create } from "zustand";

interface User {
  username: string;
  role: string;
  isloggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
const keyname = "userstore";

export const useUseStore = create<User>((set) => {
  const storedstate = sessionStorage.getItem(keyname);
  const initialstate = storedstate
    ? JSON.parse(storedstate)
    : { username: "", role: "", isloggedIn: false };
  return {
    ...initialstate,
    logout: () => {
      const loggedoutstate = { username: "", role: "", isloggedIn: false };
      sessionStorage.setItem(keyname, JSON.stringify(loggedoutstate));
      set(loggedoutstate);
    },

    login: async (username: string, password: string) => {
      const userrole =
        username.toLowerCase().startsWith("z") && password != ""
          ? "admin"
          : "user";
      const loggedinstate = {
        username: username,
        role: userrole,
        isloggedIn: true,
      };
      sessionStorage.setItem(keyname, JSON.stringify(loggedinstate));
      set(loggedinstate);
    },
  };
});
