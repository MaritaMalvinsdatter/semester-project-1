import { API_AUCTION_URL } from "../api/constants.mjs";
import { save } from "../api/tokenStorage.mjs";

const action = "/auth/register";
const method = "post";
const userAlert = document.querySelector("#error-alert");

async function register(user) {
    const registerURL = API_AUCTION_URL + action;
    const body = JSON.stringify(user);
    const response = await fetch(registerURL, { headers: { "Content-Type": "application/json" }, method, body });
    const { accessToken, ...profile } = await response.json();
    console.log(response);
    console.log(accessToken);
    console.log(profile);

    if (profile && accessToken) {
        save('accessToken', accessToken);
        save('profile', JSON.stringify(profile));
        window.location.replace('/index.html');
    } 
    // else {
    //     userAlert.classList.add("alert-warning");
    //     userAlert.innerHTML += `Something went wrong, please try again`;
    // }
    return response;
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
            
            register(user);
            
        });
    }
}
