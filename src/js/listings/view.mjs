
// View Full List of Auction Items

import { isLoggedIn } from "../api/helpers.mjs";
import { API_LISTINGS_URL } from "../api/constants.mjs";
import { tokenFetch } from "../api/tokenFetch.mjs";
import { removeListing } from "./deleteListing.mjs";
import { viewMore } from "./getLists.mjs";

export function listTemplate(listData) {
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

  if (listData.media && Array.isArray(listData.media)) {
    if (listData.media.length > 1) {
      // create image carousel
      const carouselContainer = document.createElement("div");
      carouselContainer.classList.add("carousel", "slide", "d-flex", "flex-wrap", "justify-content-center", "align-items-center", "mb-3");
      carouselContainer.setAttribute("data-bs-ride", "carousel");
      carouselContainer.id = `listing-${listData.id}-carousel`; // Add ID for targeting in event listeners
      list.append(carouselContainer);
  
      const carouselInner = document.createElement("div");
      carouselInner.classList.add("carousel-inner");
      carouselInner.style.width = "53%";
      carouselContainer.append(carouselInner);
  
      listData.media.forEach((url, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) {
          carouselItem.classList.add("active");
        }
        carouselInner.append(carouselItem);
  
        const img = document.createElement("img");
        img.classList.add("img-fluid", "mr-3", "mb-3");
        img.style.width = "200px";
        img.style.height = "200px";
        img.style.objectFit = "cover";
        img.src = url;
        img.alt = `Image from ${listData.title}`;
        carouselItem.append(img);
      });
  
      const carouselPrev = document.createElement("button");
      carouselPrev.classList.add("carousel-control-prev");
      carouselPrev.setAttribute("type", "button");
      carouselPrev.setAttribute("data-bs-target", `#listing-${listData.id}-carousel`);
      carouselPrev.setAttribute("data-bs-slide", "prev");
      carouselContainer.append(carouselPrev);
  
      // const carouselPrevIcon = document.createElement("span");
      // carouselPrevIcon.classList.add("carousel-control-prev-icon");
      // carouselPrevIcon.setAttribute("aria-hidden", "true");
      // carouselPrev.append(carouselPrevIcon);
  
      const carouselPrevText = document.createElement("i");
      carouselPrevText.classList.add("fa-solid", "fa-chevron-left");
      carouselPrevText.style.color = "black";
      carouselPrevText.style.fontSize = "30px"
      carouselPrev.append(carouselPrevText);
  
      const carouselNext = document.createElement("button");
      carouselNext.classList.add("carousel-control-next");
      carouselNext.setAttribute("type", "button");
      carouselNext.setAttribute("data-bs-target", `#listing-${listData.id}-carousel`);
      carouselNext.setAttribute("data-bs-slide", "next");
      carouselContainer.append(carouselNext);
  
      const carouselNextText = document.createElement("i");
      carouselNextText.classList.add("fa-solid", "fa-chevron-right");
      carouselNextText.style.color = "black";
      carouselNextText.style.fontSize = "30px"
      carouselNext.append(carouselNextText);
  
      // Add event listeners for carousel controls
      carouselPrev.addEventListener("click", () => {
        const carousel = new bootstrap.Carousel(carouselContainer);
        carousel.prev();
      });
  
      carouselNext.addEventListener("click", () => {
        const carousel = new bootstrap.Carousel(carouselContainer);
        carousel.next();
      });
    } else {
      // create image container
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
    }
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

  const profileInfo = JSON.parse(window.localStorage.getItem('profile'));

  if (isLoggedIn()) {
      const btn = document.createElement("button");
      btn.classList.add("mb-2", "bidBtn")
      btn.innerHTML =`<a href="/listingItem/?id=${listData.id}">Place Bid</a>`;
      list.append(btn);

      if (profileInfo.name === listData.seller.name) {
          btn.remove();
          const editBtn = document.createElement("button");
          editBtn.classList.add("mb-2", "editBtn")
          editBtn.innerHTML =`<a href="/listingItem/?id=${listData.id}">Edit Listing</a>`;
          list.append(editBtn);
      } 
  } else {
      // User is not logged in, hide the buttons
      const btns = list.querySelectorAll("button");
      btns.forEach(btn => btn.style.display = "none");
      const messageBtn = document.createElement("button");
      messageBtn.classList.add("mb-2", "bidBtn");
      messageBtn.innerHTML = `<a href="/login/index.html">Login to place bid and view details</a>`;
      list.append(messageBtn);
  }

  return list;
}

// AUCTION LISTING SPECIFICS 

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

const endTime = new Date(listData.endsAt).getTime();
const countdownElem = document.createElement("div");
list.append(countdownElem);

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = endTime - now;

  if (distance < 0) {
    clearInterval(intervalId);
    countdownElem.innerHTML = "Auction has ended.";
  } else {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    countdownElem.innerHTML = `Auction ends in: ${days}d ${hours}h`;
  }
};

const intervalId = setInterval(updateCountdown, 1000);

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
    deleteBtn.classList.add("btn", "deleteBtn");
    deleteBtn.innerText = "Delete Listing";
    deleteBtn.addEventListener("click", async () => {
      await removeListing(listData.id);
      window.location.assign(`/index.html`);
    });
    list.append(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "editBtn", "mt-2", "nav-link");
    editBtn.setAttribute("data-bs-toggle", "modal")
    editBtn.setAttribute("data-bs-target", "#editListingModal")
    editBtn.setAttribute("id", "myInput")
    editBtn.innerText = "Edit Listing";
    // editBtn.addEventListener("click", async () => {
    // await setEditListingListener(); // call the function to open the modal
    // const modal = document.querySelector("#editListingModal");
    // modal.style.display = "block"; // show the modal
    // });
    list.append(editBtn);
  }
  

  if (profileInfo.name !== listData.seller.name) {
    const form = document.createElement("form");
    form.innerHTML = `
      <div class="form-group">
        <label for="bidAmount">Bid Amount:</label>
        <input type="number" class="form-control" id="bidAmount" required>
      </div>
      <button type="submit" class="btn bidBtn">Place Bid</button>
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