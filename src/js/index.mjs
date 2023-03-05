import { setRegisterFormListener } from "./login_register/register.mjs";
import { setLoginFormListener } from "./login_register/login.mjs";
import { getListings } from "./listings/getLists.mjs";
import { getOneListing } from "./listings/getLists.mjs";
import { viewMoreButton } from "./listings/getLists.mjs";
import { setNewListingListener } from "./listings/newListing.mjs";
import { setProfilePage, updateAvatar } from "./profile/profile.mjs";
import { getOwnListingings } from "./profile/viewOwnList.mjs";
import { setEditListingListener } from "./listings/editListing.mjs"
import { setLogoutListener } from "./login_register/logout.mjs";
import { updateNavbar } from "./profile/header.mjs"

const path = location.pathname
  switch (path) {
    case "/":
    case "/index.html":
      getListings();
      setNewListingListener();
      setLogoutListener();
      viewMoreButton();
      updateNavbar();
      break;
    case "/login/index.html":
      setLoginFormListener();
      setLogoutListener();
      updateNavbar();
      break;
    case "/register/index.html":
      setRegisterFormListener();
      setLogoutListener();
      updateNavbar();
      break;
      case "/listingitem/":
      case "/listingitem/index.html":
      getOneListing();
      setLogoutListener();
      setEditListingListener();
      // setNewListingListener();
      updateNavbar();
      break;
    case "/profile/index.html":
      setProfilePage();
      updateAvatar();
      getOwnListingings()
      setLogoutListener();
      setNewListingListener();
      updateNavbar();
      break;
    default:
      setLogoutListener();
      break;
  }







