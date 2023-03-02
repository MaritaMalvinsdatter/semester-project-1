import { isLoggedIn } from "../api/helpers.mjs";
import { API_AUCTION_PROFILE } from "../api/constants.mjs";
import { API_LISTINGS_CONST } from "../api/constants.mjs";
import { tokenFetch } from "../api/tokenFetch.mjs";
import { getUser } from "../api/helpers.mjs";
// import * as templates from "../listings/view.mjs";

let listings = [];

// Get Users List of Auction Items


function ownListTemplate(listData) {
  const list = document.createElement("div");
  list.classList.add("col-xl-3", "col-lg-4", "col-md-6", "border", "border-primary", "m-3");

  const titleLink = document.createElement("a");
  titleLink.href = `listingItem/index.html?id=${listData.id}`;
  titleLink.classList.add("text-decoration-none");
  list.append(titleLink);

  const title = document.createElement("h2");
  title.classList.add("text-muted", "text-center");
  title.innerText = listData.title;
  titleLink.append(title);

  let bidTotal = listData.bids.reduce((total, bid) => total + bid.amount, 0);
  const bid = document.createElement("h4");
  bid.classList.add("text-center");
  bid.innerHTML = `Highest Bids Amount $: ${bidTotal}`;
  list.append(bid);

  const profileInfo = JSON.parse(window.localStorage.getItem('profile'));

      if (profileInfo.name === listData.seller.name) {
          btn.remove();
          const editBtn = document.createElement("button");
          editBtn.classList.add("mb-2", "editBtn")
          editBtn.innerHTML =`<a href="listingItem/index.html?id=${listData.id}">Edit Listing</a>`;
          list.append(editBtn);
      } 

  return list;
}

export function renderOwnLists(listDataList, parent) {
    const listHTMLElements = listDataList.map(ownListTemplate);
    parent.append(...listHTMLElements);
}

async function getOwnListing() {
  const profile = getUser();
  const updateListURL = `${API_AUCTION_PROFILE}${profile.name}${API_LISTINGS_CONST}`;
  const response = await tokenFetch(updateListURL);
  const list = await response.json();
  console.log(list)

  return list;
}

export async function getOwnListingings() {
  listings = await getOwnListing(); // assign the fetched list of items to the listings variable
  const container = document.querySelector("#listings-feed");
  renderOwnLists(listings, container);
}