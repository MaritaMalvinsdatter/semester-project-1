
// View Full List of Auction Items

import { isLoggedIn } from "../api/helpers.mjs";
import { API_LISTINGS_URL } from "../api/constants.mjs";
import { tokenFetch } from "../api/tokenFetch.mjs";
import { removeListing } from "./deleteListing.mjs";
import { viewMore } from "./getLists.mjs";

export function listTemplate(listData) {
  const list = document.createElement("div");
  list.classList.add("col-xl-3", "col-lg-4", "col-md-6", 
  "d-flex", "flex-column", "border", "m-3", "shadow-sm", "p-3", "bg-body", "rounded");

  const titleLink = document.createElement("a");
  titleLink.href = `/listingitem/?id=${listData.id}`;
  titleLink.classList.add("text-decoration-none", "p-2");
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
  
      // Carousel controls
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

  // Number of Bids
  const bidCount = listData.bids.length;
  const bid = document.createElement("h4");
  bid.classList.add("text-center");
  bid.innerHTML = `Total bids: ${bidCount}`;
  list.append(bid);

  // Seller Info
  const seller = document.createElement("p");
  seller.classList.add("text-center")
  seller.innerHTML = `seller: ${listData.seller.name} <br>
  <img src="${listData.seller.avatar}" width="50" height="60">`;
  list.append(seller);

  const profileInfo = JSON.parse(window.localStorage.getItem('profile'));

  // Buttons: Bid, Edit and Login
  if (isLoggedIn()) {
      const btnDiv = document.createElement("div");
      btnDiv.classList.add("d-flex", "justify-content-center");
      const btn = document.createElement("button");
      btn.classList.add("my-4", "p-2", "bidBtn", "rounded");
      btn.innerHTML =`<a href="/listingitem/?id=${listData.id}">Place Bid</a>`;;
      btnDiv.appendChild(btn);
      list.append(btnDiv);

      if (profileInfo.name === listData.seller.name) {
          btn.remove();
          const btnDiv = document.createElement("div");
          btnDiv.classList.add("d-flex", "justify-content-center");
          const editBtn = document.createElement("button");
          editBtn.classList.add("my-4", "p-2", "editBtn", "rounded")
          editBtn.innerHTML =`<a href="/listingitem/?id=${listData.id}">Edit Listing</a>`;
          btnDiv.appendChild(editBtn);
          list.append(btnDiv);
      } 
  } else {
      // User is not logged in, hide the buttons
          const btnDiv = document.createElement("div");
          btnDiv.classList.add("d-flex", "justify-content-center");
          const btns = list.querySelectorAll("button");
          btns.forEach(btn => btn.style.display = "none");
          const messageBtn = document.createElement("button");
          messageBtn.classList.add("mb-2", "p-2", "bidBtn", "rounded");
          messageBtn.innerHTML = `<a href="/login/index.html">Login for details</a>`;
          btnDiv.appendChild(messageBtn)
          list.append(btnDiv);
  }

  return list;
}


// AUCTION LISTING SPECIFICS 

export function listSpecificTemplate(listData) {
  const list = document.createElement("div");
  list.classList.add(
      "mainlist",
      "col-sm-2",
      "col-md-6",
      "d-flex", "flex-column", "border", "mx-3", "shadow-sm", "p-3", "bg-body", "rounded"
  );
  list.innerHTML = `<h2 class="text-center m-3">${listData.title}</h2>`;

  if (listData.media && Array.isArray(listData.media)) {
    if (listData.media.length > 1) {
      // create image carousel
      const carouselContainer = document.createElement("div");
      carouselContainer.classList.add("carousel", "slide", "d-flex", "flex-wrap", "justify-content-center", "align-items-center", "mb-3");
      carouselContainer.setAttribute("data-bs-ride", "carousel");
      carouselContainer.id = `listing-${listData.id}-carousel`; // Add ID for targeting in event listeners
      list.append(carouselContainer);
  
      const carouselInner = document.createElement("div");
      carouselInner.classList.add("carousel-inner", "w-50");
      // carouselInner.style.width = "53%";
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
        img.style.width = "auto";
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
  
      // Carousel controls
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

  const description = document.createElement("div");
  description.innerHTML = `<p>${listData.description}</p>`;
  list.append(description);

  // BIDS

  let bidTotal = listData.bids.reduce((total, bid) => total + bid.amount, 0);
  const bid = document.createElement("h6");
  bid.classList.add("mt-3");
  bid.innerHTML = `Total Bid Amount $: ${bidTotal}`;
  list.append(bid);

  const profileInfo = JSON.parse(window.localStorage.getItem("profile"));
  
  // Edit/delete button if it's users listing
  if (profileInfo.name === listData.seller.name) {
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("mt-3")
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "deleteBtn", "me-2");
    deleteBtn.innerText = "Delete Listing";
    deleteBtn.addEventListener("click", async () => {
      await removeListing(listData.id);
      window.location.assign(`/index.html`);
    });
    list.append(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "editBtn");
    editBtn.setAttribute("data-bs-toggle", "modal")
    editBtn.setAttribute("data-bs-target", "#editListingModal")
    editBtn.setAttribute("id", "myInput")
    editBtn.innerText = "Edit Listing";

    btnDiv.appendChild(deleteBtn);
    btnDiv.appendChild(editBtn)
    list.append(btnDiv);
  }
  
  // Bidding form/button if on others listings
  if (profileInfo.name !== listData.seller.name) {
    const form = document.createElement("form");
    form.innerHTML = `
      <div class="form-group d-flex">
        <label for="bidAmount"></label>
          <div class="input-group w-50">
            <span class="input-group-text">$</span>
            <input type="number" class="form-control" placeholder="your bid" id="bidAmount" required>
          </div>
          <button type="submit" class="btn bidBtn ms-1">Place Bid</button>
      </div>
      
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
          bid.innerHTML = `Bid Amount $: ${bidTotal}`;
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
  const endTime = new Date(listData.endsAt).getTime();
  const countdownElem = document.createElement("div");
  countdownElem.classList.add("mt-2");
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
      countdownElem.innerHTML = `Auction ends in: ${days}d & ${hours}h`;
    }
  };

  const intervalId = setInterval(updateCountdown, 1000);

  if (listData.tags && Array.isArray(listData.tags)) {
    const tagsDiv = document.createElement("div");
    tagsDiv.classList.add("tags-container", "my-4");
    list.append(tagsDiv);
    
    listData.tags.forEach((tag, index) => {
      const tagSpan = document.createElement("span");
      tagSpan.innerText = tag;
      tagSpan.classList.add(`tag-${index}`, "border", "me-1", "p-1", "shadow-sm");
      tagsDiv.append(tagSpan);
    });
  }
    console.log(listData);

    if (profileInfo.name !== listData.seller.name) {
      const contact = document.createElement("div");
      contact.classList.add("mt-4")
      contact.innerHTML = `<p class="fst-italic">For questions about item(s), please contact seller at: ${listData.seller.email}</p>`;
      list.append(contact);
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