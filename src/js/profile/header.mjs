import { isLoggedIn } from '../api/helpers.mjs';

export function updateNavbar() {
  const loginNavItem = document.querySelector('li a[href="/login/index.html"]').parentElement;
  const logoutNavItem = document.querySelector('li #log-out').parentElement;
  const newListingNavItem = document.querySelector('li a#myInput').parentElement;

  if (isLoggedIn()) {
    // User is logged in
    if (loginNavItem) loginNavItem.remove(); // remove login 
    if (newListingNavItem) newListingNavItem.style.display = "block"; // show new listing
  } else {
    // User is not logged in
    if (loginNavItem) loginNavItem.style.display = "block"; // show login 
    if (logoutNavItem) logoutNavItem.remove(); // remove logout 
    if (newListingNavItem) newListingNavItem.style.display = "none"; // hide new listing 
  }
}