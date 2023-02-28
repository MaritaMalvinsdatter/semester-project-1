import { load, save } from "../api/tokenStorage.mjs";


// Fetch user info and displays on profile page
export function setProfilePage() {
    const profile = load("profile");
    // console.log("Profile data:", profile);
    const nameElem = document.querySelector("#profile-name");
    const emailElem = document.querySelector("#profile-email");
    const creditElem = document.querySelector("#profile-credit");
    const avatarElem = document.querySelector("#profile-avatar");

    nameElem.textContent = profile.name;
    emailElem.textContent = profile.email;
    creditElem.textContent = "Credit: " + profile.credits;

    if (profile.avatar) {
        avatarElem.src = profile.avatar;
    } else if (profile.avatar === "null") {
      delete profile.avatar;
    } else {
      delete profile.avatar;
    }
    // console.log("Profile data after setting avatar:", profile);
}

// Updates avatar
const profile = load("profile");

const avatarElem = document.getElementById("profile-avatar");
const editAvatarBtn = document.getElementById("edit-avatar-btn");
const avatarInput = document.getElementById("avatar-input");
const updateAvatarBtn = document.getElementById("update-avatar-btn");

export function updateAvatar() {

  avatarElem.src = profile.avatar;
  
    editAvatarBtn.addEventListener("click", () => {
        avatarInput.hidden = false;
        updateAvatarBtn.hidden = false;
        editAvatarBtn.hidden = true;
      });
      
      updateAvatarBtn.addEventListener("click", () => {
        const newAvatar = avatarInput.value;
        profile.avatar = newAvatar;
        save("profile", profile);
        setProfilePage(); 
        avatarElem.src = newAvatar;
        avatarInput.hidden = true;
        updateAvatarBtn.hidden = true;
        editAvatarBtn.hidden = false;
      });
}



