
// View Full List of Auction Items

import { isLoggedIn } from "../api/helpers.mjs";
import { API_LISTINGS_URL } from "../api/constants.mjs";
import { tokenFetch } from "../api/tokenFetch.mjs";
import { removeListing } from "./deleteListing.mjs"

export function listTemplate(listData) {
    const list = document.createElement("div");
    list.classList.add("col", "container-fluid", "d-flex", "flex-column", "border", "border-primary", "m-3");
    list.innerHTML = `<a href="listingItem/index.html?id=${listData.id}" class="text-decoration-none"><h2 class="text-muted text-center">${listData.title}</h2></a>`;

    if (listData.media && Array.isArray(listData.media)) {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("d-flex", "flex-wrap", "mb-3");
        list.append(imgContainer);
      
        listData.media.forEach(url => {
          const img = document.createElement("img");
          img.classList.add("img-fluid", "mr-3", "mb-3");
          img.src = url; 
          img.alt = `Image from ${listData.title}`;
          imgContainer.append(img);
        });
      }

      const bidCount = listData.bids.length;
      const bid = document.createElement("h4");
      bid.classList.add("text-center");
      bid.innerHTML = `Total bids: ${bidCount}`;
      list.append(bid);

    const seller = document.createElement("p");
    seller.classList.add("text-center")
    seller.innerHTML = `seller: ${listData.seller.name} <br>
    <img src="${listData.seller.avatar}" width="50" height="60">`;
    list.append(seller);

      const profileInfo = JSON.parse(window.localStorage.getItem('profile'))
      

      if (isLoggedIn()) {
        const btn = document.createElement("button");
        btn.classList.add("mb-2")
        btn.innerHTML =`<a href="listingItem/index.html?id=${listData.id}" class="text-muted">Place Bid</a>`;
        list.append(btn);

        if (profileInfo.name === listData.seller.name) {
            btn.remove();
            const editBtn = document.createElement("button");
            editBtn.classList.add("mb-2")
            editBtn.innerHTML =`<a href="listingItem/index.html?id=${listData.id}" class="text-muted">Edit Listing</a>`;
            list.append(editBtn);
        } 
    } else {
        // User is not logged in, hide the buttons
        const btns = list.querySelectorAll("button");
        btns.forEach(btn => btn.style.display = "none");
        const messageBtn = document.createElement("button");
        messageBtn.classList.add("mb-2");
        messageBtn.innerHTML = `<a href="/login/login.html">Login to place bid and view details</a>`;
        // console.log("created login message:", messageBtn);
        list.append(messageBtn)
      }

    return list;
}


// Auction Listing Specifics 

export function listSpecificTemplate(listData) {
  const list = document.createElement("div");
  list.classList.add(
      "mainlist",
      "sm-md-w-100",
      "lg-w-50",
      "container-fluid",
      "d-flex",
      "flex-column",
      "border",
      "border-primary"
  );
  list.innerHTML = `<h2 class="text-center mt-5">${listData.title}</h2> <br> <p>${listData.description}</p>`;

  if (listData.media) {
    if (Array.isArray(listData.media)) {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("d-flex", "flex-column", "justify-content-center", "align-items-center");
      for (const imageUrl of listData.media) {
        const img = document.createElement("img");
        img.classList.add("img-fluid", "m-2");
        img.style.maxWidth = "50%";
        img.src = imageUrl;
        img.alt = `Image from ${listData.title}`;
        imgContainer.append(img);
      }
      list.append(imgContainer);
    } else {
      const img = document.createElement("img");
      img.classList.add("img-fluid");
      img.src = listData.media;
      img.alt = `Image from ${listData.title}`;
      list.append(img);
    }
  }

  const body = document.createElement("p");
  body.innerHTML = `Auction ends at: ${listData.endsAt}`;
  list.append(body);

  if (listData.tags) {
      const tags = document.createElement("label");
      tags.innerText = `Tags: ${listData.tags}`;
      list.append(tags);
  }

  let bidTotal = listData.bids.reduce((total, bid) => total + bid.amount, 0);
  const bid = document.createElement("h4");
  bid.classList.add("text-center");
  bid.innerHTML = `Highest Bids Amount $: ${bidTotal}`;
  list.append(bid);

  const profileInfo = JSON.parse(window.localStorage.getItem("profile"));

  if (profileInfo.name === listData.seller.name) {
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deletebtn");
    deleteBtn.innerText = "Delete Listing";
    deleteBtn.addEventListener("click", async () => {
      await removeListing(listData.id);
      window.location.assign(`/index.html`);
    });
    list.append(deleteBtn);
  }

  if (profileInfo.name !== listData.seller.name) {
    const form = document.createElement("form");
    form.innerHTML = `
      <div class="form-group">
        <label for="bidAmount">Bid Amount:</label>
        <input type="number" class="form-control" id="bidAmount" required>
      </div>
      <button type="submit" class="btn btn-primary">Place Bid</button>
    `;
  
    const error = document.createElement("p");
    error.classList.add("text-danger");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      let bidAmount = parseInt(form.querySelector("#bidAmount").value);
      if (bidAmount > bidTotal && bidAmount <= profileInfo.credits) {
        const newBid = {
          amount: bidAmount,
          bidder: profileInfo.name,
        };
        listData.bids.push(newBid);
        const response = await tokenFetch(`${API_LISTINGS_URL}/${listData.id}/bids`, {
          method: "POST",
          body: JSON.stringify(newBid),
        });
        if (response.ok) {
          profileInfo.credits -= bidAmount;
          window.localStorage.setItem("profile", JSON.stringify(profileInfo));
          bidTotal = bidAmount;
          bid.innerHTML = `Bids Amount $: ${bidTotal}`;
          form.querySelector("#bidAmount").value = "";
          error.innerText = "";
        }
      } else if (bidAmount > profileInfo.credits) {
        error.innerText = "You don't have enough credit to make this bid";
      } else {
        error.innerText = "Bid amount must be greater than the current bid total";
      }
    });

    form.append(error);
    list.append(form);
  }
  return list;
}


export function renderLists(listDataList, parent) {
    const listHTMLElements = listDataList.map(listTemplate);
    parent.append(...listHTMLElements);
}

export function renderSpecifics(listData, parent) {
    parent.append(listSpecificTemplate(listData));
}