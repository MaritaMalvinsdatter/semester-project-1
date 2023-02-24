
// View Full List of Auction Items

import { isLoggedIn } from "../api/helpers.mjs";

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

      const profileName = JSON.parse(window.localStorage.getItem('profile'))
      

      if (isLoggedIn) {
        const btn = document.createElement("button");
        btn.classList.add("mb-2")
        btn.innerHTML =`<a href="listingItem/index.html?id=${listData.id}" class="text-muted">Place Bid</a>`;
        list.append(btn);

        if (profileName.name === listData.seller.name) {
          btn.remove();
          const editBtn = document.createElement("button");
          editBtn.classList.add("mb-2")
          editBtn.innerHTML =`<a href="listingItem/index.html?id=${listData.id}" class="text-muted">Edit Listing</a>`;
          list.append(editBtn);
        } 
      }

    return list;
}

// Auction Item Specifics 

export function listSpecificTemplate(listData) {
    const list = document.createElement("div");
    list.classList.add("mainlist", "sm-md-w-100", "lg-w-50", "container-fluid", "d-flex", "flex-column", "border", "border-primary");
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
        list.append(tags)
    }

    const bidTotal = listData.bids.reduce((total, bid) => total + bid.amount, 0);
      const bid = document.createElement("h4");
      bid.classList.add("text-center");
      bid.innerHTML = `Bids Amount $: ${bidTotal}`;
      list.append(bid);

    const profileName = JSON.parse(window.localStorage.getItem('profile'))

    // console.log(profileName.name);
    // console.log(listData.seller.name);

    // if (profileName.name === listData.seller.name) {
    //         const btn = document.createElement("button");
    //         // btn.classList.add("btn", "btn-primary", "btn-sm")
    //         btn.innerHTML =`<a href="edit_list.html?id=${listData.id}" class="text-muted">Edit</a>`;
    //         list.append(btn);
            
            // const deleteBtn = document.createElement("button");
            // deleteBtn.classList.add("deletebtn");
            // const removeButton = document.querySelector("deleteBtn");
	        // removeButton.addEventListener("click", async () => {
            // await removelist(listData.id)
            // })

        // } else {
        //     const btn = document.createElement("button");
        //     btn.classList.add("btn")
        //     btn.innerHTML =`<a href="profile.html">Back to lists</a>`;
        //     list.append(btn);;
        // }

    return list;
}

export function renderLists(listDataList, parent) {
    const listHTMLElements = listDataList.map(listTemplate);
    parent.append(...listHTMLElements);
}

export function renderSpecifics(listData, parent) {
    parent.append(listSpecificTemplate(listData));
}