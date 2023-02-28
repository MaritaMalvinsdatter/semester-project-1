import { setRegisterFormListener } from "./login_register/register.mjs";
import { setLoginFormListener } from "./login_register/login.mjs";
import { getListings } from "./listings/getLists.mjs";
import { getOneListing } from "./listings/getLists.mjs";
import { setNewListingListener } from "./listings/newListing.mjs";
import { setProfilePage, updateAvatar } from "./profile/profile.mjs";
import * as paths from "./api/constants.mjs";
import { setLogoutListener } from "./login_register/logout.mjs";

// console.log(paths.API_SELLER_URL)

const path = location.pathname

switch (path) {
    case "/login/login.html":
      setLoginFormListener();
      setLogoutListener();
      break;
    case "/register/index.html":
      setRegisterFormListener();
      setLogoutListener();
      break;
    case "/index.html":
      getListings();
      setNewListingListener();
      setLogoutListener();
      break;
    case "/listingItem/index.html":
      getOneListing();
      setLogoutListener();
      break;
    case "/profile/index.html":
      setProfilePage();
      updateAvatar();
      setLogoutListener();
      break;
    default:
      setLogoutListener();
      break;
  } 

// switch (path) {
//     case "/":
//     case "/index.html":
//         getListings();
//         setLogoutListener();
//         setNewListingListener();
//         break;
//     case "/login/":
//     case "/login/index.html":
//         setLoginFormListener();
//         break;
//     case "/register/":
//     case "/register/index.html":
//         setRegisterFormListener();
//         break; 
//     case "/listingItem/index.html":
//         getOneListing();
//         break;       
// }




