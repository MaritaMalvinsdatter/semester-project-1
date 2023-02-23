// import { API_AUCTION_URL } from "../api/constants.mjs";
// import { API_SELLER_URL } from "../api/constants.mjs";
import { API_LISTINGS_URL} from "../api/constants.mjs";
import { API_DESC_URL } from "../api/constants.mjs";
import { DESC_ORDER } from "../api/constants.mjs";
import { API_SELLER } from "../api/constants.mjs";
import { tokenFetch } from "../api/tokenFetch.mjs";
import * as templates from "./view.mjs";
// const action = "/lists";



// gets list of aution items
export async function getList() {
    const updateListURL = `${API_DESC_URL}`;
    const response = await tokenFetch(updateListURL)
    const list = await response.json();

    console.log(updateListURL);

    return list;
}

export async function getListings() {
    const lists = await getList()
    const container = document.querySelector("#listings-feed");
    templates.renderLists(lists, container)
    console.log(lists);
}

// gets single listing
export async function getListingSpecifics() {

    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    console.log(id);

    if (!id) {
        console.error("listingID needed to get listing");
    }
    const getSpecificsURL = `${API_LISTINGS_URL}/${id}?${DESC_ORDER}&${API_SELLER}`;
    const response = await tokenFetch(getSpecificsURL)
    const specifics = await response.json();

    console.log(getSpecificsURL);

    return specifics;
}

export async function getOneListing() {
    const specifics = await getListingSpecifics()
    const container = document.querySelector("#listing-specific");
    templates.renderSpecifics(specifics, container)
    console.log(specifics);
}
