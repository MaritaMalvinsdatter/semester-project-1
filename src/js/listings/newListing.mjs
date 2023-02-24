
import { API_LISTINGS_URL } from "../api/constants.mjs";
import { API_SELLER_URL } from "../api/constants.mjs";
import { tokenFetch } from "../api/tokenFetch.mjs";

async function createNewListing(listingData) {
    const createListingURL = API_SELLER_URL;

    const response = await tokenFetch(createListingURL, {
        method: "post",
        body: JSON.stringify(listingData),
    })

    return await response.json();
}

export function setNewListingListener() {
    const modal = document.querySelector("#listingModal")
    const form = modal.querySelector("#create-new-listing");
  
    if (form) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
  
        const formData = new FormData(form);
        const listing = Object.fromEntries(formData.entries());
        listing.tags = listing.tags.split(",");
        listing.media = [];

       // Add up to three media URLs to the listing.media array
       for (let i = 1; i <= 3; i++) {
        const mediaUrl = listing[`media${i}`];
        if (mediaUrl) {
          const response = await fetch(mediaUrl, { method: 'HEAD' });
          if (response.ok && response.headers.get('Content-Type').startsWith('image/')) {
            listing.media.push(mediaUrl);
          } else {
            console.warn(`Ignore invalid media URL: ${mediaUrl}`);
          }
        }
      }
  
        const dateInput = form.querySelector("#endsAt");
        const date = new Date(dateInput.value);
        date.setHours(0, 0, 0, 0);
        listing.endsAt = date.toISOString();
  
        console.log("listing", listing);
  
        try {
          const response = await createNewListing(listing);
          console.log("response", response);
        } catch (error) {
          console.error(error);
        }
  
        form.reset();
      });
    }
  }
  



