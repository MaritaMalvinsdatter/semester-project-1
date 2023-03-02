
import { API_LISTINGS_URL} from "../api/constants.mjs";
import { API_DESC_URL } from "../api/constants.mjs";
import { DESC_ORDER } from "../api/constants.mjs";
import { API_SELLER } from "../api/constants.mjs";
import { tokenFetch } from "../api/tokenFetch.mjs";
import * as templates from "./view.mjs";
// const action = "/lists";

let listings = [];
let moreItems = 0;
let increments = 6;

// gets list of aution items
export async function getList() {
    const updateListURL = `${API_DESC_URL}&limit=${increments}`;
    const response = await tokenFetch(updateListURL)
    const list = await response.json();
    moreItems = moreItems + increments;
    // console.log(updateListURL);

    return list;
}

export async function viewMoreButton() {
    const viewMoreMore = document.querySelector(".viewMore")
    viewMoreMore.addEventListener("click", () => {
        viewMore()
    });
}

export async function viewMore() {
    const updateListURL = `${API_DESC_URL}&limit=${increments}&offset=${moreItems}`;
    const response = await tokenFetch(updateListURL)
    const list = await response.json();
    moreItems = moreItems + increments;
    const container = document.querySelector("#listings-feed");
    templates.renderLists(list, container);
    console.log(response);
}

export async function getListings() {
    listings = await getList(); // assign the fetched list of items to the listings variable
    const container = document.querySelector("#listings-feed");
    templates.renderLists(listings, container);
}

// Search in Listings

export function searchListings() {
    const searchInput = document.querySelector("#search-input");
    const searchQuery = searchInput.value.toLowerCase();

    const filteredListingsByTitle = listings.filter(listing => listing.title.toLowerCase().includes(searchQuery));
    const filteredListingsBySeller = listings.filter(listing => listing.seller.name.toLowerCase().includes(searchQuery));

    const filteredListings = [...filteredListingsByTitle, ...filteredListingsBySeller];

    const container = document.querySelector("#listings-feed");
    container.innerHTML = "";
    templates.renderLists(filteredListings, container);
}

const searchButton = document.querySelector("#search-button");
if (searchButton) {
  searchButton.addEventListener("click", searchListings);
}




// gets single listing
export async function getListingSpecifics() {

    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    // console.log(id);

    if (!id) {
        console.error("listingID needed to get listing");
    }
    const getSpecificsURL = `${API_LISTINGS_URL}/${id}?${DESC_ORDER}&${API_SELLER}`;
    const response = await tokenFetch(getSpecificsURL)
    const specifics = await response.json();

    // console.log(getSpecificsURL);

    return specifics;
}

export async function getOneListing() {
    const specifics = await getListingSpecifics()
    const container = document.querySelector("#listing-specific");
    templates.renderSpecifics(specifics, container)
    console.log(specifics);
}
