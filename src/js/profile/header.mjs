import { isLoggedIn } from '../api/helpers.mjs';

// Updates header depening on user is logged in or not
export function updateNavbar() {
  const loginNavItem = document.querySelector('li a[href="/login/index.html"]').parentElement;
  const logoutNavItem = document.querySelector('li #log-out').parentElement;
  const newListingNavItem = document.querySelector('li a#myInput').parentElement;
  const profileNavItem = document.querySelector('li a[href="/profile/index.html"]').parentElement;

  if (isLoggedIn()) {
    // User is logged in
    if (loginNavItem) loginNavItem.remove(); 
    if (newListingNavItem) newListingNavItem.style.display = "block"; 
    if (profileNavItem) profileNavItem.style.display = "block"; 
  } else {
    // User is not logged in
    if (loginNavItem) loginNavItem.style.display = "block"; 
    if (logoutNavItem) logoutNavItem.remove();  
    if (newListingNavItem) newListingNavItem.style.display = "none"; 
    if (profileNavItem) profileNavItem.style.display = "none"; 
  }
}
