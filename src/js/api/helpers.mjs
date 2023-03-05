import { load, save, remove } from "./tokenStorage.mjs";

const userKey = "token";

export function getUser() {
    const user = localStorage.getItem("profile");
    return JSON.parse(user);
}

export function isLoggedIn() {
    const response = load(userKey);
    if (response) {
      const token = response["accessToken"];
      return token !== null;
    }
    return false;
}

export function logOut() {
    remove(userKey);
};


