import { isLoggedIn } from '../api/helpers.mjs';

// Updates header wether user is logged in or not
export function updateNavbar() {
  const loginNavItem = document.querySelector('li a[href="/login/index.html"]').parentElement;
  const logoutNavItem = document.querySelector('li #log-out').parentElement;
  const newListingNavItem = document.querySelector('li a#myInput').parentElement;
  const profileNavItem = document.querySelector('li a[href="/profile/index.html"]').parentElement;

  if (isLoggedIn()) {
    // User is logged in
    if (loginNavItem) loginNavItem.remove(); // remove login 
    if (newListingNavItem) newListingNavItem.style.display = "block"; // show new listing
    if (profileNavItem) profileNavItem.style.display = "block"; // show profile link
  } else {
    // User is not logged in
    if (loginNavItem) loginNavItem.style.display = "block"; // show login 
    if (logoutNavItem) logoutNavItem.remove(); // remove logout 
    if (newListingNavItem) newListingNavItem.style.display = "none"; // hide new listing 
    if (profileNavItem) profileNavItem.style.display = "none"; // hide profile link
  }
}
