import { isLoggedIn } from "../api/helpers.mjs";
import { API_AUCTION_PROFILE } from "../api/constants.mjs";
import { API_LISTINGS_CONST } from "../api/constants.mjs";
import { API_SELLER } from "../api/constants.mjs";
import { tokenFetch } from "../api/tokenFetch.mjs";
import { getUser } from "../api/helpers.mjs";
// import * as templates from "../listings/view.mjs";

let listings = [];

// Get Users List of Auction Items


function ownListTemplate(listData) {
  const list = document.createElement("div");
  list.classList.add("col-xl-3", "col-lg-4", "col-md-6", "border", "border-primary", "m-3");

  const titleLink = document.createElement("a");
  titleLink.href = `/listingItem/?id=${listData.id}`;
  titleLink.classList.add("text-decoration-none");
  list.append(titleLink);

  const title = document.createElement("h2");
  title.classList.add("text-muted", "text-center");
  title.innerText = listData.title;
  titleLink.append(title);

  let bidTotal = listData._count.bids
  const bid = document.createElement("h4");
  bid.classList.add("text-center");
  bid.innerHTML = `Total Bids: ${bidTotal}`;
  list.append(bid);

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("d-flex", "flex-wrap", "justify-content-center", "align-items-center", "mb-3");
  list.append(imgContainer);

  const img = document.createElement("img");
  img.classList.add("img-fluid", "mr-3", "mb-3");
  img.style.width = "200px";
  img.style.height = "200px";
  img.style.objectFit = "cover";
  img.src = listData.media[0];
  img.alt = `Image from ${listData.title}`;
  imgContainer.append(img);

  const editBtn = document.createElement("button");
  editBtn.classList.add("mb-2", "editBtn")
  editBtn.innerHTML =`<a href="/listingItem/index.html?id=${listData.id}">Edit Listing</a>`;
  list.append(editBtn);

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