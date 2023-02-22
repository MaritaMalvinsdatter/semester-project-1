import { API_AUCTION_URL } from "../api/constants.mjs";
import { API_SELLER_URL } from "../api/constants.mjs";
import { API_DESC_URL } from "../api/constants.mjs";
import { API_SELLER } from "../api/constants.mjs";
import { tokenFetch } from "../api/tokenFetch.mjs";
import * as templates from "./view.mjs";
const action = "/lists";



// gets list of aution items
export async function getList() {
    const updateListURL = `${API_SELLER_URL}`;
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
    const getSpecificsURL = `${API_SOCIAL_URL}${action}/${id}?${API_POST_AUTHOR}`;
    const response = await tokenFetch(getSpecificsURL)
    const specifics = await response.json();

    console.log(getSpecificsURL);

    return specifics;
}

export async function getOneListing() {
    const specifics = await getSpecifics()
    const container = document.querySelector("#post");
    templates.renderPost(specifics, container)
    console.log(specifics);
}
