import { API_LISTINGS_URL } from "../api/constants.mjs";
import { tokenFetch } from "../api/tokenFetch.mjs";

const method = "DELETE";

export async function removeListing(id) {
    if (!id) {
      throw new Error("Deleting requires a postID");
    }
    const removePostURL = `${API_LISTINGS_URL}/${id}`;
  
    const response = await tokenFetch(removePostURL, {
      method,
    });
  
    if (response.ok) {
      return await response.json();
    } else {
      const errorMessage = `Failed to delete listing with status ${response.status}`;
      throw new Error(errorMessage);
    }
  }
  

  export function setRemoveListingListener() {
    const url = new URL(location.href);
    const id = url.searchParams.get("id");
    const removeButton = document.querySelector("#deleteBtn");
  
    if (removeButton) {
      removeButton.addEventListener("click", async () => {
        try {
          await removeListing(id);
          window.location.assign(`/index.html`);
        } catch (error) {
          console.error(error);
          // Handle error, e.g. display error message to user
        }
      });
    }
  }
