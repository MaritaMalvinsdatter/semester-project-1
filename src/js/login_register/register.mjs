import { API_AUCTION_URL } from "../api/constants.mjs";

const action = "/auth/register";
const method = "post";

async function register(user) {
    const registerURL = API_AUCTION_URL + action;
    const body = JSON.stringify(user);
    // console.log(registerURL);

    const response = await fetch(registerURL, {
        headers: {
            "Content-Type": "application/json",
        },
        method,
        body,
    });

    const result = await response.json();
    // console.log(result);
    // alert("Registration Complete - Welcome!")
    // window.location.assign("../profile.html")
    // document.getElementById("myForm").reset();
    return result;

}

export function setRegisterFormListener() {
    const form = document.querySelector("#registerForm");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            const form = event.target;
            const formData = new FormData(form);
            const user = Object.fromEntries(formData.entries())

            if (user.banner === "") {
                delete user.banner
            }
            if (user.avatar === "") {
                delete user.avatar
            }

            console.log(user);

            // Send to API
            register(user)
        })
    }
}