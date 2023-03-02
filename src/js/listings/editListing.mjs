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

        const button = form.querySelector("button");
        button.disabled = true;

        const listing = await getListingSpecifics(id);

        // shows orignal input
        form.title.value = listing.title;
        form.description.value = listing.description;
        form.media1.value = listing.media[0];
        form.media2.value = listing.media[1];
        form.media3.value = listing.media[2];
        console.log(listing.media)
        form.tags.value = listing.tags;

        let endDate = listing.endsAt.substring(0,10);
        form.endsAt.value = endDate;

        button.disabled = false;
    
        form.addEventListener("submit", async (event) => {
            event.preventDefault()
            const form = event.target;
            const formData = new FormData(form);
            const listing = Object.fromEntries(formData.entries())
            listing.id = id;

            listing.tags = listing.tags.split(",");

            listing.media = [];

      // Add up to three media URLs to the listing.media array
        for (let i = 1; i <= 3; i++) {
            const mediaUrl = form[`media${i}`].value;
            if (mediaUrl) {
            const response = await fetch(mediaUrl, { method: "HEAD" });
            if (
                response.ok &&
                response.headers.get("Content-Type").startsWith("image/")
            ) {
                listing.media.push(mediaUrl);
            } else {
                console.warn(`Ignore invalid media URL: ${mediaUrl}`);
            }
            }
        }
            
            editListing(listing)
            setTimeout(function() { window.location.assign(`/listingItem/index.html?id=${listing.id}`); }, 500); 
        })
    }
}