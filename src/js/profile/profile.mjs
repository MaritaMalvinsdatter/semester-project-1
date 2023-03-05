import { load, save } from "../api/tokenStorage.mjs";
import { headers } from "../api/tokenFetch.mjs";
import { API_AUCTION_PROFILE } from "../api/constants.mjs";



// Fetch user info and displays on profile page
export function setProfilePage() {
  const profile = load("profile");
  const nameElem = document.querySelector("#profile-name");
  const emailElem = document.querySelector("#profile-email");
  const creditElem = document.querySelector("#profile-credit");
  const avatarElem = document.querySelector("#profile-avatar");

  nameElem.textContent = profile.name;
  emailElem.textContent = profile.email;
  creditElem.textContent = "Credit: " +  "$" + profile.credits;

  if (profile.avatar) {
    avatarElem.src = profile.avatar;
  } else {
    avatarElem.src = "/src/img/blank-profile-picture-gca82a1260_640.png";
    save("profile", profile); 
  }
}

// Updates avatar
const profile = load("profile");
const avatarElem = document.getElementById("profile-avatar");
const editAvatarBtn = document.getElementById("edit-avatar-btn");
const avatarInput = document.getElementById("avatar-input");
const updateAvatarBtn = document.getElementById("update-avatar-btn");
const userAlert = document.querySelector("#error-alert");


export function updateAvatar() {
  avatarElem.src = profile.avatar;

  editAvatarBtn.addEventListener("click", () => {
    avatarInput.hidden = false;
    updateAvatarBtn.hidden = false;
    editAvatarBtn.hidden = true;
  });

  avatarInput.addEventListener("input", () => {
    userAlert.innerHTML = "";
  });

  userAlert.addEventListener("click", () => {
    userAlert.innerHTML = "";
  });

  updateAvatarBtn.addEventListener("click", async () => {
    const newAvatar = avatarInput.value;
    if (!newAvatar) {
      userAlert.classList.add("alert-warning");
      userAlert.innerHTML = `A valid image URL is needed to update the avatar`;
      return;
    }
    try {
      const response = await fetch(`${API_AUCTION_PROFILE}${profile.name}/media`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({ avatar: newAvatar })
      });
      if (!response.ok) {
        throw new Error("Failed to update avatar.");
      }
      const updatedProfile = await response.json();
      profile.avatar = updatedProfile.avatar;
      save("profile", profile);
      avatarElem.src = updatedProfile.avatar;
      avatarInput.hidden = true;
      updateAvatarBtn.hidden = true;
      editAvatarBtn.hidden = false;
      userAlert.hidden = true;
    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  });
}






