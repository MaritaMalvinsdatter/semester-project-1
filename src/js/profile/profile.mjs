import { load, save } from "../api/tokenStorage.mjs";


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
const profile = load("profile");

const avatarElem = document.getElementById("profile-avatar");
const editAvatarBtn = document.getElementById("edit-avatar-btn");
const avatarInput = document.getElementById("avatar-input");
const updateAvatarBtn = document.getElementById("update-avatar-btn");

avatarElem.src = profile.avatar;

export function updateAvatar() {
    editAvatarBtn.addEventListener("click", () => {
        avatarInput.hidden = false;
        updateAvatarBtn.hidden = false;
        editAvatarBtn.hidden = true;
      });
      
      updateAvatarBtn.addEventListener("click", () => {
        const newAvatar = avatarInput.value;
        profile.avatar = newAvatar;
        save("profile", profile);
        avatarElem.src = newAvatar;
        avatarInput.hidden = true;
        updateAvatarBtn.hidden = true;
        editAvatarBtn.hidden = false;
      });
}

// editAvatarBtn.addEventListener("click", updateAvatar);


