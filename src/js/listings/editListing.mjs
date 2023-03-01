import { API_LISTINGS_URL } from "../api/constants.mjs";
import { tokenFetch } from "../api/tokenFetch.mjs";
import { getListingSpecifics } from "../listings/getLists.mjs"

// edits exiting listing
async function editListing(listingData) {
    if (!listingData.id) {
        console.error("listingID needed to edit existing listing");
    }

    const updatelistingURL = `${API_LISTINGS_URL}/${listingData.id}`;
    // console.log(updatelistingURL);

    const response = await tokenFetch(updatelistingURL, {
        method: "put",
        body: JSON.stringify(listingData)
    })

    return await response.json();
}

export async function setEditListingListener() {
    const modal = document.querySelector("#editListingModal");
    const form = modal.querySelector("#edit-listing");
    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    const userAlert = document.querySelector("#error-alert");

    if (form) {

        // const button = form.querySelector("button");
        // button.disabled = true;

        // const listing = await getListingSpecifics(id);

        // shows orignal input
        // form.title.value = listing.title;
        // form.description.value = listing.description;
        // form.media = listing.media;
        // form.tags.value = listing.tags;

        // button.disabled = false;
    
        form.addEventListener("submit", async (event) => {
            event.preventDefault()
            const form = event.target;
            const formData = new FormData(form);
            const listing = Object.fromEntries(formData.entries())
            listing.id = id;

            listing.tags = listing.tags.split(",");
            
            editListing(listing)
            setTimeout(function() { window.location.assign(`listingItem/index.html?id=${listing.id}`); }, 500); 
        })
    }
}