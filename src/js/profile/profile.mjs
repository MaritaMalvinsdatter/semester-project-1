import { load } from "../api/tokenStorage.mjs";


// Fetch user info and displays on profile page
export function setProfilePage() {
    const profile = load("profile");
    const nameElem = document.querySelector("#profile-name");
    const emailElem = document.querySelector("#profile-email");
    const creditElem = document.querySelector("#profile-credit");
    const avatarElem = document.querySelector("#profile-avatar");

    nameElem.textContent = profile.name;
    emailElem.textContent = profile.email;
    creditElem.textContent = "Credit: " + profile.credits;

    if (profile.avatar) {
        avatarElem.src = profile.avatar;
    }
}

// Updates avatar