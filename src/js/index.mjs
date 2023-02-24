import { setRegisterFormListener } from "./login_register/register.mjs";
import { setLoginFormListener } from "./login_register/login.mjs";
import { getListings } from "./listings/getLists.mjs";
import { getOneListing } from "./listings/getLists.mjs";
import { setNewListingListener } from "./listings/newListing.mjs";
import * as paths from "./api/constants.mjs";
import { setLogoutListener } from "./login_register/logout.mjs";

// console.log(paths.API_SELLER_URL)

const path = location.pathname

// if (path === "/login/login.html") {
//     setLoginFormListener()
// } else if (path === "/register/index.html") {
//     setRegisterFormListener()
// } else if (path === "/index.html") {
//     getListings()
//     logOutEvent()
//     setNewListingListener()
// } else if (path === '/listingItem/index.html') {
//     getOneListing()
// } 

switch (path) {
    case "/":
    case "/index.html":
        getListings();
        setLogoutListener();
        setNewListingListener();
        break;
    case "/login/":
    case "/login/index.html":
        setLoginFormListener();
        break;
    case "/register/":
    case "/register/index.html":
        setRegisterFormListener();
        break; 
    case "/listingItem/index.html":
        getOneListing();
        break;       
}




