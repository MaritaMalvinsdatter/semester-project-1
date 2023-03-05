import { API_LISTINGS_URL } from "../api/constants.mjs";
import { tokenFetch } from "../api/tokenFetch.mjs";

export async function removeListing(id) {
  if (!id) {
    throw new Error("Deleting requires a postID");
  }
  const removePostURL = `${API_LISTINGS_URL}/${id}`;

  const response = await tokenFetch(removePostURL, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("Your listing has been deleted!");
  } else {
    const errorMessage = `Failed to delete listing with status ${response.status}`;
    throw new Error(errorMessage);
  }
}




