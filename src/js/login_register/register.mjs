import { API_AUCTION_URL } from "../api/constants.mjs";
import { save } from "../api/tokenStorage.mjs";

const action = "/auth/register";
const method = "post";


async function register(user) {
    const registerURL = API_AUCTION_URL + action;
    const body = JSON.stringify(user);
    const response = await fetch(registerURL, { headers: { "Content-Type": "application/json" }, method, body });
    console.log(response);
    return await response.json();
}

export function setRegisterFormListener() {
    const form = document.querySelector("#registerForm");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const user = Object.fromEntries(new FormData(event.target).entries());

            if (user.avatar === "") {
                delete user.avatar;
            }

            console.log(user);
            
            const registeredUser = await register(user);

            // Set the new registered user into local storage
            save('profile', registeredUser);
        });
    }
}
