import { load, save, remove } from "./tokenStorage.mjs";
import * as paths from "./constants.mjs";

const userKey = "noroff-user-key";

export function getUser () {
    const user = localStorage.getItem("profile");
    return JSON.parse(user);
}

export function isLoggedIn() {
    const res = load(userKey);
    if (res) {
      const token = res["accessToken"];
      return token !== null;
    }
    return false;
}

export function logOut() {
    remove(userKey);
};


